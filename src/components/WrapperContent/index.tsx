import getDictionary from '@/lib/dictionary';
import { ReactNode } from 'react';
import { Locale } from '../../../i18n.config';
import NavigationComponent from '../NavigationComponent';
import styles from './wrapperStyles.module.css';

interface IWrapperContent {
  children: ReactNode;
  lang: Locale;
}

// ✅ Server Component sin usar FC
export default async function WrapperContent({
  children,
  lang,
}: IWrapperContent) {
  const { navigation } = await getDictionary(lang);

  return (
    <div className={styles.container}>
      <NavigationComponent page={navigation} locale={lang} />
      {children}
    </div>
  );
}
