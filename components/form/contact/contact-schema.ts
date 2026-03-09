import { z } from "zod";

export const USER_TYPES = ["particulier", "professionnel"] as const;
export type UserType = (typeof USER_TYPES)[number];

export const REQUEST_TYPES = [
    "contact",
    "devis",
    "support",
    "partenariat",
    "autre",
] as const;

export type RequestType = (typeof REQUEST_TYPES)[number];

export const requestLabel: Record<RequestType, string> = {
    contact: "Contact",
    devis: "Demande de devis",
    support: "Support",
    partenariat: "Partenariat",
    autre: "Autre demande",
};

const phoneRegex = /^(\+?\d{1,3}[\s.-]?)?\d[\d\s().-]*\d$/;
const postalCodeFR = /^\d{5}$/;

export const contactFormSchema = z
    .object({
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
        requestType: z.enum(REQUEST_TYPES),
        message: z.string().min(10, "Décrivez votre demande (10 caractères min)").max(2000),

        // Honeypot anti-bot
        website: z.string().optional(),
    })
    .superRefine((data, ctx) => {
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

/*
 Ancienne version métier conservée dans l’idée :
 le formulaire utilisait des types d’assurance très spécifiques :
 - garantie_audioprothese
 - rc_pro
 - multirisque_pro
 - protection_juridique
 - sante_prevoyance
 - epargne_retraite

 Pour le skeleton, on remplace ça par une liste plus générique :
 - contact
 - devis
 - support
 - partenariat
 - autre

 Si un futur projet a besoin d’un routage métier plus poussé,
 il suffira de réintroduire une liste spécialisée.
*/