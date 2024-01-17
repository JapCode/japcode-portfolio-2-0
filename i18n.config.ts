export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'es'],
} as const;

export type GenerateStaticParamsReturnType = { lang: string }[];
export type Locale = (typeof i18n)['locales'][number];
