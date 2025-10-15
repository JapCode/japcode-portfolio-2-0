import { TProject } from '@/db/schema';
import { FC } from 'react';
import ProjectCard from '../ProjectCard';
import styles from './projectsLayout.module.css';

interface IProjectListProps {
  // selectedId: string;
  // data: IProjectListData[];
  data: TProject[];
}

const ProjectList: FC<IProjectListProps> = ({ data }) => {
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
