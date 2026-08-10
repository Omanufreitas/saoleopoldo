"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MapPin, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/data/lojas";
import { useCountUp } from "@/lib/use-count-up";

const HERO_PHOTOS = ["/images/hero-1.jpg", "/images/hero-2.jpg"];
const PHOTO_SWAP_MS = 3500;

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: "easeOut" as const },
  }),
};

export function Hero() {
  const reduceMotion = useReducedMotion();
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setPhotoIndex((i) => (i + 1) % HERO_PHOTOS.length);
    }, PHOTO_SWAP_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="inicio" className="dsl-hero-bg relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {reduceMotion ? (
          <>
            <div className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-brand-green/15 blur-3xl" />
            <div className="absolute -right-16 top-24 h-96 w-96 rounded-full bg-brand-yellow/20 blur-3xl" />
          </>
        ) : (
          <>
            <motion.div
              className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-brand-green/15 blur-3xl"
              animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -right-16 top-24 h-96 w-96 rounded-full bg-brand-yellow/20 blur-3xl"
              animate={{ x: [0, -25, 0], y: [0, 25, 0], scale: [1, 1.15, 1] }}
              transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
            />
          </>
        )}
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <motion.div
          initial={reduceMotion ? false : "hidden"}
          animate={reduceMotion ? undefined : "visible"}
          className="text-center lg:text-left"
        >
          <motion.p
            custom={0}
            variants={fadeUp}
            className="text-xs font-bold uppercase tracking-[0.2em] text-primary"
          >
            A FARMÁCIA MAIS TRADICIONAL DE CAMPO GRANDE
          </motion.p>

          <motion.h1
            custom={1}
            variants={fadeUp}
            className="mt-4 text-4xl font-extrabold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-[3.4rem]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Quem tem São Leopoldo,{" "}
            <span className="dsl-gradient-text">tem saúde.</span>
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground lg:mx-0"
          >
            Uma das redes de farmácias mais tradicionais de Campo Grande, com 13 unidades
            prontas para te atender com atenção de verdade — desde {siteConfig.anoFundacao}.
          </motion.p>

          <motion.div
            custom={3}
            variants={fadeUp}
            className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 lg:justify-start"
          >
            <CountStat target={13} label="lojas em Campo Grande" />
            <CountStat target={siteConfig.anoFundacao} label="ano de fundação" />
            <CountStat
              target={new Date().getFullYear() - siteConfig.anoFundacao}
              label="anos de história"
            />
          </motion.div>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 1.04 }}
          animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div className="relative aspect-4/5 overflow-hidden rounded-[28px] shadow-2xl shadow-primary/15">
            <AnimatePresence mode="sync">
              <motion.div
                key={photoIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={HERO_PHOTOS[photoIndex]}
                  alt={siteConfig.nome}
                  fill
                  priority={photoIndex === 0}
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="glass-card absolute -bottom-6 -left-6 flex items-center gap-3 px-5 py-4 sm:-left-8">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <ShieldCheck className="h-5 w-5" aria-hidden />
            </span>
            <div>
              <p className="text-sm font-extrabold text-foreground">Tradição desde {siteConfig.anoFundacao}</p>
              <p className="text-xs text-muted-foreground">Fundada por {siteConfig.fundador}</p>
            </div>
          </div>

          <div className="glass-card absolute -top-5 -right-4 flex items-center gap-2 px-4 py-3 sm:-right-6">
            <MapPin className="h-4 w-4 text-primary" aria-hidden />
            <span className="text-xs font-extrabold text-foreground">13 lojas em CG</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function CountStat({ target, label }: { target: number; label: string }) {
  const { ref, value } = useCountUp(target);
  return (
    <div ref={ref} className="text-center lg:text-left">
      <div
        className="text-2xl font-extrabold tabular-nums text-brand-green-dark"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        {value}
      </div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}
