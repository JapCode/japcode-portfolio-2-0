/* eslint-disable react/require-default-props */
import { Calendar, Clock, Eye } from 'lucide-react';
import Link from 'next/link';
import { FC, ReactNode } from 'react';
import styles from './contentComponent.module.css';

interface ContentComponentProps {
  children: ReactNode;
}

interface HeaderProps {
  children: ReactNode;
  subTitle?: string;
  barWidth?: number | string;
}
interface ImageHeaderProps {
  imageSrc?: string;
}
interface HeaderInfoProps {
  tags?: string[];
  date?: string;
  timeReader?: string;
  words?: number;
}
interface SubTitleProps {
  children: ReactNode;
}

interface ParagraphProps {
  children: ReactNode;
}
interface ParagraphContainerProps {
  children: ReactNode;
}

interface CardContainerProps {
  children: ReactNode;
}
interface CardTitleProps {
  link?: string;
  title: string;
}
interface CardDescriptionProps {
  content: string;
  lineClamp: number;
}
interface CustomLinkProps {
  href: string;
  children: ReactNode;
}

interface CustomButtonProps {
  children: ReactNode;
  onPress: () => void;
}

const Header: FC<HeaderProps> = ({ children, barWidth = '30%', subTitle }) => (
  <div>
    <h1 className={styles.title}>{children}</h1>
    {subTitle && <h3 className={styles.headerSubTitle}>{subTitle}</h3>}
    <div className={styles.titleDecorator} style={{ width: barWidth }} />
  </div>
);

const CardContainer: FC<CardContainerProps> = ({ children }) => (
  <div className={styles.cardContainer}>{children}</div>
);

const ImageHeader: FC<ImageHeaderProps> = ({
  imageSrc = '/images/2616913.jpg',
}) => (
  <figure className={styles.headerImage}>
    <img src={imageSrc} />
  </figure>
);

const HeaderInfo: FC<HeaderInfoProps> = ({ date, tags, timeReader, words }) => (
  <div className={styles.articleHeader}>
    {tags != null && (
      <div className={styles.tagsContainer}>
        {tags.map((element) => (
          <span className={styles.tag} key={element}>
            {element}
          </span>
        ))}
      </div>
    )}
    {(timeReader || words || date) && (
      <div className={styles.headerInfo}>
        {timeReader != null && (
          <div className={styles.headerInfoContainer}>
            <Clock size={18} />
            <p>{timeReader}</p>
          </div>
        )}
        {words != null && (
          <div className={styles.headerInfoContainer}>
            <Eye size={18} />
            <p>{words.toString()}</p>
          </div>
        )}
        {date != null && (
          <div className={styles.headerInfoContainer}>
            <Calendar size={18} />
            <p>{date}</p>
          </div>
        )}
      </div>
    )}
  </div>
);

const CardTitle: FC<CardTitleProps> = ({ title, link }) => {
  if (link) {
    return (
      <Link href={link} className={styles.cardTitleLink}>
        {title}
      </Link>
    );
  } else {
    return <h3 className={styles.cardTitle}>{title}</h3>;
  }
};
const CardDescription: FC<CardDescriptionProps> = ({ content, lineClamp }) => {
  return (
    <p
      className={styles.cardDescription}
      style={{
        lineClamp: lineClamp,
        WebkitLineClamp: lineClamp,
      }}
    >
      {content}
    </p>
  );
};
const SubTitle: FC<SubTitleProps> = ({ children }) => (
  <h2 className={styles.subTitle}>{children}</h2>
);
const ParagraphContainer: FC<ParagraphContainerProps> = ({ children }) => (
  <article className={styles.paragraphContainer}>{children}</article>
);
const Paragraph: FC<ParagraphProps> = ({ children }) => (
  <p className={styles.paragraph}>{children}</p>
);

const CustomLink: FC<CustomLinkProps> = ({ href, children }) => (
  <Link href={href} className={styles.link}>
    {children}
  </Link>
);

const CustomButton: FC<CustomButtonProps> = ({ onPress, children }) => (
  <button type="button" onClick={onPress} className={styles.button}>
    {children}
  </button>
);

interface ContentComponentComposition {
  Header: FC<HeaderProps>;
  SubTitle: FC<SubTitleProps>;
  Paragraph: FC<ParagraphProps>;
  ParagraphContainer: FC<ParagraphContainerProps>;
  CustomLink: FC<CustomLinkProps>;
  CustomButton: FC<CustomButtonProps>;
  CardTitle: FC<CardTitleProps>;
  HeaderInfo: FC<HeaderInfoProps>;
  ImageHeader: FC<ImageHeaderProps>;
  CardContainer: FC<CardContainerProps>;
  CardDescription: FC<CardDescriptionProps>;
}

const ContentComponent: FC<ContentComponentProps> &
  ContentComponentComposition = ({ children }) => (
  <div className={styles.container}>
    <div className={styles.content}>{children}</div>
  </div>
);

ContentComponent.Header = Header;
ContentComponent.SubTitle = SubTitle;
ContentComponent.Paragraph = Paragraph;
ContentComponent.ParagraphContainer = ParagraphContainer;
ContentComponent.CustomLink = CustomLink;
ContentComponent.CustomButton = CustomButton;
ContentComponent.CardTitle = CardTitle;
ContentComponent.HeaderInfo = HeaderInfo;
ContentComponent.ImageHeader = ImageHeader;
ContentComponent.CardContainer = CardContainer;
ContentComponent.CardDescription = CardDescription;

export default ContentComponent;
