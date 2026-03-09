import { NextResponse } from "next/server";
import { z } from "zod";

import { getTransport } from "@/lib/mailer";
import { rateLimit } from "@/lib/rate-limit";
import { CONTACTS } from "@/config/contact";
import { buildJoinEmail } from "@/lib/email-templates/join";
import { siteConfig } from "@/config/site";

export const runtime = "nodejs";

const MAX_CV_BYTES = 5 * 1024 * 1024;

const AllowedMime = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
] as const;

const JoinSchema = z.object({
    firstName: z.string().min(2).max(80),
    lastName: z.string().min(2).max(80),
    email: z.string().email().max(120),
    phone: z
        .string()
        .min(8)
        .max(20)
        .regex(/^[0-9+().\s-]+$/),
    website: z.string().optional().default(""),
});

function extFromName(name: string) {
    const idx = name.lastIndexOf(".");
    return idx >= 0 ? name.slice(idx + 1).toLowerCase() : "";
}

function sanitizeFilename(name: string): string {
    return name
        .replace(/\.\./g, "")
        .replace(/\0/g, "")
        .replace(/[^a-zA-Z0-9._-]/g, "_")
        .slice(0, 100);
}

export async function POST(req: Request) {
    try {
        const { ok: allowed } = rateLimit(req, { limit: 3, windowMs: 60_000 });

        if (!allowed) {
            return NextResponse.json(
                { ok: false, error: "Trop de requêtes. Réessayez dans une minute." },
                { status: 429 },
            );
        }

        const formData = await req.formData();

        const raw = {
            firstName: String(formData.get("firstName") ?? ""),
            lastName: String(formData.get("lastName") ?? ""),
            email: String(formData.get("email") ?? ""),
            phone: String(formData.get("phone") ?? ""),
            website: String(formData.get("website") ?? ""),
        };

        const parsed = JoinSchema.safeParse(raw);

        if (!parsed.success) {
            return NextResponse.json(
                { ok: false, error: "Champs invalides.", details: parsed.error.flatten() },
                { status: 400 },
            );
        }

        if (parsed.data.website.trim().length > 0) {
            return NextResponse.json({ ok: true });
        }

        const cv = formData.get("cv");
        if (!(cv instanceof File)) {
            return NextResponse.json({ ok: false, error: "CV requis." }, { status: 400 });
        }

        if (cv.size > MAX_CV_BYTES) {
            return NextResponse.json(
                { ok: false, error: "Fichier trop lourd (max 5MB)." },
                { status: 400 },
            );
        }

        const ext = extFromName(cv.name);
        const allowedExt = ["pdf", "doc", "docx"];

        if (!allowedExt.includes(ext)) {
            return NextResponse.json(
                { ok: false, error: "Format invalide (PDF, DOC, DOCX)." },
                { status: 400 },
            );
        }

        if (!AllowedMime.includes(cv.type as (typeof AllowedMime)[number])) {
            if (cv.type && cv.type.trim().length > 0) {
                return NextResponse.json(
                    { ok: false, error: "Type de fichier invalide." },
                    { status: 400 },
                );
            }
        }

        const toEmail = CONTACTS.recruitment.email;

        const safeName = sanitizeFilename(cv.name);
        const cvBytes = Buffer.from(await cv.arrayBuffer());

        const cvMeta = {
            filename: safeName,
            sizeKb: Math.round(cv.size / 1024),
            mimeType: cv.type || undefined,
        };

        const mail = buildJoinEmail(
            {
                firstName: parsed.data.firstName,
                lastName: parsed.data.lastName,
                email: parsed.data.email,
                phone: parsed.data.phone,
            },
            cvMeta,
            {
                brandName: siteConfig.name,
                logoUrl: process.env.MAIL_LOGO_URL,
                footerText: process.env.MAIL_FOOTER_TEXT,
            },
        );

        const mailFrom = process.env.MAIL_FROM;
        if (!mailFrom) {
            throw new Error("Variable MAIL_FROM requise.");
        }

        const transporter = getTransport();
        const info = await transporter.sendMail({
            from: mailFrom,
            to: toEmail,
            subject: mail.subject,
            text: mail.text,
            html: mail.html,
            replyTo: parsed.data.email,
            attachments: [
                {
                    filename: safeName,
                    content: cvBytes,
                    contentType: cv.type || "application/octet-stream",
                    contentDisposition: "attachment",
                },
            ],
        });

        return NextResponse.json({
            ok: true,
            messageId: info.messageId,
        });
    } catch (err) {
        console.error("POST /api/join error:", err);

        return NextResponse.json(
            { ok: false, error: "Erreur serveur lors de l’envoi." },
            { status: 500 },
        );
    }
}

/*
 Cette route reste volontairement générique dans le skeleton.
 Elle permet de conserver un vrai workflow de candidature avec upload de CV.

 Si un futur site n’a pas besoin de recrutement :
 - il suffit de ne pas exposer la page /join
 - ou de retirer le lien correspondant

 La mécanique reste disponible sans devoir la recréer plus tard.
*/