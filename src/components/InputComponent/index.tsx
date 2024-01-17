/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, InputHTMLAttributes } from 'react';
import {
  FieldError,
  FieldErrorsImpl,
  FieldValues,
  Merge,
  UseFormRegister,
} from 'react-hook-form';
import styles from './inputComponent.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  name: string;
}

const InputComponent: FC<InputProps> = ({
  label,
  register,
  errors,
  ...inputProps
}) => {
  return (
    <label htmlFor={inputProps.id} className={styles.labelElement}>
      <span className={styles.labelName}>{label}</span>
      <input
        {...register(inputProps.name, { required: true })}
        {...inputProps}
        className={styles.customInput}
        autoComplete="off"
      />
      <div
        className={styles.decorator}
        style={{ backgroundColor: errors ? 'rgb(243, 104, 127)' : '#f0f2fd' }}
      />
      {errors && (
        <p className={styles.errorMessage}>{(errors as any)?.message}</p>
      )}
    </label>
  );
};

export default InputComponent;
