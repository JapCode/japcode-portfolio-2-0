import getDictionary from '@/lib/dictionary';
import { FC, ReactNode } from 'react';
import { Locale } from '../../../i18n.config';
import NavigationComponent from '../NavigationComponent';
import styles from './wrapperStyles.module.css';

interface IWrapperContent {
  children: ReactNode;
  lang: Locale;
}

const WrapperContent: FC<IWrapperContent> = async ({
  children,
  lang,
}): Promise<JSX.Element> => {
  'use Server';

  const { navigation } = await getDictionary(lang);
  return (
    <div className={styles.container}>
      <NavigationComponent page={navigation} locale={lang} />
      {children}
    </div>
  );
};
export default WrapperContent;
