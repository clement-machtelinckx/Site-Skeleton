import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { MdiIcon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

type Props = {
    logoSrc: string;
    logoAlt?: string;
    logoWidth?: number;
    logoHeight?: number;

    title?: string;

    phoneLabel?: string;
    phone: string;

    emailLabel?: string;
    email: string;

    hours?: string;
    description?: string;

    className?: string;

    phoneIconPath?: string;
    emailIconPath?: string;
};

export function InfoCard({
    logoSrc,
    logoAlt = "Logo",
    logoWidth = 220,
    logoHeight = 90,

    title = "Nous contacter",

    phoneLabel = "Téléphone",
    phone,

    emailLabel = "Email",
    email,

    hours,
    description,

    className,

    phoneIconPath,
    emailIconPath,
}: Props) {
    const phoneHref = `tel:${phone.replace(/\s/g, "")}`;
    const emailHref = `mailto:${email}`;

    return (
        <Card className={cn("rounded-2xl", className)}>
            <CardContent className="p-8">
                {/* Logo */}
                <div className="flex justify-center">
                    <Image
                        src={logoSrc}
                        alt={logoAlt}
                        width={logoWidth}
                        height={logoHeight}
                        className="h-auto w-auto max-w-[260px]"
                        priority={false}
                    />
                </div>

                {/* Trait */}
                <div className="my-6 h-px w-full bg-border" />

                {/* Titre */}
                <h2 className="text-2xl font-semibold tracking-tight text-primary">
                    {title}
                </h2>

                {/* Phone */}
                <div className="mt-6 flex gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-foreground text-background">
                        <MdiIcon
                            path={phoneIconPath ?? "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Z"}
                            size={1}
                        />
                    </div>

                    <div className="space-y-1">
                        <div className="text-sm font-semibold">{phoneLabel}</div>
                        <Link
                            href={phoneHref}
                            className="text-base font-semibold underline-offset-4 hover:underline"
                        >
                            {phone}
                        </Link>
                        {hours ? (
                            <p className="text-sm text-muted-foreground">{hours}</p>
                        ) : null}
                    </div>
                </div>

                {/* Email */}
                <div className="mt-6 flex gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-foreground text-background">
                        <MdiIcon
                            path={emailIconPath ?? "M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4Z"}
                            size={1}
                        />
                    </div>

                    <div className="space-y-1">
                        <div className="text-sm font-semibold">{emailLabel}</div>
                        <Link
                            href={emailHref}
                            className="text-base font-semibold underline-offset-4 hover:underline"
                        >
                            {email}
                        </Link>
                    </div>
                </div>

                {/* Description */}
                {description ? (
                    <p className="mt-6 leading-relaxed text-muted-foreground">
                        {description}
                    </p>
                ) : null}
            </CardContent>
        </Card>
    );
}