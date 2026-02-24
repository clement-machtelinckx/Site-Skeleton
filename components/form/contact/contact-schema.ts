import { z } from "zod";

export const CONTACT_REASONS = [
    "changement_rib",
    "mise_a_jour_contrat",
    "sinistre",
    "justificatif",
    "informations",
    "reclamation",
    "autres",
] as const;

export const CONTACT_CHANNELS = ["callback", "email"] as const;

export const CALLBACK_SLOTS = ["9-11", "14-16", "16-18"] as const;

export type ContactReason = (typeof CONTACT_REASONS)[number];
export type ContactChannel = (typeof CONTACT_CHANNELS)[number];
export type CallbackSlot = (typeof CALLBACK_SLOTS)[number];

const phoneRegex = /^(\+?\d{1,3}[\s.-]?)?(\(?\d{1,4}\)?[\s.-]?)?[\d\s.-]{6,}$/;
const postalCodeFR = /^\d{5}$/;

export const contactFormSchema = z
    .object({
        channel: z.enum(CONTACT_CHANNELS),
        reason: z.enum(CONTACT_REASONS),

        firstName: z.string().min(2, "Prénom requis"),
        lastName: z.string().min(2, "Nom requis"),
        email: z.string().email("Email invalide"),
        phone: z.string().min(6, "Téléphone requis").regex(phoneRegex, "Téléphone invalide"),

        postalCode: z.string().regex(postalCodeFR, "Code postal invalide (5 chiffres)"),
        city: z.string().min(2, "Ville requise"),

        companyName: z.string().optional(),
        storeType: z.string().min(1, "Type d'enseigne requis"),
        contractNumber: z.string().optional(),

        callbackSlots: z.array(z.enum(CALLBACK_SLOTS)).optional(),

        isPartner: z.boolean().optional(),
        message: z.string().max(2000).optional(),
    })
    .superRefine((data, ctx) => {
        // Créneaux obligatoires si callback
        if (data.channel === "callback") {
            if (!data.callbackSlots || data.callbackSlots.length === 0) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Sélectionne au moins un créneau de rappel",
                    path: ["callbackSlots"],
                });
            }
        }

        // Partenaire seulement utile si réclamation (on le laisse optional sinon)
        if (data.reason !== "reclamation" && data.isPartner !== undefined) {
            // pas une erreur, mais tu peux décider de nettoyer au submit
        }
    });

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const reasonLabel: Record<ContactReason, string> = {
    changement_rib: "Changement de RIB",
    mise_a_jour_contrat: "Mise à jour du contrat",
    sinistre: "Sinistre",
    justificatif: "Fournir un justificatif",
    informations: "Informations",
    reclamation: "Réclamation",
    autres: "Autres",
};

export const slotLabel: Record<CallbackSlot, string> = {
    "9-11": "De 9h à 11h",
    "14-16": "De 14h à 16h",
    "16-18": "De 16h à 18h",
};