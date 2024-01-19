/* eslint-disable react/require-default-props */
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
interface SubTitleProps {
  children: ReactNode;
}

interface ParagraphProps {
  children: ReactNode;
}
interface ParagraphContainerProps {
  children: ReactNode;
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

export default ContentComponent;
