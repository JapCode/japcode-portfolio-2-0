import { z } from 'zod';

export const SignInValidator = z.object({
  email: z.email({
    message: 'please enter a valid email address',
  }),
  password: z.string().min(8, {
    message: 'the password must be at least 8 characters',
  }),
});

export type TSignInValidator = z.infer<typeof SignInValidator>;
