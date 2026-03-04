import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { AnimatedCounter } from "@/components/special/AnimatedCounter";

export const metadata: Metadata = {
    title: "Accueil",
    description:
        "Solutions d’assurance pour audioprothésistes : garanties, protection d’activité et accompagnement.",
    openGraph: {
        title: "ProtecAudio — Experts de la protection des audioprothésistes",
        description:
            "Solutions d’assurance pour audioprothésistes : garanties appareils auditifs, protection d’activité et accompagnement depuis plus de 35 ans.",
    },
};

const PARTNERS = [
    { src: "/partenaires/athuil.jpg", name: "Athuil" },
    { src: "/partenaires/audition_conseil.jpg", name: "Audition conseil" },
    { src: "/partenaires/audition_fabre.png", name: "Audition Fabre" },
    { src: "/partenaires/constant_audition.jpg", name: "Constant Audition" },
    { src: "/partenaires/gouesnard_bis.jpg", name: "Gouesnard" },
    { src: "/partenaires/phenomene_audition.jpg", name: "Phénomène Audition" },
    { src: "/partenaires/renard_wwwvect.jpg", name: "Renard" },
    { src: "/partenaires/alsace_acoustique.jpg", name: "Alsace Acoustique" },
] as const;

export default function HomePage() {
    return (
        <>
            <JsonLd
                data={{
                    "@context": "https://schema.org",
                    "@type": "WebSite",
                    name: "ProtecAudio",
                    url: "https://protecaudio.fr",
                    description:
                        "Solutions d'assurance et de protection pour audioprothésistes en France.",
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
                    ],
                }}
            />
            <section aria-label="Présentation" className="py-16 md:py-10">
                <Container>
                    <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
                        {/* Logo */}
                        <Image
                            src="/logo-transparent.png"
                            alt="Logo de ProtecAudio"
                            width={420}
                            height={160}
                            className="h-auto w-[420px] md:w-[420px]"
                            priority
                        />

                        {/* Sous-titre / distributeurs */}
                        {/* <p className="mt-4 text-sm text-muted-foreground">
              Distribué par <span className="font-semibold text-foreground">Eurossur</span>,{" "}
              <span className="font-semibold text-foreground">Mark’assur</span> &{" "}
              <span className="font-semibold text-foreground">Rossard</span>
            </p> */}

                        {/* Séparateur */}
                        {/* <div className="mt-6 h-px w-56 bg-foreground/30" /> */}

                        {/* Titre */}
                        <h1 className="mt-10 text-4xl font-semibold tracking-tight md:text-6xl">
                            <span className="block">Experts</span>
                            <span className="mt-2 block text-base font-medium tracking-normal md:text-lg">
                                de la
                            </span>
                            <span className="mt-3 block">protection des audioprothésistes</span>
                        </h1>

                        {/* Texte */}
                        <p className="text-muted-foreground mt-8 text-base leading-relaxed md:text-lg">
                            Depuis plus de 35 ans, nous accompagnons les professionnels du secteur
                            de l’audioprothèse dans la protection et la sécurisation de leur
                            activité. Nous développons également des solutions d’assurance
                            spécifiquement dédiées aux dispositifs auditifs.
                        </p>

                        <p className="text-muted-foreground mt-6 text-base leading-relaxed md:text-lg">
                            Protec’audio propose des solutions d’assurance dédiées aux
                            audioprothésistes, conçues pour couvrir les risques liés à leur exercice
                            : responsabilité civile professionnelle, locaux, équipements et
                            continuité d’activité.
                        </p>

                        <p className="mt-6 font-semibold">
                            Notre engagement : vous offrir une protection fiable, adaptée à votre
                            métier et à ses exigences spécifiques.
                        </p>

                        {/* CTA */}
                        <div className="mt-10">
                            <Button asChild size="lg" className="rounded-full rounded-tr-md font-light uppercase tracking-wider">
                                <Link href="/contact">Demander un devis&nbsp;&nbsp;→</Link>
                            </Button>
                        </div>
                    </div>
                </Container>
            </section>

            <section
                aria-label="Activité professionnelle et dispositifs auditifs"
                className="py-16 md:py-24"
            >
                <Container>
                    {/* Bloc 1 : texte à gauche, image à droite */}
                    <div className="grid items-center gap-10 md:grid-cols-2">
                        {/* Colonne gauche */}
                        <div className="space-y-6">
                            <h2 className="text-primary text-2xl font-bold tracking-tight md:text-3xl">
                                Protégez votre activité professionnelle
                            </h2>

                            <p className="text-muted-foreground leading-relaxed">
                                Nous vous accompagnons dans la protection globale de votre activité
                                d’audioprothésiste, en prenant en considération les spécificités
                                liées à la gestion de vos cabinets, de vos équipes et de vos
                                partenaires professionnels.
                            </p>

                            <p className="text-muted-foreground leading-relaxed">
                                Grâce à notre double expertise en assurance de personne et assurance
                                dommage, nous analysons vos risques afin de sécuriser votre
                                responsabilité professionnelle, vos locaux, votre matériel, et pour
                                offrir à vos équipes une protection optimale.
                            </p>

                            <p className="text-muted-foreground leading-relaxed">
                                Notre approche vous permet de garantir la continuité de votre
                                activité tout en maîtrisant durablement votre budget d’assurance.
                            </p>

                            <div className="pt-2">
                                <Button asChild className="rounded-full rounded-tr-md font-light uppercase tracking-wider">
                                    <Link href="/contact">Demander un devis&nbsp;&nbsp;→</Link>
                                </Button>
                            </div>
                        </div>

                        {/* Colonne droite */}
                        <div className="bg-muted relative aspect-[16/10] w-full overflow-hidden rounded-2xl">
                            <Image
                                src="/images/Module_1.png"
                                alt="Illustration activité professionnelle"
                                fill
                                className="object-cover"
                                sizes="(min-width: 768px) 50vw, 100vw"
                            />
                        </div>
                    </div>

                    {/* Espace entre blocs */}
                    <div className="h-14 md:h-20" />

                    {/* Bloc 2 : image à gauche, texte à droite */}
                    <div className="grid items-center gap-10 md:grid-cols-2">
                        {/* Colonne gauche */}
                        <div className="bg-muted relative aspect-[16/10] w-full overflow-hidden rounded-2xl">
                            <Image
                                src="/images/Module_2.png"
                                alt="Illustration dispositifs auditifs"
                                fill
                                className="object-cover"
                                sizes="(min-width: 768px) 50vw, 100vw"
                            />
                        </div>

                        {/* Colonne droite */}
                        <div className="space-y-6">
                            <h2 className="text-primary text-2xl font-bold tracking-tight md:text-3xl">
                                Protégez vos patients et les dispositifs auditifs
                            </h2>

                            <p className="text-muted-foreground leading-relaxed">
                                L’audioprothésiste a une responsabilité directe envers ses patients,
                                tant sur la qualité de l’appareillage que sur la sécurité, le suivi
                                et la continuité de prise en charge.
                            </p>

                            <p className="text-muted-foreground leading-relaxed">
                                Nous vous proposons des solutions spécifiquement conçues pour
                                protéger les dispositifs auditifs délivrés et sécuriser la relation
                                de confiance entre vous et vos patients.
                            </p>

                            <p className="text-muted-foreground leading-relaxed">
                                Nos garanties permettent de faire face aux imprévus tout en assurant
                                un accompagnement rapide et efficace, dans le respect des
                                obligations professionnelles et réglementaires.
                            </p>

                            <div className="pt-2">
                                <Button asChild className="rounded-full rounded-tr-md font-light uppercase tracking-wider">
                                    <Link href="/contact">Demander un devis&nbsp;&nbsp;→</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* CHIFFRES CLÉS */}
            <section aria-label="Chiffres clés" className="py-16 md:py-24">
                <Container>
                    <h2 className="text-center text-2xl font-semibold tracking-tight md:text-3xl">
                        Nos chiffres clés
                    </h2>

                    <div className="mt-10 grid gap-6 text-center md:grid-cols-3">
                        <AnimatedCounter
                            value={600000}
                            prefix="+ "
                            label="Appareils assurés"
                        />
                        <AnimatedCounter
                            value={9000}
                            prefix="+ "
                            suffix=" / an"
                            label="Sinistres pris en charge"
                            duration={1500}
                        />
                        <AnimatedCounter
                            value={3000}
                            prefix="+ "
                            label="Centres auditifs partenaires"
                            duration={1800}
                        />
                    </div>
                </Container>
            </section>

            <section aria-label="Partenaires" className="py-16 md:py-24">
                <Container>
                    <h2 className="text-primary mb-10 text-center text-2xl font-bold tracking-tight md:text-3xl">
                        Nos partenaires historiques
                    </h2>
                    <div className="mx-auto w-full max-w-6xl">
                        <Carousel opts={{ align: "start" }} className="w-full">
                            <CarouselContent className="-ml-4">
                                {PARTNERS.map((p) => (
                                    <CarouselItem
                                        key={p.src}
                                        className="basis-[85%] pl-4 sm:basis-[33.333%] lg:basis-[20%]"
                                    >
                                        <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-white">
                                            <Image
                                                src={p.src}
                                                alt={`Logo ${p.name}`}
                                                fill
                                                className="object-contain p-6"
                                                sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 85vw"
                                            />
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>

                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
                    </div>
                </Container>
            </section>
            <section aria-label="Accompagnement" className="py-16 md:py-24">
                <Container>
                    <h2 className="text-primary text-center text-2xl font-bold tracking-tight md:text-3xl">
                        Notre accompagnement
                    </h2>

                    <div className="mt-10 grid gap-10 md:grid-cols-3">
                        <div className="space-y-3">
                            <h3 className="text-lg font-semibold">Assistance et support</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                Une équipe dédiée pour accompagner et assister les audioprothésistes
                                pour tous leurs besoins en matière d’assurance.
                            </p>
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-lg font-semibold">
                                Zéro papier, tout se fait en ligne
                            </h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                La souscription et gestion de vos solutions d’assurances sont
                                rapides, intuitives et sécurisées.
                            </p>
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-lg font-semibold">Assurance sur-mesure</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                Une capacité unique à construire des solutions et des programmes
                                simples et cohérents.
                            </p>
                        </div>
                    </div>
                </Container>
            </section>
        </>
    );
}
