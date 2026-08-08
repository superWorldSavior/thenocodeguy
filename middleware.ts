import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './routing';

// Chemins parasites classiques (bots, scanners, WordPress probes, etc.)
const BOT_PATHS = /^\/(wp-|\.env|\.git|\.aws|xmlrpc|admin|login|cgi-bin|phpmyadmin|debug|config|backup|shell|eval|\.well-known\/security|vendor|telescope|actuator|solr|api\/v[0-9]|graphql|_debug|__debug)/i;

const intlMiddleware = createMiddleware(routing);

export default function middleware(req: NextRequest) {
  if (BOT_PATHS.test(req.nextUrl.pathname)) {
    return new NextResponse(null, { status: 404 });
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|umami|.*\\..*).*)']
};
