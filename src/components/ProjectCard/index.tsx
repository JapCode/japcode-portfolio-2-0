'use client';

import { IProjectListData } from '@/types/project';
import formatDate from '@/utils/formatDate';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FC } from 'react';
import style from './projectCard.module.css';

interface IProjectCardProps {
  data: IProjectListData;
}

const ProjectCard: FC<IProjectCardProps> = ({ data }): JSX.Element => {
  return (
    <motion.div layoutId={`card-container-${data.id}`}>
      <Link
        type="button"
        className={style.container}
        href={`projects?id=${data.id}`}
      >
        <div className={style.topElementContainer}>
          <motion.span layoutId={`date-container-${data.id}`}>
            {formatDate(data.date)}
          </motion.span>
          <motion.span
            className={style.languagesContainer}
            layoutId={`languages-container-${data.id}`}
          >
            {data.languages.map((element) => (
              <p key={element.id}>{element.name}</p>
            ))}
          </motion.span>
        </div>
        <motion.div layoutId={`title-container-${data.id}`}>
          <h3 className={style.title}>{data.name}</h3>
          <div className={style.viewContainer}>
            <span>View</span>
            <svg
              className={style.arrowSvgActive}
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="14"
              viewBox="0 0 11 9"
              fill="none"
            >
              <path
                d="M9.5 4.51953H0.5C0.22 4.51953 0 4.29953 0 4.01953C0 3.73953 0.22 3.51953 0.5 3.51953H9.5C9.78 3.51953 10 3.73953 10 4.01953C10 4.29953 9.78 4.51953 9.5 4.51953Z"
                fill="white"
              />
              <path
                d="M7 8.02C6.93442 8.0208 6.86941 8.00787 6.80913 7.98203C6.74885 7.9562 6.69465 7.91804 6.65 7.87C6.45 7.67 6.45 7.36 6.65 7.16L9.8 4.01L6.65 0.86C6.45 0.66 6.45 0.35 6.65 0.15C6.85 -0.05 7.16 -0.05 7.36 0.15L10.86 3.65C11.06 3.85 11.06 4.16 10.86 4.36L7.36 7.86C7.26 7.96 7.13 8.01 7.01 8.01L7 8.02Z"
                fill="white"
              />
            </svg>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};
export default ProjectCard;
