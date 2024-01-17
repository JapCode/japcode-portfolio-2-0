/* eslint-disable no-underscore-dangle */
import { ISkillsData, ISkillsDataResponse } from '@/types/skills';

const skillsResponse = (data: ISkillsDataResponse[]): ISkillsData[] => {
  return data.map((element) => {
    return {
      id: element._id,
      title: element.title,
      url: element.url,
      order: element.order,
    };
  });
};

export default skillsResponse;
