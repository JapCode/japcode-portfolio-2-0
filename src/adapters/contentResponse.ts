/* eslint-disable no-underscore-dangle */
import { IContentData, IContentDataResponse } from '@/types/content';

const contentResponse = (data: IContentDataResponse[]): IContentData[] => {
  return data.map((element) => {
    return {
      id: element._id,
      content: element.content,
      type: element.type,
      section: element.section,
      order: element.order,
      parent: element.parent,
    };
  });
};

export default contentResponse;
