import { IContentData } from '@/types/content';

enum ContentType {
  BigTitle = 'h1',
  Title = 'h2',
  SubTitle = 'subTitle',
  Paragraph = 'paragraph',
}

interface IPageContentFormatted {
  bigTitles: IContentData[];
  titles: IContentData[];
  subTitles: IContentData[];
  paragraphs: IContentData[];
}

const pageContent = (data: IContentData[]): IPageContentFormatted => {
  const elementsFormatted: IPageContentFormatted = {
    bigTitles: [],
    titles: [],
    subTitles: [],
    paragraphs: [],
  };

  if (data.length > 0) {
    const bigTitles = data.filter(
      (element) => element.type === ContentType.BigTitle,
    );
    const titles = data.filter((element) => element.type === ContentType.Title);
    const subTitles = data.filter(
      (element) => element.type === ContentType.SubTitle,
    );
    const paragraphs = data.filter(
      (element) => element.type === ContentType.Paragraph,
    );

    const orderCategory = (category: IContentData[]): IContentData[] =>
      category.sort((a, b) => a.order - b.order);

    elementsFormatted.bigTitles = orderCategory(bigTitles);
    elementsFormatted.titles = orderCategory(titles);
    elementsFormatted.subTitles = orderCategory(subTitles);
    elementsFormatted.paragraphs = orderCategory(paragraphs);
  }

  return elementsFormatted;
};

export default pageContent;
