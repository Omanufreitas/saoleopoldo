"use client";

import Script from "next/script";
import { useEffect } from "react";

/**
 * Tag do Google Ads + conversões disparadas só no clique.
 * Um listener global cobre todos os links de WhatsApp e de mapa do site,
 * sem precisar instrumentar cada botão.
 */
const AW_ID = "AW-16675952947";

const CONVERSIONS = {
  whatsapp: `${AW_ID}/iBlfCOvVoZ4dELOy248-`, // Clique WhatsApp - Site
  rota: `${AW_ID}/lvufCO7VoZ4dELOy248-`, // Clique Localização (Como chegar) - Site
} as const;

const WHATSAPP_RE = /wa\.me|api\.whatsapp\.com|web\.whatsapp\.com/i;
const MAPS_RE = /maps\.app\.goo\.gl|goo\.gl\/maps|google\.[^/]+\/maps|waze\.com/i;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

function conversionFor(href: string): string | undefined {
  if (WHATSAPP_RE.test(href)) return CONVERSIONS.whatsapp;
  if (MAPS_RE.test(href)) return CONVERSIONS.rota;
  return undefined;
}

export function GoogleAdsTag() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.("a");
      if (!link?.href || typeof window.gtag !== "function") return;

      const sendTo = conversionFor(link.href);
      if (!sendTo) return;

      window.gtag("event", "conversion", {
        send_to: sendTo,
        value: 1.0,
        currency: "BRL",
      });
    };

    // "click" cobre toque/clique; "auxclick" cobre clique do meio (nova aba).
    document.addEventListener("click", onClick, { capture: true });
    document.addEventListener("auxclick", onClick, { capture: true });
    return () => {
      document.removeEventListener("click", onClick, { capture: true });
      document.removeEventListener("auxclick", onClick, { capture: true });
    };
  }, []);

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${AW_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-ads-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${AW_ID}');`}
      </Script>
    </>
  );
}
