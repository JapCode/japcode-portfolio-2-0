import z from 'zod';

export const sendMessageSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  subject: z.string(),
  message: z.string().min(1),
});

export type User = z.infer<typeof sendMessageSchema>;
