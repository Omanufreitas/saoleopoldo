"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/lojas";

/**
 * Produtos e preços de exemplo, só pra ilustrar o layout — troque pelos
 * produtos/valores reais em promoção quando tiver definidos.
 */
const PRODUTOS = [
  {
    imagem: "/images/produtos/whey.jpg",
    nome: "Whey Protein",
    descricao: "900g · diversos sabores",
    precoDe: "R$ 189,90",
    precoPor: "R$ 149,90",
  },
  {
    imagem: "/images/produtos/vitaminas.jpg",
    nome: "Vitaminas em Gomas",
    descricao: "Multivitamínico · pote",
    precoDe: "R$ 59,90",
    precoPor: "R$ 39,90",
  },
  {
    imagem: "/images/produtos/omega3.jpg",
    nome: "Ômega 3",
    descricao: "1000mg · 60 cápsulas",
    precoDe: "R$ 49,90",
    precoPor: "R$ 34,90",
  },
  {
    imagem: "/images/produtos/creatina.jpg",
    nome: "Creatina Monohidratada",
    descricao: "300g · pura",
    precoDe: "R$ 99,90",
    precoPor: "R$ 79,90",
  },
];

export function FeaturedProductsSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="mb-10 text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-primary">Ofertas do mês</p>
        <h2
          className="mt-2 text-3xl font-extrabold text-foreground sm:text-4xl"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Produtos em promoção
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
        {PRODUTOS.map((produto, i) => (
          <motion.div
            key={produto.nome}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: i * 0.08, ease: "easeOut" }}
            className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:border-primary hover:shadow-lg hover:shadow-primary/10"
          >
            <div className="relative aspect-square bg-white">
              <Image
                src={produto.imagem}
                alt={produto.nome}
                fill
                className="object-contain p-4"
                sizes="(max-width: 640px) 50vw, 25vw"
              />
            </div>

            <div className="flex flex-1 flex-col p-4 sm:p-5">
              <h3 className="text-sm font-extrabold text-foreground sm:text-base">{produto.nome}</h3>
              <p className="mt-0.5 text-xs text-muted-foreground">{produto.descricao}</p>

              <div className="mt-3">
                <p className="text-xs text-muted-foreground line-through">{produto.precoDe}</p>
                <p
                  className="text-xl font-extrabold text-primary sm:text-2xl"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {produto.precoPor}
                </p>
              </div>

              <a
                href={`https://wa.me/${siteConfig.whatsappPrincipal}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center justify-center gap-1.5 rounded-lg bg-primary py-2.5 text-xs font-bold text-primary-foreground transition-colors hover:bg-[#1f4d23]"
              >
                <MessageCircle className="h-3.5 w-3.5" aria-hidden />
                Consultar
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
