import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import type { NextMiddleware, NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { Locale, i18n } from '../i18n.config';

function getLocale(request: NextRequest): Locale | undefined {
  const negotiatorHeaders: Record<string, string> = {};
  (request.headers as Headers).forEach((value, key) => {
    negotiatorHeaders[key] = value;
  });

  const { locales } = i18n;
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

  const locale = matchLocale(languages, locales, i18n.defaultLocale) as Locale;
  return locale;
}

export const middleware: NextMiddleware = (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );
  console.log('áklsjdlakjsd');
  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request) || i18n.defaultLocale; // Use default locale if no locale is determined

    if (locale === i18n.defaultLocale) {
      return NextResponse.rewrite(
        new URL(
          `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
          request.url,
        ),
      );
    }

    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
        request.url,
      ),
    );
  }

  // Add additional logic as needed

  return NextResponse.next();
};

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
