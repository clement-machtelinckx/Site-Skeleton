import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ParallaxBackground } from "@/components/layout/ParallaxBackground";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className="min-h-dvh bg-background text-foreground antialiased">
        <ParallaxBackground />
        <Header />
        <main className="">{children}</main>
        <Footer />
      </body>
    </html>
  );
}