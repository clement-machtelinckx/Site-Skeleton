import { Container } from "@/components/layout/container";
import { ContactForm } from "@/components/form/contact/contact-form";
import { CONTACT_CHANNELS, CONTACT_REASONS, type ContactChannel, type ContactReason } from "@/components/form/contact/contact-schema";
import { InfoCard } from "@/components/special/infoCard";
import { mdiEmailOutline, mdiPhone } from "@mdi/js";

type Props = {
    searchParams?: Record<string, string | string[] | undefined>;
};

function pickString(v: string | string[] | undefined) {
    return Array.isArray(v) ? v[0] : v;
}

export default function ContactFormPage({ searchParams }: Props) {
    const channelParam = pickString(searchParams?.channel) as ContactChannel | undefined;
    const reasonParam = pickString(searchParams?.reason) as ContactReason | undefined;

    const initialChannel = CONTACT_CHANNELS.includes(channelParam as any) ? channelParam : "email";
    const initialReason = CONTACT_REASONS.includes(reasonParam as any) ? reasonParam : "informations";

    return (
        <main className="py-16 md:py-24">
            <div className="space-y-16 grid-cols-1 lg:grid-cols-2 grid-flow-row">
                <Container>
                    <div className="mb-10 space-y-3">
                        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
                            Nous contacter
                        </h1>
                        <p className="max-w-3xl text-muted-foreground">
                            Choisissez votre motif, puis envoyez votre demande. Réponse rapide.
                        </p>
                    </div>

                    <ContactForm initialChannel={initialChannel} initialReason={initialReason} />
                </Container>
                <Container>
                    <div className="mx-auto max-w-xl">
                        <InfoCard
                            logoSrc="/logo-transparent.svg"
                            logoAlt="Markassur Assurances"
                            title="Nous contacter"
                            phone="09 80 08 50 47"
                            hours="Du lundi au vendredi de 9h00 à 12h00 et de 14h00 à 18h00."
                            email="contact@markassur.com"
                            description="Vous bénéficierez d’un échange avec un de nos experts pour vous permettre d’obtenir la meilleure couverture assurantielle en adéquation totale avec vos besoins."
                            phoneIconPath={mdiPhone}
                            emailIconPath={mdiEmailOutline}
                        />
                    </div>
                </Container>
            </div>
        </main >
    );
}