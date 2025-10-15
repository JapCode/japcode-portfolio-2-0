import { type ReactNode } from 'react';
import styles from './form.module.css';

export function FormContainer({ children }: { children: ReactNode }) {
  return <div className={styles.container}>{children}</div>;
}
