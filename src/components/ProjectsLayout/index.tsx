'use client';

import { IProjectListData } from '@/types/project';
import { AnimatePresence, LayoutGroup } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { FC } from 'react';
import OpenCard from './OpenCard';
import ProjectList from './ProjectList';

interface IProjectsLayoutProps {
  data: IProjectListData[];
}

const ProjectsLayout: FC<IProjectsLayoutProps> = ({ data }): JSX.Element => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const id = params.get('id');
  const imageHasLoaded = true;
  return (
    // <div className={styles.container}>

    <LayoutGroup>
      <ProjectList data={data} />
      <AnimatePresence>
        {id && imageHasLoaded && <OpenCard id={id} data={data} key="item" />}
      </AnimatePresence>
    </LayoutGroup>
    // </div>
  );
};

export default ProjectsLayout;
