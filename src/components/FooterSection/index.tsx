'use client';

import socialMedia from '@/data/socialMedia';
import { usePathname } from 'next/navigation';
import SocialIcon from '../SocialIcon';
import styles from './footerSection.module.css';

const FooterSection = (): JSX.Element | null => {
  const pathname = usePathname();
  if (pathname.includes('contact')) return null;

  return (
    <footer className={styles.container}>
      <ul className={styles.elementContainer}>
        {socialMedia.map((element) => (
          <li key={element.id} className={styles.elementList}>
            <a href={element.link} target="_blank" rel="noopener noreferrer">
              <SocialIcon
                iconName={element.icon}
                className={styles.elementIcon}
              />
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
};

export default FooterSection;
