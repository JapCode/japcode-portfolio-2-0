/* eslint-disable import/prefer-default-export */

'use server';

import EmailTemplate from '@/components/EmailTemplate';
import config from '@/config';
import { sendMessageSchema } from '@/zodSchema/sendMessage';
import { Resend } from 'resend';
import { z } from 'zod';

type ContactFormInputs = z.infer<typeof sendMessageSchema>;
const resend = new Resend(config.resendKey);

type SendMessageSuccessType = {
  success: true;
  data: unknown;
};

type SendMessageErrorType = {
  success: false;
  error: string | Error | unknown;
};

type SendMessageResponseType = SendMessageSuccessType | SendMessageErrorType;

export async function sendEmail(
  data: ContactFormInputs,
): Promise<SendMessageResponseType> {
  const result = sendMessageSchema.safeParse(data);

  if (result.success) {
    try {
      const sendMessageResponse = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'japcrowley.thetraveler@gmail.com',
        subject: 'Hello World',
        react: EmailTemplate(result.data),
        text: '',
      });
      return { success: true, data: sendMessageResponse };
    } catch (error) {
      return { success: false, error };
    }
  }

  if (result.error) {
    return { success: false, error: result.error.format() };
  }

  return { success: false, error: 'Unhandled case' };
}
