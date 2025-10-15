import { type ChangeEvent } from 'react';
import styles from './form.module.css';

export interface FormTextareaProps {
  label: string;
  id: string;
  value: string;
  maxLength?: number;
  placeholder?: string;
  rows?: number;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

export function FormTextarea({
  label,
  id,
  value,
  maxLength,
  placeholder,
  rows = 5,
  onChange,
}: FormTextareaProps) {
  return (
    <div className={styles.formGroup}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <textarea
        id={id}
        value={value}
        placeholder={placeholder}
        className={styles.textArea}
        maxLength={maxLength}
        onChange={onChange}
        rows={rows}
      />
      {maxLength && (
        <div className={styles.counter}>
          {value.length}/{maxLength}
        </div>
      )}
    </div>
  );
}
