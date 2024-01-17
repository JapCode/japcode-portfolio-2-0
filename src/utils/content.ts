import contentResponse from '@/adapters/contentResponse';
import Content from '@/models/content';
import { IContentData, IContentDataResponse } from '@/types/content';
import connectDB from './dbConecction';

const recoveryContentData = async (
  section: string,
): Promise<IContentData[]> => {
  'use Server';

  connectDB();
  const data: IContentDataResponse[] = await Content.find({ section }).select([
    'content',
    'type',
    'section',
    'order',
    'parent',
  ]);

  return contentResponse(data);
};
export default recoveryContentData;
