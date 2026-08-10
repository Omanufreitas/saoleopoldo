"use client";

import { motion } from "framer-motion";
import { Facebook, Instagram, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/data/lojas";
import { cn } from "@/lib/utils";

const CANAIS = [
  {
    icon: Phone,
    titulo: "Telefone",
    valor: siteConfig.telefonePrincipal,
    href: `tel:+55${siteConfig.telefonePrincipal.replace(/\D/g, "")}`,
  },
  {
    icon: Mail,
    titulo: "E-mail",
    valor: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  {
    icon: MapPin,
    titulo: "Endereço",
    valor: siteConfig.endereco,
    href: undefined,
  },
];

export function ContactSection() {
  return (
    <section id="contato" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
      <div className="mb-10 text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-primary">Fale com a gente</p>
        <h2
          className="mt-2 text-3xl font-extrabold text-foreground sm:text-4xl"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Contato
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
          Precisa de ajuda, tem uma dúvida ou quer saber mais sobre nossos produtos? Fale com a
          Drogaria São Leopoldo pelo canal que preferir.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {CANAIS.map((canal, i) => (
          <motion.div
            key={canal.titulo}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: i * 0.08, ease: "easeOut" }}
            className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-6 text-center shadow-sm"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-[color:var(--brand-green-dark)]">
              <canal.icon className="h-5 w-5" aria-hidden />
            </span>
            <h3 className="font-extrabold text-foreground">{canal.titulo}</h3>
            {canal.href ? (
              <a href={canal.href} className="text-sm text-muted-foreground hover:text-primary">
                {canal.valor}
              </a>
            ) : (
              <p className="text-sm text-muted-foreground">{canal.valor}</p>
            )}
          </motion.div>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <a
          href={`https://wa.me/${siteConfig.whatsappPrincipal}`}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: "default", size: "lg" }), "btn-shimmer")}
        >
          <MessageCircle className="h-4 w-4" aria-hidden />
          Falar no WhatsApp
        </a>
        <a
          href={siteConfig.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
        >
          <Instagram className="h-4 w-4" aria-hidden />
          Instagram
        </a>
        <a
          href={siteConfig.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
        >
          <Facebook className="h-4 w-4" aria-hidden />
          Facebook
        </a>
      </div>
    </section>
  );
}
