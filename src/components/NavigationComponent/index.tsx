'use client';

import { INavigation } from '@/types/dictionaries';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import { Locale } from '../../../i18n.config';
import SwitchLanguages from '../SwitchLanguages';
import styles from './navigation.module.css';

interface INavigationComponent {
  page: INavigation;
  locale: Locale;
}

const NavigationComponent: FC<INavigationComponent> = ({
  page,
  locale,
}): JSX.Element => {
  const pageRoutes = [
    {
      label: page.home,
      route: `/${locale}`,
    },
    {
      label: page.projects,
      route: `/${locale}/projects`,
    },
    {
      label: page.contacts,
      route: `/${locale}/contact`,
    },
  ];
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const handlerClick = (): void => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      setIsOpen(false);
    }
  }, [pathname]);
  return (
    <div className={styles.gridContainer}>
      <button
        type="button"
        onClick={handlerClick}
        className={styles.menuButton}
        // onTransitionEnd={handlerClick}
      >
        {isOpen ? (
          <Icon icon="cil:x" className={styles.menuIcon} />
        ) : (
          <Icon icon="entypo:dots-three-vertical" className={styles.menuIcon} />
        )}
      </button>
      <section
        className={styles.mobileNavigationContainer}
        style={{
          top: isOpen ? 0 : '-100vh',
        }}
      >
        <ul className={styles.mobileNavigationElements}>
          {pageRoutes.map((element) => (
            <li
              key={element.route}
              className={`${styles.element} ${
                pathname === element.route ? styles.elementActive : ''
              }`}
            >
              <Link href={element.route}>
                <span className={styles.mobileLink}>{element.label}</span>
              </Link>
            </li>
          ))}
          {/* <SwitchLanguagesMobile lang={locale} page={page} /> */}
        </ul>
        <div className={styles.lang}>
          Language:
          <SwitchLanguages lang={locale} page={page} />
        </div>
      </section>
      <section className={styles.navigationContainer}>
        <ul className={styles.navigationElements}>
          {pageRoutes.map((element) => (
            <li key={element.route}>
              <Link
                href={element.route}
                className={`${styles.element} ${
                  pathname === element.route ? styles.elementActive : ''
                }`}
              >
                {element.label}
              </Link>
            </li>
          ))}
          <li>
            <SwitchLanguages lang={locale} page={page} />
          </li>
        </ul>
      </section>
    </div>
  );
};
export default NavigationComponent;
