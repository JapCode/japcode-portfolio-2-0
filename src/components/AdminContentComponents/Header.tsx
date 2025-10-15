import { FC, ReactNode } from 'react';
import styles from './adminContentComponents.module.css';

export interface HeaderProps {
  children: ReactNode;
  title?: string;
}

const Header: FC<HeaderProps> = ({ children, title }) => {
  return (
    <div className={styles.header}>
      {title != null && <h1>{title}</h1>}
      {children}
    </div>
  );
};

export default Header;
