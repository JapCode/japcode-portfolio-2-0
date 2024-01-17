import { IProjectListData } from '@/types/project';
import { FC } from 'react';
import ProjectCard from '../ProjectCard';
import styles from './projectsLayout.module.css';

interface IProjectListProps {
  selectedId: string;
  data: IProjectListData[];
}

const ProjectList: FC<IProjectListProps> = ({
  selectedId,
  data,
}): JSX.Element => {
  return (
    <ul className={styles.cardListContainer}>
      {data.map((card) => (
        <ProjectCard
          key={card.id}
          data={card}
          // isSelected={card.id === selectedId}
        />
      ))}
    </ul>
  );
};

export default ProjectList;
