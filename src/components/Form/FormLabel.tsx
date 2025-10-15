import { type ReactNode } from 'react';
import styles from './form.module.css';

export interface FormLabelProps {
  children: ReactNode;
  htmlId?: string;
}

export function FormLabel({ children, htmlId }: FormLabelProps) {
  return (
    <label htmlFor={htmlId} className={styles.label}>
      {children}
    </label>
  );
}
