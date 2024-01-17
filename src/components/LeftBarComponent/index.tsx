'use client';

import { Icon } from '@iconify/react';
import styles from './leftBar.module.css';

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
    label: 'mdi:twitter',
    link: 'alskdl;a',
  },
  {
    label: 'mdi:instagram',
    link: 'alskdl;a',
  },
];

const LeftBarComponent = (): JSX.Element => {
  return (
    <ul className={styles.elementContainer}>
      {externalLinks.map((element) => (
        <li key={element.link} className={styles.elementList}>
          <Icon icon={element.label} className={styles.elementIcon} />
        </li>
      ))}
    </ul>
  );
};
export default LeftBarComponent;
