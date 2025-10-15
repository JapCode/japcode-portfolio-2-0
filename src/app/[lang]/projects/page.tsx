import ContentComponent from '@/components/ContentComponent';
import NotFound from '@/components/NotFound';
import ProjectsLayout from '@/components/ProjectsLayout';
import { getAllProjects } from '@/lib/actions/projects';
import getDictionary from '@/lib/dictionary';
import { TLanguage } from '@/types/globals';
import { Locale } from '../../../../i18n.config';
import styles from './projects.module.css';

const ProjectsPage = async (
  props: Readonly<{
    params: Promise<{ lang: Locale }>;
  }>,
) => {
  const { lang } = await props.params;
  const { projectsSection } = await getDictionary(lang);
  const projects = await getAllProjects({
    language: lang.toUpperCase() as TLanguage,
  });
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

        {projects.length > 0 ? (
          <ProjectsLayout data={projects} />
        ) : (
          <NotFound description={projectsSection.notFound} />
        )}
      </div>
    </ContentComponent>
  );
};
export default ProjectsPage;
