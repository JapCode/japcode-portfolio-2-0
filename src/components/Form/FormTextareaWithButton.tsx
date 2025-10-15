import { LucideIcon } from 'lucide-react';
import { ChangeEvent } from 'react';
import styles from './form.module.css';

export interface FormTextareaWithButtonProps {
  id?: string;
  label: string;
  value?: string;
  placeholder?: string;
  rows?: number;
  icon: LucideIcon;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onTogglePreview: () => void;
}

export function FormTextareaWithButton({
  id = 'content',
  label,
  value,
  placeholder,
  rows = 10,
  icon: Icon,
  onChange,
  onTogglePreview,
}: FormTextareaWithButtonProps) {
  return (
    <section className={styles.formGroup}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <textarea
        id={id}
        name={id}
        className={styles.textArea}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        rows={rows}
      />
      <div className={styles.counter}>
        <button
          type="button"
          className={styles.fullScreenBtn}
          onClick={onTogglePreview}
        >
          <Icon />
        </button>
      </div>
    </section>
  );
}
