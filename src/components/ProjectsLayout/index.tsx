'use client';

import { TProject } from '@/db/schema';
import { AnimatePresence, LayoutGroup } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { FC } from 'react';
import OpenCard from '../ProjectCardOpen/OpenCard';
import ProjectList from './ProjectList';

interface IProjectsLayoutProps {
  // data: IProjectListData[];
  data: TProject[];
}

const ProjectsLayout: FC<IProjectsLayoutProps> = ({ data }) => {
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
