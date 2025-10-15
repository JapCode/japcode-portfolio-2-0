// middleware.ts
import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import {
  NextResponse,
  type NextFetchEvent,
  type NextRequest,
} from 'next/server';
import { auth } from '../auth';
import { i18n, Locale } from '../i18n.config';

// Detecta el locale desde las cabeceras
function getLocale(request: NextRequest): Locale {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => {
    negotiatorHeaders[key] = value;
  });

  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  return matchLocale(languages, i18n.locales, i18n.defaultLocale) as Locale;
}

// Middleware principal
export async function middleware(request: NextRequest, _next: NextFetchEvent) {
  const { pathname } = request.nextUrl;

  // 1. Redirección si no hay locale
  const missingLocale = i18n.locales.every(
    (locale: Locale) =>
      !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );

  // Rutas sin locales
  const isNotLocalized = ['/admin', '/admin/login', '/admin/test'];
  const notNeedsLocale =
    pathname.startsWith('/admin') || isNotLocalized.includes(pathname);

  if (missingLocale && !notNeedsLocale) {
    const locale = getLocale(request) || i18n.defaultLocale;
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
        request.url,
      ),
    );
  }

  // 2. Autenticación condicional para rutas privadas
  const isProtected = pathname.startsWith('/admin'); // ejemplo
  console.log('isProtected:', isProtected);

  if (!pathname.includes('/admin/login') && isProtected) {
    const session = await auth();

    if (!session?.user) {
      const loginUrl = new URL(`/${pathname.split('/')[1]}/login`, request.url); // respeta el locale
      return NextResponse.redirect(loginUrl);
    }
  }

  // return NextResponse.next();
}

// Matcher global
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.\\w+$).*)'],
};
