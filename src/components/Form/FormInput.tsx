import { type ChangeEvent } from 'react';
import styles from './form.module.css';

export interface FormInputProps {
  label: string;
  id: string;
  value: string;
  placeholder?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function FormInput({
  label,
  id,
  value,
  placeholder,
  onChange,
}: FormInputProps) {
  return (
    <div className={styles.formGroup}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input
        id={id}
        type="text"
        value={value}
        placeholder={placeholder}
        className={styles.input}
        onChange={onChange}
      />
    </div>
  );
}
