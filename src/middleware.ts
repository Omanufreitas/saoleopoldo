import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const LEGACY_PATHS = new Set([
  "/inicial",
  "/inicial/",
  "/relatorio-de-transparencia-salarial",
  "/relatorio-de-transparencia-salarial/",
]);

/**
 * Normaliza barra final (308) depois dos redirects do next.config/vercel.json.
 * Paths legados ficam de fora para não virar 308+301 de novo.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (LEGACY_PATHS.has(pathname)) {
    return NextResponse.next();
  }

  if (pathname.length > 1 && pathname.endsWith("/")) {
    const url = new URL(request.url);
    url.pathname = pathname.replace(/\/+$/, "") || "/";
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|wp-content/).*)"],
};
