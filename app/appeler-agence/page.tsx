"use client";

import { useState } from "react";
import { ContactCard } from "@/components/special/contactCard";
import { Container } from "@/components/layout/container";
import { ContactDialog } from "@/components/special/contactDialog";
import { mdiPhone } from "@mdi/js";
import { Button } from "@/components/ui/button";


type DialogType = "partner" | "become" | "customer" | null;

export default function AppelerAgence() {
    const [open, setOpen] = useState<DialogType>(null);

    const dialogData =
        open === "partner"
            ? { title: "Contact", phone: "02 79 02 77 28", email: "partenaires@markassur.com" }
            : open === "become"
                ? { title: "Contact", phone: "02 79 02 77 28", email: "devenir@markassur.com" }
                : open === "customer"
                    ? { title: "Contact", phone: "02 79 02 77 28", email: "contact@markassur.com" }
                    : null;

    return (
        <>
            <section>
                <Container>
                    <h1 className="mt-16 text-center text-4xl font-semibold">
                        Accueil téléphonique du lundi au vendredi de 9h à 18h.
                    </h1>
                </Container>
            </section>

            <section>
                <Container>
                    <div className="m-16 grid gap-10 md:grid-cols-3">
                        <ContactCard
                            title="VOUS ETES PARTENAIRE"
                            buttonLabel="Cliquez ici"
                            iconPath={mdiPhone}
                            className="whitespace-pre-line"
                            onClick={() => setOpen("partner")}
                        />

                        <ContactCard
                            title="VOUS SOUHAITEZ DEVENIR PARTENAIRE"
                            buttonLabel="Cliquez ici"
                            iconPath={mdiPhone}
                            className="whitespace-pre-line"
                            onClick={() => setOpen("become")}
                        />

                        <ContactCard
                            title="VOUS ETES PARTICULIER"
                            buttonLabel="Cliquez ici"
                            iconPath={mdiPhone}
                            className="whitespace-pre-line"
                            onClick={() => setOpen("customer")}
                        />
                    </div>
                </Container>
            </section>

            {dialogData ? (
                <ContactDialog
                    open={open !== null}
                    onOpenChange={(v) => setOpen(v ? open : null)}
                    title={dialogData.title}
                    phone={dialogData.phone}
                    email={dialogData.email}
                    imageSrc="/bebe-pigeon.jpg"
                />
            ) : null}
        </>
    );
}