import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ParallaxBackgroundClient } from "@/components/layout/parallaxBackgroundClient";
import { Poppins, Quicksand } from "next/font/google";
import type { Metadata } from "next";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    display: "swap",
});

const quicksand = Quicksand({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    display: "swap",
    variable: "--font-quicksand",
});

export const metadata: Metadata = {
    title: {
        default: "ProtecAudio",
        template: "%s | ProtecAudio",
    },
    description:
        "ProtecAudio accompagne les audioprothésistes avec des solutions d'assurance et de protection adaptées.",
    metadataBase: new URL("https://protecaudio.fr"),
    openGraph: {
        type: "website",
        locale: "fr_FR",
        siteName: "ProtecAudio",
        images: [{ url: "/logo-transparent.png", width: 1200, height: 630 }],
    },
    twitter: {
        card: "summary_large_image",
    },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ProtecAudio",
    url: "https://protecaudio.fr",
    logo: "https://protecaudio.fr/logo-transparent.png",
    description:
        "ProtecAudio accompagne les audioprothésistes avec des solutions d'assurance et de protection adaptées.",
    contactPoint: {
        "@type": "ContactPoint",
        telephone: "+33980085047",
        contactType: "customer service",
        availableLanguage: "French",
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="fr" className={`${poppins.className} ${quicksand.variable}`} suppressHydrationWarning>
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </head>
            <body className="bg-background text-foreground flex min-h-dvh flex-col antialiased">
                <ParallaxBackgroundClient />
                <Header />
                <main id="main" className="flex-1">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}
