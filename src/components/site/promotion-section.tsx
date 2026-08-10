"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Instagram, MessageCircle } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/data/lojas";
import { cn } from "@/lib/utils";

/**
 * Banners de exemplo, com fotos reais licenciadas (Adobe Stock) só pra
 * ilustrar — troque pelas artes/promoções reais quando tiver definidas.
 */
const BANNERS = [
  {
    imagem: "/images/promo/ofertas-gerais.jpg",
    tag: "Ofertas da semana",
    titulo: "Descontos especiais em toda a loja",
    descricao: "Vitaminas, suplementos e medicamentos com condições especiais em todas as unidades.",
  },
  {
    imagem: "/images/promo/generico-uso-continuo.jpg",
    tag: "Uso contínuo",
    titulo: "Genéricos com preço justo",
    descricao: "Economize na hora de renovar os medicamentos que você usa todos os dias.",
  },
  {
    imagem: "/images/promo/perfumaria-cosmeticos.jpg",
    tag: "Perfumaria & Cuidados",
    titulo: "Beleza e bem-estar em um só lugar",
    descricao: "Linha completa de perfumaria e cosméticos com condições exclusivas.",
  },
];

const AUTO_ADVANCE_MS = 6000;

export function PromotionSection() {
  const [index, setIndex] = useState(0);

  const next = useCallback(() => setIndex((i) => (i + 1) % BANNERS.length), []);
  const prev = useCallback(() => setIndex((i) => (i - 1 + BANNERS.length) % BANNERS.length), []);

  useEffect(() => {
    const id = setInterval(next, AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [next]);

  const banner = BANNERS[index];

  return (
    <section id="promocao" className="px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-6xl text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-primary">Promoção</p>
        <h2
          className="mt-2 text-3xl font-extrabold text-foreground sm:text-4xl"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Ofertas que cabem no seu bolso
        </h2>
      </div>

      <div className="relative mx-auto mt-8 max-w-6xl overflow-hidden rounded-[28px] shadow-xl shadow-primary/10">
        <div className="relative h-105 sm:h-110">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <Image
                src={banner.imagem}
                alt={banner.titulo}
                fill
                priority={index === 0}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-(--brand-green-dark)/95 via-(--brand-green-dark)/45 to-(--brand-green-dark)/10" />

              <div className="absolute inset-0 flex flex-col items-center justify-end px-6 pb-12 text-center sm:px-12 sm:pb-14">
                <span className="rounded-full bg-brand-yellow px-4 py-1.5 text-xs font-extrabold text-brand-green-dark">
                  {banner.tag}
                </span>
                <h3
                  className="mt-4 max-w-xl text-2xl font-extrabold text-white sm:text-3xl"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {banner.titulo}
                </h3>
                <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/80 sm:text-[15px]">
                  {banner.descricao}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Setas */}
        <button
          type="button"
          onClick={prev}
          aria-label="Oferta anterior"
          className="absolute left-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-colors hover:bg-white/25 sm:flex"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden />
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Próxima oferta"
          className="absolute right-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-colors hover:bg-white/25 sm:flex"
        >
          <ChevronRight className="h-5 w-5" aria-hidden />
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2">
          {BANNERS.map((b, i) => (
            <button
              key={b.titulo}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Ir para oferta ${i + 1}`}
              className={cn(
                "h-2 rounded-full transition-all",
                i === index ? "w-6 bg-brand-yellow" : "w-2 bg-white/40 hover:bg-white/60"
              )}
            />
          ))}
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <a
          href={siteConfig.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: "accent", size: "lg" }))}
        >
          <Instagram className="h-4 w-4" aria-hidden />
          Seguir no Instagram
        </a>
        <a
          href={`https://wa.me/${siteConfig.whatsappPrincipal}`}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
        >
          <MessageCircle className="h-4 w-4" aria-hidden />
          Perguntar no WhatsApp
        </a>
      </div>
    </section>
  );
}
