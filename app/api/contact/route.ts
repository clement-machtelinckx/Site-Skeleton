import { NextResponse } from "next/server";

import { getTransport } from "@/lib/mailer";
import { rateLimit } from "@/lib/rate-limit";
import { CONTACTS, type ContactKey } from "@/config/contact";
import {
    contactFormSchema,
    requestLabel,
    type RequestType,
} from "@/components/form/contact/contact-schema";
import { buildContactEmail } from "@/lib/email-templates/contact";
import { siteConfig } from "@/config/site";

export const runtime = "nodejs";

const REQUEST_EMAIL: Record<RequestType, ContactKey> = {
    contact: "default",
    devis: "sales",
    support: "support",
    partenariat: "partnership",
    autre: "default",
};

export async function POST(req: Request) {
    try {
        const { ok: allowed } = rateLimit(req, { limit: 5, windowMs: 60_000 });

        if (!allowed) {
            return NextResponse.json(
                { ok: false, error: "Trop de requêtes. Réessayez dans une minute." },
                { status: 429 },
            );
        }

        const json = await req.json();
        const parsed = contactFormSchema.safeParse(json);

        if (!parsed.success) {
            return NextResponse.json(
                { ok: false, error: "Champs invalides.", details: parsed.error.flatten() },
                { status: 400 },
            );
        }

        const { website, ...values } = parsed.data;

        if (website && website.trim().length > 0) {
            return NextResponse.json({ ok: true, routedTo: "default" });
        }

        const contactKey = REQUEST_EMAIL[values.requestType];
        const toEmail = CONTACTS[contactKey].email;

        const mail = buildContactEmail(
            {
                insuranceLabel: requestLabel[values.requestType],
                userType: values.userType,
                jobFunction: values.jobFunction,
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                phone: values.phone,
                companyName: values.companyName || undefined,
                companyAddress: values.companyAddress || undefined,
                postalCode: values.postalCode,
                city: values.city,
                message: values.message,
            },
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
            replyTo: values.email,
        });

        return NextResponse.json({
            ok: true,
            routedTo: contactKey,
            messageId: info.messageId,
        });
    } catch (err) {
        console.error("POST /api/contact error:", err);

        return NextResponse.json(
            { ok: false, error: "Erreur serveur lors de l’envoi." },
            { status: 500 },
        );
    }
}

/*
 Ancien usage métier conservé dans l’idée :
 le routage se faisait selon des types d’assurance très spécifiques
 vers plusieurs boîtes dédiées.

 Pour le skeleton, on garde exactement le même principe,
 mais avec des catégories plus génériques :
 - contact
 - devis
 - support
 - partenariat
 - autre

 Si un futur projet nécessite un routage plus spécifique,
 il suffira d’adapter REQUEST_EMAIL et les options du schéma.
*/