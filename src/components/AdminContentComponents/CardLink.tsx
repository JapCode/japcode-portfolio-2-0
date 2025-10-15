import Link from 'next/link';
import { FC, ReactNode } from 'react';
import styles from './adminContentComponents.module.css';

export interface CardLinkProps {
  children?: ReactNode;
  name?: string;
  href: string;
}

const CardLink: FC<CardLinkProps> = ({ children, name, href }) => {
  return (
    <Link className={styles.optionCard} href={href}>
      {name != null ? <h4>{name}</h4> : children}
    </Link>
  );
};

export default CardLink;
