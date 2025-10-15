import { FC, ReactNode } from 'react';
import styles from './adminContentComponents.module.css';

export interface CardContainerProps {
  children: ReactNode;
}

const CardContainer: FC<CardContainerProps> = ({ children }) => {
  return <div className={styles.cardsContainer}>{children}</div>;
};

export default CardContainer;
