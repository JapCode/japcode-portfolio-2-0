'use client';

import { INavigation } from '@/types/dictionaries';
import capitalizeFirstLetter from '@/utils/CapitalizeFirstLetter';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC, useEffect, useRef, useState } from 'react';
import { Locale, i18n } from '../../../i18n.config';
import styles from './switchLanguages.module.css';

interface ISwitchLanguagesProps {
  page: INavigation;
  lang: Locale;
}

// const allLanguages = [
//   {

//   }
// ]

const SwitchLanguages: FC<ISwitchLanguagesProps> = ({
  page,
  lang,
}): JSX.Element => {
  const pathName = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const redirectedPathName = (locale: string): string => {
    if (!pathName) return '/';
    const segments = pathName.split('/');
    segments[1] = locale;
    return segments.join('/');
  };

  const subMenuAnimate = {
    enter: {
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.5,
      },
      display: 'block',
    },
    exit: {
      opacity: 0,
      rotateX: -15,

      transition: {
        duration: 0.5,
        delay: 0.3,
      },
      transitionEnd: {
        display: 'none',
      },
    },
  };
  const toggleHoverMenu = (): void => {
    setIsOpen(!isOpen);
  };

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.container} ref={menuRef}>
      <button className={styles.button} type="button" onClick={toggleHoverMenu}>
        <span>
          {capitalizeFirstLetter(lang)}
          {/* <Icon icon="ep:arrow-down-bold" className={styles.buttonIcon} /> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={styles.buttonIcon}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M6 9l6 6l6 -6" />
          </svg>
        </span>
      </button>
      <motion.div className="menu-item">
        <motion.div
          className={styles.optionsContainer}
          initial="exit"
          animate={isOpen ? 'enter' : 'exit'}
          // style={{ position: 'absolute', top: 35 }}
          variants={subMenuAnimate}
        >
          <ul className={styles.optionsMenu}>
            {i18n.locales.map((locale) => {
              return (
                <li key={locale}>
                  <Link
                    className={styles.optionItem}
                    href={redirectedPathName(locale)}
                    onClick={toggleHoverMenu}
                  >
                    {capitalizeFirstLetter(locale)} ({page.languages[locale]})
                  </Link>
                </li>
              );
            })}
          </ul>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SwitchLanguages;
