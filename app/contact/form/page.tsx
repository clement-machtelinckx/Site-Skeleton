import { Container } from "@/components/layout/container";
import { InfoCard } from "@/components/special/infoCard";
import { ContactForm } from "@/components/form/contact/contact-form";
import { mdiEmailOutline, mdiPhone } from "@mdi/js";

export default function ContactFormPage() {
    return (
        <main className="py-16 md:py-24">
            <Container>
                <div className="mb-10 space-y-3">
                    <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
                        Nous contacter
                    </h1>
                    <p className="max-w-3xl text-muted-foreground">
                        Remplissez le formulaire, nous revenons vers vous rapidement.
                    </p>
                </div>

                <div className="grid gap-8 lg:grid-cols-3 lg:items-start">
                    {/* gauche: 1 col */}
                    <div className="lg:col-span-1">
                        <InfoCard
                            logoSrc="/logo-transparent.svg"
                            logoAlt="Protec'audio"
                            title="Nous contacter"
                            phone="09 80 08 50 47"
                            hours="Du lundi au vendredi de 9h00 à 12h00 et de 14h00 à 18h00."
                            email="contact@protecaudio.fr"
                            description="Vous bénéficierez d’un échange avec un de nos experts pour obtenir la meilleure couverture assurantielle."
                            phoneIconPath={mdiPhone}
                            emailIconPath={mdiEmailOutline}
                        />
                    </div>

                    {/* droite: 2 cols */}
                    <div className="lg:col-span-2">
                        <ContactForm />
                    </div>
                </div>
            </Container>
        </main>
    );
}