import ContentComponent from '@/components/ContentComponent';
import ProjectsLayout from '@/components/ProjectsLayout';
import getDictionary from '@/lib/dictionary';
import { Locale } from '../../../../i18n.config';
import styles from './projects.module.css';

const ProjectsPage = async ({
  params: { lang },
}: {
  params: { lang: Locale };
}): Promise<JSX.Element> => {
  const { projectsSection } = await getDictionary(lang);
  return (
    <ContentComponent>
      <ContentComponent.SubTitle>
        {projectsSection.projects}
      </ContentComponent.SubTitle>
      <div className={styles.container}>
        {/* {projects.map((element) => (
          <ProjectCard key={element.id} data={element} />
        ))} */}
        {/* <TestComponent items ={projects} /> */}
        <ProjectsLayout data={projectsSection.projectsList} />
      </div>
    </ContentComponent>
  );
};
export default ProjectsPage;
