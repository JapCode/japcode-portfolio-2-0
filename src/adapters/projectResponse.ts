/* eslint-disable no-underscore-dangle */
import { IProjectData, IProjectDataResponse } from '@/types/project';

const projectResponse = (data: IProjectDataResponse[]): IProjectData[] => {
  return data.map((element) => {
    return {
      id: element._id,
      name: element.name,
      link: element.link,
      date: element.date,
      languages: element.languages,
    };
  });
};

export default projectResponse;
