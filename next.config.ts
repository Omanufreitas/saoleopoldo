import type { NextConfig } from "next";

const legacyRedirects: { source: string; destination: string }[] = [
  // Versões com barra primeiro: na Vercel o strip de trailing slash
  // não pode ganhar da regra legada.
  { source: "/inicial/", destination: "/" },
  { source: "/inicial", destination: "/" },
  {
    source: "/relatorio-de-transparencia-salarial/",
    destination: "/wp-content/uploads/2026/04/TRANSPARENCIA-SALARIAL.pdf",
  },
  {
    source: "/relatorio-de-transparencia-salarial",
    destination: "/wp-content/uploads/2026/04/TRANSPARENCIA-SALARIAL.pdf",
  },
  // URL final dos anúncios do Google Ads (página do site antigo).
  // O redirect preserva a query string, então o gclid chega intacto.
  { source: "/farmacia/:path*/", destination: "/nossas-lojas" },
  { source: "/farmacia/:path*", destination: "/nossas-lojas" },
];

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Sem o 308 automático. O catch-all /:path+/ na Vercel acabava
  // rodando antes dos 301 legados e gerava 2 saltos.
  skipTrailingSlashRedirect: true,
  async redirects() {
    return legacyRedirects.map((redirect) => ({
      ...redirect,
      statusCode: 301,
    }));
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "drogariasaoleopoldo.com.br",
      },
    ],
  },
};

export default nextConfig;
