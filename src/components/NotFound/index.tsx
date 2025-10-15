'use client';

import { motion } from 'framer-motion';
import { FolderX } from 'lucide-react';
import styles from './notFound.module.css';

interface INotFoundProps {
  description: string;
}

const NotFound = (props: INotFoundProps) => {
  const { description } = props;
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={styles.container}
    >
      <FolderX className={styles.icon} />
      <p>{description}</p>
    </motion.div>
  );
};

export default NotFound;
