import { Container } from "@/components/layout/container";
import { ContactCard } from "@/components/special/contactCard";
import { Reveal } from "@/components/ui/reveal";
import type { Metadata } from "next";
import { Phone, Headphones, Mail } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
    title: "Contact",
    description:
        "Contactez-nous pour obtenir des informations sur nos solutions d'assurance, réaliser un contrat ou déclarer un sinistre.",
    openGraph: {
        title: "Contactez ProtecAudio",
        description:
            "Contactez-nous pour un devis, des informations ou une déclaration de sinistre.",
    },
};

export default function Contact() {
    return (
        <>
            <JsonLd
                data={{
                    "@context": "https://schema.org",
                    "@type": "ContactPage",
                    name: "Contact ProtecAudio",
                    url: "https://protecaudio.fr/contact",
                    description:
                        "Contactez ProtecAudio pour obtenir des informations sur nos solutions d'assurance pour audioprothésistes.",
                    mainEntity: {
                        "@type": "Organization",
                        name: "ProtecAudio",
                        telephone: "+33980085047",
                        email: "protecaudio@markassur.com",
                        contactPoint: {
                            "@type": "ContactPoint",
                            telephone: "+33980085047",
                            contactType: "customer service",
                            availableLanguage: "French",
                            hoursAvailable: {
                                "@type": "OpeningHoursSpecification",
                                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
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
                            item: "https://protecaudio.fr",
                        },
                        {
                            "@type": "ListItem",
                            position: 2,
                            name: "Contact",
                            item: "https://protecaudio.fr/contact",
                        },
                    ],
                }}
            />
            <section className="py-16 md:py-24">
                <Container>
                    <h1 className="text-primary text-center text-5xl font-semibold">
                        Echanger avec Protec&apos;audio
                    </h1>
                    <h2 className="text-muted-foreground text-center text-lg font-medium">
                        Pour obtenir des informations sur nos solutions, réaliser un contrat,
                        déclarer un sinistre
                    </h2>
                </Container>
            </section>

            <section className="py-16 md:py-24">
                <Container>
                    <div className="grid gap-10 md:grid-cols-3">
                        <div>
                            <Reveal delay={10}>
                                <ContactCard
                                    title="CONTACTER NOTRE CABINET"
                                    href="/appeler-agence"
                                    buttonLabel="Appeler"
                                    icon={Phone}
                                    className="whitespace-pre-line"
                                />
                            </Reveal>
                        </div>

                        <div>
                            <Reveal delay={80}>
                                <ContactCard
                                    title="ETRE RAPPELÉ"
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
                </Container>
            </section>
        </>
    );
}
