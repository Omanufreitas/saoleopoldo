import { Hero } from "@/components/site/hero";
import { FeaturedProductsSection } from "@/components/site/featured-products-section";
import { PromotionSection } from "@/components/site/promotion-section";
import { ContactSection } from "@/components/site/contact-section";

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
