import { z } from "zod";

export const joinFormSchema = z.object({
    firstName: z.string().min(2, "Minimum 2 caractères").max(80),
    lastName: z.string().min(2, "Minimum 2 caractères").max(80),
    email: z.string().email("Email invalide").max(120),
    phone: z
        .string()
        .min(8, "Téléphone trop court")
        .max(20)
        .regex(/^[0-9+().\s-]+$/, "Téléphone invalide"),

    // Upload CV
    cv: z
        .any()
        .refine((f) => f instanceof File, "Merci de joindre votre CV")
        .refine(
            (f) => (f instanceof File ? f.size <= 5 * 1024 * 1024 : true),
            "Fichier trop lourd (max 5MB)",
        )
        .refine((f) => {
            if (!(f instanceof File)) return true;

            const allowed = [
                "application/pdf",
                "application/msword",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            ];

            return allowed.includes(f.type);
        }, "Format invalide (PDF, DOC, DOCX)"),

    // Honeypot anti-bot
    website: z.string().optional(),
});

export type JoinFormValues = z.infer<typeof joinFormSchema>;

/*
 Ce schéma est déjà suffisamment générique pour un skeleton.
 Il peut être utilisé pour :
 - une candidature spontanée
 - un formulaire de recrutement
 - une demande de dépôt de CV

 Si un site n’a pas besoin de recrutement, il suffit de ne pas exposer
 la page ou le lien correspondant, sans supprimer cette mécanique.
*/