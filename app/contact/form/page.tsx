import type { Metadata } from "next";
import { Phone, Mail } from "lucide-react";

import { Container } from "@/components/layout/container";
import { InfoCard } from "@/components/special/infoCard";
import { ContactForm } from "@/components/form/contact/contact-form";
import { CONTACTS } from "@/config/contact";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
    title: "Formulaire de contact",
    description:
        "Remplissez le formulaire pour nous contacter, demander des informations ou échanger sur votre projet.",
    openGraph: {
        title: `Formulaire de contact | ${siteConfig.name}`,
        description:
            "Utilisez notre formulaire pour nous envoyer un message ou demander à être recontacté.",
    },
};

const c = CONTACTS.default;

export default function ContactFormPage() {
    return (
        <main className="py-16 md:py-24">
            <Container>
                <div className="mb-10 space-y-3">
                    <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
                        Nous contacter
                    </h1>
                    <p className="text-muted-foreground max-w-3xl">
                        Remplissez le formulaire, nous revenons vers vous rapidement.
                    </p>
                </div>

                <div className="grid gap-8 lg:grid-cols-3 lg:items-start">
                    <div className="lg:col-span-1">
                        <InfoCard
                            logoSrc="/logo-transparent.png"
                            logoAlt={siteConfig.name}
                            title="Informations de contact"
                            phone={c.phone}
                            hours={c.hours}
                            email={c.email}
                            description="Utilisez ce bloc comme carte de contact générique. Vous pouvez facilement adapter les textes, le logo et les coordonnées selon le projet."
                            phoneIcon={Phone}
                            emailIcon={Mail}
                        />
                    </div>

                    <div className="lg:col-span-2">
                        <ContactForm />
                    </div>
                </div>

                {/*
                  Ancien usage :
                  cette page utilisait CONTACTS.protecaudio avec un wording métier.
                  Pour le skeleton, on branche la page sur CONTACTS.default afin de
                  garder un comportement neutre et facilement remplaçable.
                */}
            </Container>
        </main>
    );
}