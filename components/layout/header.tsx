import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "./container";
import { MenuBurger } from "./menuBurger";
import { NavLink } from "./navLink";
import Image from "next/image";

export function Header() {
    return (
        <header className="bg-background/80 sticky top-0 z-50 border-b backdrop-blur">
            <a
                href="#main"
                className="focus:bg-primary focus:text-primary-foreground sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:rounded focus:px-4 focus:py-2"
            >
                Aller au contenu principal
            </a>
            <Container>
                <div className="flex h-16 items-center justify-between">
                    <Link href="/" className="font-semibold tracking-tight">
                        <Image
                            src="/logo-transparent.png"
                            alt="Protec'audio Logo"
                            width={120}
                            height={20}
                            className="h-auto w-auto max-w-[220px]"
                            priority={false}
                        />
                    </Link>

                    <nav
                        aria-label="Navigation principale"
                        className="hidden items-center gap-6 md:flex"
                    >
                        <NavLink
                            href="/"
                            className="text-muted-foreground hover:text-foreground text-base"
                        >
                            Accueil
                        </NavLink>
                        <NavLink
                            href="/garantie"
                            className="text-muted-foreground hover:text-foreground text-base"
                        >
                            Garanties audioprothèses
                        </NavLink>
                        <NavLink
                            href="/protection"
                            className="text-muted-foreground hover:text-foreground text-base"
                        >
                            Solutions audioprothésistes
                        </NavLink>
                        <NavLink
                            href="/join"
                            className="text-muted-foreground hover:text-foreground text-base"
                        >
                            Nous rejoindre
                        </NavLink>
                    </nav>

                    <div className="flex items-center gap-2">
                        {/* Desktop CTA */}
                        <Button asChild className="hidden md:inline-flex">
                            <Link href="/contact">Contact</Link>
                        </Button>

                        {/* Mobile burger */}
                        <MenuBurger />
                    </div>
                </div>
            </Container>
        </header>
    );
}
