import ContactOptionsContainer from '@/components/ContactOptionsContainer';
import ContentComponent from '@/components/ContentComponent';
import getDictionary from '@/lib/dictionary';
import generateUniqueID from '@/utils/generateId';
import { Locale } from '../../../../i18n.config';

const ContactPage = async ({
  params: { lang },
}: {
  params: { lang: Locale };
}): Promise<JSX.Element> => {
  const { contactSection } = await getDictionary(lang);

  return (
    <ContentComponent>
      <ContentComponent.SubTitle>
        {contactSection.contact}
      </ContentComponent.SubTitle>

      {contactSection.contactContent.map((content) => (
        <ContentComponent.Paragraph key={generateUniqueID()}>
          {content}
        </ContentComponent.Paragraph>
      ))}
      <ContactOptionsContainer page={contactSection} />
    </ContentComponent>
  );
};
export default ContactPage;
