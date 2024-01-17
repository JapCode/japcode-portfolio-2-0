'use client';

import { Icon } from '@iconify/react';
import styles from './footerSection.module.css';

const externalLinks = [
  {
    label: 'mdi:linkedin',
    link: 'alskdl;a',
  },
  {
    label: 'mdi:github',
    link: 'alskdl;a',
  },
  {
    label: 'simple-icons:x',
    link: 'alskdl;a',
  },
  {
    label: 'mdi:instagram',
    link: 'alskdl;a',
  },
];

const FooterSection = (): JSX.Element => {
  return (
    <footer className={styles.container}>
      <ul className={styles.elementContainer}>
        {externalLinks.map((element) => (
          <li key={element.link} className={styles.elementList}>
            <Icon icon={element.label} className={styles.elementIcon} />
          </li>
        ))}
      </ul>
    </footer>
  );
};

export default FooterSection;
