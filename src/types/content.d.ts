import { sendMessageSchema } from '@/zodSchema/sendMessage';

export interface IContentDataResponse {
  _id: ObjectId;
  content: string;
  type: string;
  section: string;
  order: number;
  parent: string;
}
export interface IContentData {
  id: ObjectId;
  content: string;
  type: string;
  section: string;
  order: number;
  parent: string;
}

export type FormData = z.infer<typeof sendMessageSchema>;
