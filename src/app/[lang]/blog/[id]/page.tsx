import ContentComponent from '@/components/ContentComponent';
import { unstable_ViewTransition as ViewTransition } from 'react';
import styles from '../blog.module.css';

export default async function DetailsBlogPage({
  params,
}: {
  params: { id: string };
}) {
  // if (!project) {
  //   notFound();
  // }
  return (
    <ContentComponent>
      <div className={styles.firstArticleContainer}>
        <ViewTransition name="experimental-label">
          <figure className={styles.image}>
            <img src="/images/2616913.jpg" />
          </figure>
        </ViewTransition>
        <p>this is the id {params.id}</p>
      </div>
    </ContentComponent>
  );
}
