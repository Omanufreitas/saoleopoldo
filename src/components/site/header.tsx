"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Instagram, Menu, MessageCircle, X } from "lucide-react";
import { Logo } from "@/components/site/logo";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/data/lojas";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Início", href: "/#inicio" },
  { label: "Nossas Lojas", href: "/nossas-lojas" },
  { label: "Quem Somos", href: "/quem-somos" },
  { label: "Contato", href: "/#contato" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-3 sm:px-6">
        <Link href="/#inicio" className="shrink-0" onClick={() => setMenuOpen(false)}>
          <Logo />
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-semibold text-muted-foreground md:flex">
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} className="transition-colors hover:text-primary">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="https://www.instagram.com/drogariasaoleopoldo/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className={cn(buttonVariants({ variant: "outline", size: "sm" }), "px-3")}
          >
            <Instagram className="h-4 w-4" aria-hidden />
          </a>

          <a
            href={`https://wa.me/${siteConfig.whatsappPrincipal}`}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "default", size: "sm" }), "btn-shimmer")}
          >
            <MessageCircle className="h-4 w-4" aria-hidden />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            className={cn(buttonVariants({ variant: "outline", size: "sm" }), "px-3 md:hidden")}
          >
            {menuOpen ? <X className="h-4 w-4" aria-hidden /> : <Menu className="h-4 w-4" aria-hidden />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden border-t border-border/70 bg-background md:hidden"
          >
            <div className="flex flex-col px-4 py-2 sm:px-6">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="border-b border-border/50 py-3 text-sm font-semibold text-foreground transition-colors last:border-none hover:text-primary"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
