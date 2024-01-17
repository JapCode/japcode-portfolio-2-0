import ContentComponent from '@/components/ContentComponent';
import SkillComponent from '@/components/SkillComponent';
import SwitchElement from '@/components/SwitchElement';
import skills from '@/data/skills';
import getDictionary from '@/lib/dictionary';
import generateUniqueID from '@/utils/generateId';
import React from 'react';
import { Locale } from '../../../i18n.config';
import styles from './page.module.css';

const Home = async ({
  params: { lang },
}: {
  params: { lang: Locale };
}): Promise<JSX.Element> => {
  const { home } = await getDictionary(lang);
  return (
    <>
      <div className={styles.hero}>
        <SwitchElement />
      </div>
      <ContentComponent>
        <ContentComponent.Header barWidth="110px" subTitle={home.subTitle}>
          {home.welcome?.map((content) => (
            <React.Fragment key={content}>
              {content}
              <br />
            </React.Fragment>
          ))}
        </ContentComponent.Header>

        <ContentComponent.SubTitle>{home.about}</ContentComponent.SubTitle>

        {home.aboutMeContent.map((content) => (
          <ContentComponent.Paragraph key={generateUniqueID()}>
            {content}
          </ContentComponent.Paragraph>
        ))}

        <ContentComponent.SubTitle>{home.skills}</ContentComponent.SubTitle>

        <div className={styles.skillsContainer}>
          {skills.map((element) => (
            <SkillComponent
              key={element.id}
              title={element.name}
              iconName={element.iconName}
            />
          ))}
        </div>

        <ContentComponent.SubTitle>{home.interest}</ContentComponent.SubTitle>

        {home.interestContent.map((content) => (
          <ContentComponent.Paragraph key={generateUniqueID()}>
            {content}
          </ContentComponent.Paragraph>
        ))}
      </ContentComponent>
    </>
  );
};

export default Home;
