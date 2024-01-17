/* eslint-disable global-require */
import { IProjectListData } from '@/types/project';
import formatDate from '@/utils/formatDate';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC } from 'react';
import secondStyle from './projectsLayout.module.css';

interface IOpenCardProps {
  id: string;
  data: IProjectListData[];
}

const OpenCard: FC<IOpenCardProps> = ({ data, id }): JSX.Element => {
  const list = data.find((item) => item.id === id);
  const pathname = usePathname();
  if (list == null) return <div>not Found</div>;
  const { name, date, languages, description, image } = list;

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.15 } }}
        transition={{ duration: 0.2, delay: 0.15 }}
        style={{ pointerEvents: 'auto' }}
        className={secondStyle.overlay}
      >
        <Link href={pathname} />
      </motion.div>
      <div
        className={`${secondStyle['card-content-container']} ${secondStyle.open}`}
      >
        <motion.div
          className={secondStyle['card-content']}
          layoutId={`card-container-${id}`}
        >
          <motion.button
            whileHover={{
              width: 55,
              transition: { duration: 0.5 },
            }}
            className={secondStyle.backButton}
          >
            <Link href={pathname}>
              <svg
                className={secondStyle.arrowSvgActive}
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="14"
                viewBox="0 0 11 9"
                fill="none"
              >
                <path
                  d="M12.5 5H3.5C3.22 5 3 4.78 3 4.5C3 4.22 3.22 4 3.5 4H12.5C12.78 4 13 4.22 13 4.5C13 4.78 12.78 5 12.5 5Z"
                  fill="white"
                />
                <path
                  d="M6 8.5C5.93442 8.5008 5.86941 8.48787 5.80913 8.46203C5.74885 8.4362 5.69465 8.39804 5.65 8.35L2.15 4.85C1.95 4.65 1.95 4.34 2.15 4.14L5.65 0.65C5.85 0.45 6.16 0.45 6.36 0.65C6.56 0.85 6.56 1.16 6.36 1.36L3.21 4.51L6.36 7.66C6.56 7.86 6.56 8.17 6.36 8.37C6.26 8.47 6.13 8.52 6.01 8.52L6 8.5Z"
                  fill="white"
                />
              </svg>
            </Link>
          </motion.button>
          <motion.figure
            className={secondStyle['card-image-container']}
            layoutId={`card-image-container-${id}`}
          >
            <Image
              className={secondStyle.cardImage}
              src={image}
              alt="test"
              width={700}
              height={250}
            />
          </motion.figure>
          <motion.div
            className={secondStyle['title-container']}
            layoutId={`title-container-${id}`}
          >
            <h2>{name}</h2>
            <span className={secondStyle.subInfoContainer}>
              <motion.span layoutId={`date-container-${id}`}>
                {formatDate(date)}
              </motion.span>
              <motion.span
                className={secondStyle.subInfoLanguages}
                layoutId={`languages-container-${id}`}
              >
                {languages.map((element) => (
                  <p key={element.id}>{element.name}</p>
                ))}
              </motion.span>
            </span>
          </motion.div>
          <motion.div className={secondStyle.contentContainer} animate>
            {description.map((element) => (
              <p key={element.length}>{element}</p>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default OpenCard;
