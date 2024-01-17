import skillsResponse from '@/adapters/skillsResponse';
import Skills from '@/models/skills';
import { ISkillsData, ISkillsDataResponse } from '@/types/skills';
import connectDB from './dbConecction';

const recoverySkillsData = async (): Promise<ISkillsData[]> => {
  'use Server';

  connectDB();
  const data: ISkillsDataResponse[] = await Skills.find().select([
    'title',
    'url',
    'order',
  ]);

  return skillsResponse(data);
};
export default recoverySkillsData;
