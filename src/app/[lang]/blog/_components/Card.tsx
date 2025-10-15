import { Calendar } from 'lucide-react';
import Link from 'next/link';
import { unstable_ViewTransition as ViewTransition } from 'react';
import styles from '../blog.module.css';

const Card = () => {
  return (
    <div className={styles.firstArticleContainer}>
      <ViewTransition name="experimental-label">
        <figure className={styles.image}>
          {/* <ViewTransition name="article-image"> */}
          <img src={'/images/2616913.jpg'} />
          {/* </ViewTransition> */}
        </figure>
      </ViewTransition>
      <div className={styles.firstArticleHeader}>
        <div className={styles.tagsContainer}>
          <span className={styles.tag}>React</span>
          <span className={styles.tag}>Typescript</span>
        </div>
        <div className={styles.dateContainer}>
          <Calendar size={15} />
          <p>07 Apr, 2022</p>
        </div>
      </div>
      <Link href={'/blog/1'} className={styles.title}>
        How to make toys from old Olarpaper
      </Link>
      <p className={styles.description}>
        Nemo vel ad consectetur namut rutrum ex, venenatis sollicitudin urna.
        Aliquam erat volutpat. Integer eu ipsum sem. Ut bibendum lacus
        vestibulum maximus suscipit. Quisque vitae nibh iaculis neque bland
      </p>
    </div>
  );
};
export default Card;
