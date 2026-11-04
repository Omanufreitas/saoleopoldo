import type { NextConfig } from "next";

const legacyRedirects: { source: string; destination: string }[] = [
  { source: "/inicial", destination: "/" },
  { source: "/inicial/", destination: "/" },
  {
    source: "/relatorio-de-transparencia-salarial",
    destination: "/wp-content/uploads/2026/04/TRANSPARENCIA-SALARIAL.pdf",
  },
  {
    source: "/relatorio-de-transparencia-salarial/",
    destination: "/wp-content/uploads/2026/04/TRANSPARENCIA-SALARIAL.pdf",
  },
];

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  // O 308 automático de barra final roda antes dos redirects do config.
  // Sem isso, /inicial/ iria para /inicial e só depois para /.
  skipTrailingSlashRedirect: true,
  async redirects() {
    return [
      ...legacyRedirects.map((redirect) => ({
        ...redirect,
        statusCode: 301,
      })),
      {
        source: "/:path+/",
        destination: "/:path+",
        statusCode: 308,
      },
    ];
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
