// components/ui/Table.tsx
import Link from 'next/link';
import { FC, ReactNode } from 'react';
import styles from './table.module.css';

interface TableProps {
  children: ReactNode;
  className?: string;
}

const Table: FC<TableProps> & {
  Desktop: FC<{ children: ReactNode }>;
  Head: FC<{ children: ReactNode }>;
  Body: FC<{ children: ReactNode }>;
  Row: FC<{ children: ReactNode }>;
  Cell: FC<{ children: ReactNode; isHeader?: boolean }>;
  Image: FC<{ src: string; alt: string }>;
  Btn: FC<{ href: string; name: string }>;

  Mobile: FC<{ children: ReactNode }>;
  MobileCard: FC<{ children: ReactNode }>;
  MobileImage: FC<{ src: string; alt?: string }>;
  MobileContent: FC<{ children: ReactNode }>;
  MobileTitle: FC<{ children: ReactNode }>;
  MobileMeta: FC<{ children: ReactNode }>;
} = ({ children, className }) => (
  <div className={`${styles.tableWrapper} ${className ?? ''}`}>{children}</div>
);

//
// 🖥️ Desktop
//
Table.Desktop = ({ children }) => (
  <div className={styles.desktopContainer}>
    <table className={styles.table}>{children}</table>
  </div>
);
Table.Head = ({ children }) => <thead>{children}</thead>;
Table.Body = ({ children }) => <tbody>{children}</tbody>;
Table.Row = ({ children }) => <tr className={styles.row}>{children}</tr>;
Table.Cell = ({ children, isHeader }) =>
  isHeader ? (
    <th className={`${styles.cell} ${styles.header}`}>{children}</th>
  ) : (
    <td className={styles.cell}>{children}</td>
  );
Table.Image = ({ alt, src }) => (
  <img src={src} alt={alt} className={styles.image} />
);
Table.Btn = ({ href, name }) => (
  <Link href={href} className={styles.editBtn}>
    {name}
  </Link>
);

//
// 📱 Mobile
//
Table.Mobile = ({ children }) => (
  <div className={styles.mobileContainer}>{children}</div>
);

Table.MobileCard = ({ children }) => (
  <div className={styles.mobileCard}>{children}</div>
);

Table.MobileImage = ({ src, alt }) => (
  <figure className={styles.mobileImage}>
    <img src={src} alt={alt} />
  </figure>
);

Table.MobileContent = ({ children }) => (
  <div className={styles.mobileContent}>{children}</div>
);

Table.MobileTitle = ({ children }) => (
  <h4 className={styles.mobileTitle}>{children}</h4>
);

Table.MobileMeta = ({ children }) => (
  <div className={styles.mobileMeta}>{children}</div>
);

export default Table;
