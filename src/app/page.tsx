import type { Metadata } from "next";
import { Hero } from "@/components/site/hero";
import { FeaturedProductsSection } from "@/components/site/featured-products-section";
import { PromotionSection } from "@/components/site/promotion-section";
import { ContactSection } from "@/components/site/contact-section";
import { SITE_NAME } from "@/lib/site";

const title = "Drogaria São Leopoldo | Quem tem São Leopoldo, tem saúde";
const description =
  "Rede de farmácias tradicional de Campo Grande - MS, com 13 unidades. Encontre a loja mais próxima e fale direto pelo WhatsApp.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    url: "/",
    siteName: SITE_NAME,
    locale: "pt_BR",
    type: "website",
    title,
    description,
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <PromotionSection />
      <FeaturedProductsSection />
      <ContactSection />
    </>
  );
}
