import ContentComponent from '@/components/ContentComponent';
import genericStyles from '../../assets/styles/genericStyles.module.css';

const AboutPage = (): JSX.Element => {
  return (
    <div className={genericStyles.contentContainer}>
      <ContentComponent>
        <ContentComponent.Header>About me</ContentComponent.Header>
        <ContentComponent.Paragraph>
          I am a passionate software developer with a strong desire to
          continuously expand my knowledge and skills in the field of
          technology. My goal is to create useful software that can make a
          positive impact on others, while also having fun in the process. As a
          Front-end Developer, I specialize in creating user-friendly and
          visually appealing web interfaces using modern technologies, such as
          React and Next.js. With Next.js I&apos;m able to develop web
          applications with high performance, SEO optimized and easy to
          maintain.
        </ContentComponent.Paragraph>
        <ContentComponent.Paragraph>
          Currently based in Venezuela, I am always seeking new opportunities to
          learn and grow. In my free time, I enjoy delving into various topics
          of interest, such as reading light novels, watching anime, playing
          video games and playing board games. I am an enthusiastic board games
          player, it allows me to think strategically, to socialize and to have
          fun with friends and family. I am also an avid enthusiast of geek
          culture and always excited to engage in meaningful conversations with
          friends and peers.
        </ContentComponent.Paragraph>
        <ContentComponent.CustomLink href="/otra-pagina">
          A otra página
        </ContentComponent.CustomLink>
      </ContentComponent>
      <div>bongop</div>
    </div>
  );
};
export default AboutPage;
