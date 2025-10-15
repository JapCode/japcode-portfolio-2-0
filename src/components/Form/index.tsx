'use client';
import { createContext, FC, useContext, useState, type ReactNode } from 'react';
import { FormButton, FormButtonProps } from './FormButton';
import { FormContainer } from './FormContainer';
import { FormInput, FormInputProps } from './FormInput';
import { FormLabel, FormLabelProps } from './FormLabel';
import { FormSection } from './FormSection';
import { FormTextarea, FormTextareaProps } from './FormTextarea';
import {
  FormTextareaWithButton,
  FormTextareaWithButtonProps,
} from './FormTextareaWithButton';

export interface FormContextType {
  loading: boolean;
  setLoading: (val: boolean) => void;
}

const FormContext = createContext<FormContextType | null>(null);

export const useCustomFormContext = () => {
  const ctx = useContext(FormContext);
  if (!ctx) throw new Error('Form.* components must be used inside <Form>');
  return ctx;
};

interface FormProps {
  onSubmit?: () => Promise<void> | void;
  children: ReactNode;
}

interface FormComposition {
  Button: FC<FormButtonProps>;
  Input: FC<FormInputProps>;
  Section: FC<{ children: ReactNode }>;
  Textarea: FC<FormTextareaProps>;
  TextareaWithButton: FC<FormTextareaWithButtonProps>;
  Label: FC<FormLabelProps>;
  Container: FC<{ children: ReactNode }>;
}

const Form: FC<FormProps> & FormComposition = ({ onSubmit, children }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!onSubmit) return;
    setLoading(true);
    try {
      await onSubmit();
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContext.Provider value={{ loading, setLoading }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        {children}
      </form>
    </FormContext.Provider>
  );
};

Form.Button = FormButton;
Form.Input = FormInput;
Form.Section = FormSection;
Form.Textarea = FormTextarea;
Form.TextareaWithButton = FormTextareaWithButton;
Form.Container = FormContainer;
Form.Label = FormLabel;

export default Form;
