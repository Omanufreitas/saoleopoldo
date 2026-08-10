import type { Metadata, Viewport } from "next";
import { Manrope, Fraunces } from "next/font/google";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { IntroSplash } from "@/components/site/intro-splash";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Drogaria São Leopoldo | Quem tem São Leopoldo, tem saúde",
  description:
    "Rede de farmácias tradicional de Campo Grande - MS, com 13 unidades. Encontre a loja mais próxima e fale direto pelo WhatsApp.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#276a2c",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${manrope.variable} ${fraunces.variable}`}>
      <body className={`${manrope.className} antialiased`}>
        <IntroSplash />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
