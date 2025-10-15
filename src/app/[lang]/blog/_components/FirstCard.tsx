import ContentComponent from '@/components/ContentComponent';

const FirstCard = () => {
  return (
    <ContentComponent.CardContainer>
      <ContentComponent.ImageHeader imageSrc="/images/2616913.jpg" />
      <ContentComponent.HeaderInfo
        tags={['React', 'TypeScript']}
        date="07 Apr, 2022"
        timeReader="2 min"
        words={270}
      />
      <ContentComponent.CardTitle
        link="/blog/1"
        title="How to make toys from old Olarpaper"
      />
      <ContentComponent.CardDescription
        lineClamp={3}
        content="Nemo vel ad consectetur namut rutrum ex, venenatis sollicitudin urna. Aliquam erat volutpat. Integer eu ipsum sem. Ut bibendum lacus vestibulum maximus suscipit. Quisque vitae nibh iaculis neque bland"
      />
    </ContentComponent.CardContainer>
  );
};
export default FirstCard;
