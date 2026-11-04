import type { Metadata, Viewport } from "next";
import { Manrope, Fraunces } from "next/font/google";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { SITE_NAME, SITE_URL } from "@/lib/site";
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

const defaultTitle = "Drogaria São Leopoldo | Quem tem São Leopoldo, tem saúde";
const defaultDescription =
  "Rede de farmácias tradicional de Campo Grande - MS, com 13 unidades. Encontre a loja mais próxima e fale direto pelo WhatsApp.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: defaultTitle,
  description: defaultDescription,
  alternates: { canonical: "/" },
  openGraph: {
    url: "/",
    siteName: SITE_NAME,
    locale: "pt_BR",
    type: "website",
    title: defaultTitle,
    description: defaultDescription,
  },
  verification: {
    google: "xPZ02pr03wzOtkdkO85xe6zZ39z-bfbDtX5IXdLQ1Jg",
  },
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
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
