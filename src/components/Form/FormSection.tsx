import { type ReactNode } from 'react';
import styles from './form.module.css';

export function FormSection({ children }: { children: ReactNode }) {
  return <section className={styles.formGroup}>{children}</section>;
}
