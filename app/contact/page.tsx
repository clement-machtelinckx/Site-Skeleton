import { Container } from "@/components/layout/container";
import { ContactCard } from "@/components/special/contactCard";
import { Reveal } from "@/components/ui/reveal";
import type { Metadata } from "next";
import { Phone, Headphones, Mail } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/config/site";
import { CONTACTS } from "@/config/contact";

export const metadata: Metadata = {
    title: "Contact",
    description:
        "Contactez-nous pour obtenir des informations, échanger sur votre projet ou faire une demande via notre formulaire.",
    openGraph: {
        title: `Contact | ${siteConfig.name}`,
        description:
            "Prenez contact avec nous par téléphone, formulaire ou email selon votre besoin.",
    },
};

export default function Contact() {
    const defaultContact = CONTACTS.default;

    return (
        <>
            <JsonLd
                data={{
                    "@context": "https://schema.org",
                    "@type": "ContactPage",
                    name: `Contact ${siteConfig.name}`,
                    url: `${siteConfig.url}/contact`,
                    description:
                        "Page de contact générique pour joindre l’équipe par téléphone, formulaire ou email.",
                    mainEntity: {
                        "@type": "Organization",
                        name: siteConfig.name,
                        telephone: "+33123456789",
                        email: defaultContact.email,
                        contactPoint: {
                            "@type": "ContactPoint",
                            telephone: "+33123456789",
                            contactType: "customer service",
                            availableLanguage: "French",
                            hoursAvailable: {
                                "@type": "OpeningHoursSpecification",
                                dayOfWeek: [
                                    "Monday",
                                    "Tuesday",
                                    "Wednesday",
                                    "Thursday",
                                    "Friday",
                                ],
                                opens: "09:00",
                                closes: "18:00",
                            },
                        },
                    },
                }}
            />

            <JsonLd
                data={{
                    "@context": "https://schema.org",
                    "@type": "BreadcrumbList",
                    itemListElement: [
                        {
                            "@type": "ListItem",
                            position: 1,
                            name: "Accueil",
                            item: siteConfig.url,
                        },
                        {
                            "@type": "ListItem",
                            position: 2,
                            name: "Contact",
                            item: `${siteConfig.url}/contact`,
                        },
                    ],
                }}
            />

            <section className="py-16 md:py-24">
                <Container>
                    <h1 className="text-primary text-center text-5xl font-semibold">
                        Nous contacter
                    </h1>
                    <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-center text-lg font-medium">
                        Échangez avec nous par téléphone, via le formulaire de contact ou par email.
                    </p>
                </Container>
            </section>

            <section className="py-16 md:py-24">
                <Container>
                    <div className="grid gap-10 md:grid-cols-3">
                        <div>
                            <Reveal delay={10}>
                                <ContactCard
                                    title="NOUS APPELER"
                                    href="/contact/form"
                                    buttonLabel="Appeler"
                                    icon={Phone}
                                    className="whitespace-pre-line"
                                />
                            </Reveal>
                        </div>

                        <div>
                            <Reveal delay={80}>
                                <ContactCard
                                    title="ÊTRE RAPPELÉ"
                                    href="/contact/form"
                                    buttonLabel="Être rappelé"
                                    icon={Headphones}
                                />
                            </Reveal>
                        </div>

                        <div>
                            <Reveal delay={160}>
                                <ContactCard
                                    title="ENVOYER UN E-MAIL"
                                    href="/contact/form"
                                    buttonLabel="Envoyer un e-mail"
                                    icon={Mail}
                                />
                            </Reveal>
                        </div>
                    </div>

                    {/*
                      Ancien usage métier conservé dans l’idée :
                      la page pouvait pointer vers une page dédiée type /appeler-agence.
                      Pour le skeleton, on redirige tout vers /contact/form pour garder
                      un parcours simple et générique.
                    */}
                </Container>
            </section>
        </>
    );
}