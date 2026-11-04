import type { Metadata } from "next";
import { AboutSection } from "@/components/site/about-section";
import { siteConfig } from "@/data/lojas";
import { SITE_NAME } from "@/lib/site";

const title = "Quem Somos | Drogaria São Leopoldo";
const description = `Conheça a história da Drogaria São Leopoldo, fundada em ${siteConfig.fundacao} por ${siteConfig.fundador}.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/quem-somos" },
  openGraph: {
    url: "/quem-somos",
    siteName: SITE_NAME,
    locale: "pt_BR",
    type: "website",
    title,
    description,
  },
};

export default function QuemSomosPage() {
  return (
    <>
      <section className="dsl-hero-bg relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-brand-green/15 blur-3xl" />
          <div className="absolute -right-16 top-16 h-80 w-80 rounded-full bg-brand-yellow/20 blur-3xl" />
        </div>

        <div className="mx-auto flex max-w-6xl flex-col items-center px-4 pb-6 pt-16 text-center sm:px-6 sm:pb-8 sm:pt-20">
          <p className="text-xs font-bold uppercase tracking-widest text-primary">
            Drogaria São Leopoldo
          </p>
          <h1
            className="mt-3 max-w-2xl text-4xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-5xl"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Quem Somos
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Tradição, cuidado e proximidade com Campo Grande desde {siteConfig.anoFundacao}.
          </p>
        </div>
      </section>

      <AboutSection />
    </>
  );
}
