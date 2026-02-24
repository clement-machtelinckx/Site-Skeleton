"use client";

import * as React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
    CALLBACK_SLOTS,
    CONTACT_REASONS,
    contactFormSchema,
    reasonLabel,
    slotLabel,
    type ContactChannel,
    type ContactFormValues,
    type ContactReason,
} from "./contact-schema";

const STORE_TYPES = [
    { value: "independant", label: "Indépendant" },
    { value: "reseau", label: "Réseau / Groupe" },
    { value: "franchise", label: "Franchise" },
    { value: "autre", label: "Autre" },
] as const;

type Props = {
    initialChannel?: ContactChannel;
    initialReason?: ContactReason;
};

export function ContactForm({ initialChannel = "email", initialReason = "informations" }: Props) {
    const [submitted, setSubmitted] = React.useState(false);

    const form = useForm<ContactFormValues>({
        resolver: zodResolver(contactFormSchema),
        defaultValues: {
            channel: initialChannel,
            reason: initialReason,

            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            postalCode: "",
            city: "",

            companyName: "",
            storeType: "",
            contractNumber: "",

            callbackSlots: [],
            isPartner: undefined,
            message: "",
        },
        mode: "onBlur",
    });

    const channel = form.watch("channel");
    const reason = form.watch("reason");

    function toggleSlot(slot: (typeof CALLBACK_SLOTS)[number]) {
        const current = form.getValues("callbackSlots") ?? [];
        const next = current.includes(slot)
            ? current.filter((s) => s !== slot)
            : [...current, slot];
        form.setValue("callbackSlots", next, { shouldValidate: true });
    }

    async function onSubmit(values: ContactFormValues) {
        // V1: UI only -> on “simule” l’envoi
        console.log("[contact-form] submit", values);

        // Optionnel: petit nettoyage
        const cleaned = {
            ...values,
            isPartner: values.reason === "reclamation" ? values.isPartner ?? false : undefined,
            callbackSlots: values.channel === "callback" ? values.callbackSlots : [],
        };
        console.log("[contact-form] cleaned", cleaned);

        setSubmitted(true);
    }

    if (submitted) {
        return (
            <Card className="rounded-2xl">
                <CardHeader>
                    <CardTitle>Merci, votre demande a bien été prise en compte ✅</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                    <p>Nous revenons vers vous dès que possible.</p>
                    <div className="flex flex-wrap gap-3">
                        <Button onClick={() => setSubmitted(false)} variant="secondary">
                            Faire une autre demande
                        </Button>
                        <Button asChild>
                            <Link href="/contact">Retour à la page contact</Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
                {/* Mode */}
                <Card className="rounded-2xl">
                    <CardHeader>
                        <CardTitle>Votre demande</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-6 md:grid-cols-2">
                        {/* channel */}
                        <FormField
                            control={form.control}
                            name="channel"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Type de demande</FormLabel>
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Choisir…" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="email">Envoyer un e-mail</SelectItem>
                                            <SelectItem value="callback">Être rappelé</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        {field.value === "callback"
                                            ? "Nous vous rappellerons sur un créneau préféré."
                                            : "Nous répondrons par e-mail."}
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* reason */}
                        <FormField
                            control={form.control}
                            name="reason"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Motif</FormLabel>
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Sélectionner…" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {CONTACT_REASONS.map((r) => (
                                                <SelectItem key={r} value={r}>
                                                    {reasonLabel[r]}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        Sélectionnez le motif pour adapter votre demande.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>

                {/* Identité */}
                <Card className="rounded-2xl">
                    <CardHeader>
                        <CardTitle>Identité</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-6 md:grid-cols-2">
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Prénom</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Votre prénom" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nom</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Votre nom" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="nom@exemple.com" type="email" autoComplete="email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Téléphone</FormLabel>
                                    <FormControl>
                                        <Input placeholder="06 00 00 00 00" inputMode="tel" autoComplete="tel" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>

                {/* Localisation / entreprise */}
                <Card className="rounded-2xl">
                    <CardHeader>
                        <CardTitle>Informations complémentaires</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-6 md:grid-cols-2">
                        <FormField
                            control={form.control}
                            name="postalCode"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Code postal</FormLabel>
                                    <FormControl>
                                        <Input placeholder="75000" inputMode="numeric" maxLength={5} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Ville</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Paris" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="companyName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nom de l’entreprise (optionnel)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nom de l’entreprise" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="storeType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Type d’enseigne</FormLabel>
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Sélectionner…" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {STORE_TYPES.map((o) => (
                                                <SelectItem key={o.value} value={o.value}>
                                                    {o.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="contractNumber"
                            render={({ field }) => (
                                <FormItem className="md:col-span-2">
                                    <FormLabel>Numéro de contrat (optionnel)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Ex: 123456" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Si vous l’avez, cela accélère le traitement.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>

                {/* Créneaux (si callback) */}
                {channel === "callback" ? (
                    <Card className="rounded-2xl">
                        <CardHeader>
                            <CardTitle>Créneaux de rappel</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <FormField
                                control={form.control}
                                name="callbackSlots"
                                render={() => (
                                    <FormItem>
                                        <FormLabel>Sélectionnez vos préférences</FormLabel>
                                        <FormDescription>
                                            Les créneaux sont indicatifs (nous rappelons au plus proche).
                                        </FormDescription>

                                        <div className="grid gap-3 md:grid-cols-3">
                                            {CALLBACK_SLOTS.map((slot) => {
                                                const checked = (form.getValues("callbackSlots") ?? []).includes(slot);
                                                return (
                                                    <label
                                                        key={slot}
                                                        className="flex cursor-pointer items-center gap-3 rounded-xl border p-4"
                                                    >
                                                        <Checkbox
                                                            checked={checked}
                                                            onCheckedChange={() => toggleSlot(slot)}
                                                        />
                                                        <span className="text-sm font-medium">{slotLabel[slot]}</span>
                                                    </label>
                                                );
                                            })}
                                        </div>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>
                ) : null}

                {/* Partenaire (seulement si réclamation) */}
                {reason === "reclamation" ? (
                    <Card className="rounded-2xl">
                        <CardHeader>
                            <CardTitle>Informations réclamation</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <FormField
                                control={form.control}
                                name="isPartner"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-xl border p-4">
                                        <div className="space-y-1">
                                            <FormLabel className="m-0">Êtes-vous partenaire ?</FormLabel>
                                            <FormDescription className="m-0">
                                                Cela aide à orienter votre demande.
                                            </FormDescription>
                                        </div>
                                        <FormControl>
                                            <Checkbox
                                                checked={!!field.value}
                                                onCheckedChange={(v) => field.onChange(Boolean(v))}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>
                ) : null}

                {/* Message */}
                <Card className="rounded-2xl">
                    <CardHeader>
                        <CardTitle>Votre message</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Commentaire (optionnel)</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            rows={6}
                                            placeholder={`Détaillez votre demande (${reasonLabel[reason]})…`}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Plus vous donnez de détails, plus on traite vite.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>

                {/* Submit */}
                <div className="flex flex-wrap items-center gap-3">
                    <Button type="submit" size="lg">
                        Envoyer la demande
                    </Button>
                    <Button type="button" variant="secondary" size="lg" onClick={() => form.reset()}>
                        Réinitialiser
                    </Button>
                </div>
            </form>
        </Form>
    );
}