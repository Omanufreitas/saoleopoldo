"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { siteConfig } from "@/data/lojas";

export function AboutSection() {
  return (
    <section id="quem-somos" className="px-4 py-10 sm:px-6">
      <div className="dsl-gradient mx-auto max-w-6xl overflow-hidden rounded-[28px]">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative min-h-[280px] lg:min-h-[460px]"
          >
            <Image
              src="/images/hero-2.jpg"
              alt={siteConfig.nome}
              fill
              className="object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col justify-center px-8 py-14 sm:px-12 lg:py-16"
          >
            <p className="text-xs font-bold uppercase tracking-widest text-brand-yellow">Quem somos</p>
            <h2
              className="mt-3 text-3xl font-extrabold text-white sm:text-4xl"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Tradição e cuidado desde {siteConfig.anoFundacao}
            </h2>
            <p className="mt-6 text-[15px] leading-relaxed text-white/75">
              Fundada em <strong className="text-white">{siteConfig.fundacao}</strong> por{" "}
              <strong className="text-white">{siteConfig.fundador}</strong>, a Drogaria São
              Leopoldo é hoje uma das redes de farmácias mais tradicionais e respeitadas de
              Campo Grande – MS. Com <strong className="text-white">13 unidades</strong>{" "}
              estrategicamente localizadas, levamos saúde, bem-estar e beleza para milhares de
              clientes todos os dias.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-white/75">
              Nossa história é marcada pelo compromisso com um atendimento próximo, ético e de
              qualidade — desde medicamentos essenciais até produtos de cuidado pessoal,
              estética e perfumaria.
            </p>

            <p
              className="mt-7 text-xl font-semibold text-brand-yellow"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              &ldquo;{siteConfig.tagline}&rdquo;
            </p>

            <div className="mt-8 flex items-center gap-3 border-t border-white/15 pt-6">
              <div
                className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-yellow/15 text-sm font-bold text-brand-yellow"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                AB
              </div>
              <div>
                <p className="text-sm font-bold text-white">{siteConfig.fundador}</p>
                <p className="text-xs text-white/55">Fundador · desde {siteConfig.anoFundacao}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
