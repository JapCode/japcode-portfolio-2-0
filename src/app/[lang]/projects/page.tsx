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
      <ContentComponent.SubTitle>Project</ContentComponent.SubTitle>
      <div
        className={styles.container}
        // style={{
        //   width: '100%',
        //   paddingTop: 30,
        //   flexDirection: 'row',
        //   justifyContent: 'center',
        //   alignItems: 'center',
        //   columnGap: 20,
        //   rowGap: 30,
        //   display: 'flex',
        //   flexWrap: 'wrap',
        // }}
      >
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
