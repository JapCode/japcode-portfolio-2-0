'use Server';

import 'server-only';
import { Locale } from '../../i18n.config';

const dictionaries = {
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
  es: () => import('@/dictionaries/es.json').then((module) => module.default),
};
const getDictionary = async (locale: Locale) => {
  try {
    if (locale == null) throw new Error();
    console.log('this is locale', locale);
    const module = await dictionaries[locale]();
    return module;
  } catch (error) {
    console.error(`Error loading dictionary for ${locale}:`, error);
    throw error; // Puedes manejar el error de la manera que prefieras
  }
};

export default getDictionary;
