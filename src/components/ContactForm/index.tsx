import { sendEmail } from '@/app/_actions';
import { FormData } from '@/types/content';
import { IContactSection } from '@/types/dictionaries';
import { sendMessageSchema } from '@/zodSchema/sendMessage';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import InputComponent from '../InputComponent';
import TextAreaComponent from '../TextAreaCompoonent';
import style from './contactForm.module.css';

interface IContactForm {
  page: IContactSection;
}

const ContactForm: FC<IContactForm> = ({ page }): JSX.Element => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<FormData>({
    resolver: zodResolver(sendMessageSchema),
  });

  function onSubmit(data: FormData): void {
    // event.preventDefault();
    const result = sendEmail(data);

    toast.promise(result, {
      loading: page.form.toast.loading,
      success: () => {
        return page.form.toast.success;
      },
      error: page.form.toast.error,
    });
  }
  return (
    <form className={style.container} onSubmit={handleSubmit(onSubmit)}>
      <InputComponent
        label={page.form.labels.name}
        register={register}
        errors={errors.name}
        name="name"
        placeholder={page.form.placeholders.name}
      />
      <InputComponent
        label={page.form.labels.email}
        register={register}
        errors={errors.email}
        name="email"
        placeholder={page.form.placeholders.email}
      />
      <InputComponent
        label={page.form.labels.subject}
        register={register}
        errors={errors.subject}
        name="subject"
        placeholder={page.form.placeholders.subject}
      />
      <TextAreaComponent
        label={page.form.labels.message}
        register={register}
        errors={errors.message}
        name="message"
        placeholder={page.form.placeholders.message}
      />

      <button
        type="submit"
        disabled={!isDirty || isSubmitting}
        className={style.button}
      >
        {page.form.sendButton}
      </button>
    </form>
  );
};

export default ContactForm;
