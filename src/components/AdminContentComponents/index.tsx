import { FC, ReactNode } from 'react';
import styles from './adminContentComponents.module.css';
import CardContainer, { CardContainerProps } from './CardContainer';
import CardLink, { CardLinkProps } from './CardLink';
import Header, { HeaderProps } from './Header';

interface AdminContentComponentProps {
  children: ReactNode;
}
interface AdminContentComponentComposition {
  Header: FC<HeaderProps>;
  CardContainer: FC<CardContainerProps>;
  CardLink: FC<CardLinkProps>;
}

const AdminContentComponent: FC<AdminContentComponentProps> &
  AdminContentComponentComposition = ({ children }) => (
  <div className={styles.container}>{children}</div>
);

AdminContentComponent.Header = Header;
AdminContentComponent.CardContainer = CardContainer;
AdminContentComponent.CardLink = CardLink;

export default AdminContentComponent;
