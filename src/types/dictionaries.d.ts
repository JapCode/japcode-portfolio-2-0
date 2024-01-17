export interface Language {
  [key: string]: string;
}

export interface INavigation {
  home: string;
  projects: string;
  contacts: string;
  languages: Language;
}

export interface IHomeSection {
  welcome: string[];
  subTitle: string;
  about: string;
  aboutMeContent: string[];
  skills: string;
  interest: string;
  interestContent: string[];
}

interface Project {
  id: string;
  name: string;
  date: string;
  languages: { id: string; name: string }[];
  description: string[];
  image: string;
}

export interface IProjectsSection {
  projects: string;
  projectsList: Project[];
}

export interface IContactSection {
  contact: string;
  contactContent: string[];
  buttons: {
    socialMedia: string;
    directMessage: string;
  };
  form: {
    labels: {
      name: string;
      email: string;
      subject: string;
      message: string;
    };
    placeholders: {
      name: string;
      email: string;
      subject: string;
      message: string;
    };
    sendButton: string;
  };
}

export interface IDictionary {
  navigation: INavigation;
  home: IHomeSection;
  projectsSection: IProjectsSection;
  contactSection: IContactSection;
}
