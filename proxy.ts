import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const CANONICAL_HOST = 'www.fgwebdesign.dev';
const NON_CANONICAL_HOSTS = new Set([
  'fgwebdesign.dev',
  'felipegutierrez.dev',
  'www.felipegutierrez.dev',
]);

const intlMiddleware = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  const host = request.headers.get('host')?.split(':')[0];

  if (host && NON_CANONICAL_HOSTS.has(host)) {
    const url = new URL(request.url);
    url.host = CANONICAL_HOST;
    url.protocol = 'https';
    return NextResponse.redirect(url, 308);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/', '/(en|es)/:path*', '/((?!_next|_vercel|.*\\..*).*)'],
};
