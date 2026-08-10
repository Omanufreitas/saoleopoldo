"use client";

import Link from "next/link";
import { Instagram, MessageCircle } from "lucide-react";
import { Logo } from "@/components/site/logo";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/data/lojas";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Início", href: "/#inicio" },
  { label: "Nossas Lojas", href: "/nossas-lojas" },
  { label: "Quem Somos", href: "/quem-somos" },
  { label: "Promoção", href: "/#promocao" },
  { label: "Contato", href: "/#contato" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-3 sm:px-6">
        <Link href="/#inicio" className="shrink-0">
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
            WhatsApp
          </a>
        </div>
      </div>
    </header>
  );
}
