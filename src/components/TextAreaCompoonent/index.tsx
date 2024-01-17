/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ChangeEvent,
  FC,
  TextareaHTMLAttributes,
  useEffect,
  useState,
} from 'react';
import {
  FieldError,
  FieldErrorsImpl,
  FieldValues,
  Merge,
  UseFormRegister,
} from 'react-hook-form';
import styles from './textArea.module.css';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  name: string;
}

const TextAreaComponent: FC<TextAreaProps> = ({
  label,
  register,
  errors,
  ...textareaProps
}) => {
  const [textAreaHeight, setTextAreaHeight] = useState('2.5rem');

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    if (textareaProps.onChange) {
      textareaProps.onChange(e);
    }

    e.target.style.height = '2.5rem';
    e.target.style.height = `${e.target.scrollHeight}px`;
    setTextAreaHeight(`${e.target.scrollHeight}px`);
  };

  useEffect(() => {
    const textArea = document.getElementById(textareaProps.name);

    if (textArea) {
      textArea.style.height = '2.5rem';
      textArea.style.height = `${textArea.scrollHeight}px`;
      setTextAreaHeight(`${textArea.scrollHeight}px`);
    }
  }, [textareaProps.value, textareaProps.name]);

  return (
    <label htmlFor={textareaProps.id} className={styles.labelElement}>
      <span className={styles.labelName}>{label}</span>
      <textarea
        {...register(textareaProps.name, { required: true })}
        {...textareaProps}
        className={styles.customTextArea}
        autoComplete="off"
        onChange={handleTextAreaChange}
        style={{
          height: textAreaHeight,
          marginBottom:
            textAreaHeight === '2.5rem' || textAreaHeight === '37px' ? 0 : 10,
        }}
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

export default TextAreaComponent;
