import { ILanguageDataResponse } from './language';

export type IProjectDataResponse = {
  _id: string;
  name: string;
  link: string;
  date: string;
  languages: ILanguageDataResponse[];
};

export interface IProjectData {
  id: ObjectId;
  name: string;
  link: string;
  date: string;
  languages: ILanguageDataResponse[];
}

export interface IProjectListData {
  id: string;
  name: string;
  date: string;
  languages: {
    id: string;
    name: string;
  }[];
  description: string[];
  image: string;
}

export interface IProjectPageData {
  projects: string;
  projectsList: IProjectListData;
}
