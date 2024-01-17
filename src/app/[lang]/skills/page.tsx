import ContentComponent from '@/components/ContentComponent';
import genericStyles from '../../assets/styles/genericStyles.module.css';

const SkillsPage = (): JSX.Element => {
  return (
    <div className={genericStyles.contentContainer}>
      <ContentComponent>
        <ContentComponent.Header>Skills</ContentComponent.Header>
        <ContentComponent.Paragraph>
          I’m a development with interest in expand my knowledge in technologies
          and create utility software for other and to have fun in the process{' '}
        </ContentComponent.Paragraph>
        <ContentComponent.Paragraph>
          At the moment i live in Venezuela and i divide my free time to
          learning new things of my interest, read light novels, watch an anime
          or play some videogame, always i ready to talk about some topics of
          geek culture with friends
        </ContentComponent.Paragraph>
        <ContentComponent.CustomLink href="/otra-pagina">
          A otra página
        </ContentComponent.CustomLink>
      </ContentComponent>
      <div>bongop</div>
    </div>
  );
};
export default SkillsPage;
