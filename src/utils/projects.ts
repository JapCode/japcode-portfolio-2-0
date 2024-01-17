import projectResponse from '@/adapters/projectResponse';
import Language from '@/models/language';
import Project from '@/models/project';
import { IProjectData, IProjectDataResponse } from '@/types/project';
import connectDB from './dbConecction';

const recoveryProjectData = async (): Promise<IProjectData[]> => {
  'use Server';

  connectDB();
  const data: IProjectDataResponse[] = await Project.find()
    .populate({
      path: 'languages',
      select: 'name', // Aquí especifica los campos que deseas poblar en el modelo 'Language'
      model: Language,
    })
    .lean();
  console.log(data);
  return projectResponse(data);
};
export default recoveryProjectData;
