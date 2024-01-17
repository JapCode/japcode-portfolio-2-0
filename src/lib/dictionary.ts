'use Server';

import { IDictionary } from '@/types/dictionaries';
import 'server-only';
import { Locale } from '../../i18n.config';

interface Dictionaries {
  [key: string]: () => Promise<IDictionary>;
}

const dictionaries: Dictionaries = {
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
  es: () => import('@/dictionaries/es.json').then((module) => module.default),
};
const getDictionary = async (locale: Locale): Promise<IDictionary> => {
  try {
    if (locale == null) throw new Error();
    const dictionaryModule = await dictionaries[locale]();
    return dictionaryModule;
  } catch (error) {
    console.error(`Error loading dictionary for ${locale}:`, error);
    throw error; // Puedes manejar el error de la manera que prefieras
  }
};

export default getDictionary;
