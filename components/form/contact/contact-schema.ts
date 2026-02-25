import { z } from "zod";

export const USER_TYPES = ["particulier", "professionnel"] as const;
export type UserType = (typeof USER_TYPES)[number];

export const INSURANCE_TYPES = [
    "garantie_audioprothese",
    "rc_pro",
    "multirisque_pro",
    "protection_juridique",
    "sante_prevoyance",
    "epargne_retraite",
] as const;

export type InsuranceType = (typeof INSURANCE_TYPES)[number];

export const insuranceLabel: Record<InsuranceType, string> = {
    garantie_audioprothese: "Garantie Audioprothèse",
    rc_pro: "Responsabilité Civile Professionnelle",
    multirisque_pro: "Multirisque professionnelle",
    protection_juridique: "Protection juridique",
    sante_prevoyance: "Santé & prévoyance",
    epargne_retraite: "Épargne & retraite",
};

const phoneRegex = /^(\+?\d{1,3}[\s.-]?)?\d[\d\s().-]*\d$/;
const postalCodeFR = /^\d{5}$/;

export const contactFormSchema = z.object({
    userType: z.enum(USER_TYPES),

    // Identité
    jobFunction: z.string().min(1, "Fonction requise"),
    firstName: z.string().min(2, "Prénom requis"),
    lastName: z.string().min(2, "Nom requis"),
    email: z.string().email("Email invalide"),
    phone: z.string().min(6, "Téléphone requis").regex(phoneRegex, "Téléphone invalide"),

    // Entreprise (optionnelle si particulier)
    companyName: z.string().optional(),
    companyAddress: z.string().optional(),
    postalCode: z.string().regex(postalCodeFR, "Code postal invalide (5 chiffres)"),
    city: z.string().min(2, "Ville requise"),

    // Besoin
    insuranceType: z.enum(INSURANCE_TYPES),
    message: z.string().min(10, "Décrivez votre demande (10 caractères min)").max(2000),
}).superRefine((data, ctx) => {
    if (data.userType === "professionnel") {
        if (!data.companyName || data.companyName.trim().length < 2) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["companyName"],
                message: "Raison sociale requise",
            });
        }
        if (!data.companyAddress || data.companyAddress.trim().length < 5) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["companyAddress"],
                message: "Adresse de l’entreprise requise",
            });
        }
    }
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;