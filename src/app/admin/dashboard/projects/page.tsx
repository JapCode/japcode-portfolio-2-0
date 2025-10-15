import Link from 'next/link';
import styles from './projects.module.css';

const ProjectsPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Projects</h1>
        <p>Look and create new projects</p>
      </div>
      {/* Add your project management components here */}

      <div className={styles.cardsContainer}>
        <Link
          className={styles.optionCard}
          href="/admin/dashboard/projects/new"
        >
          <h4>Create New Project</h4>
        </Link>
        <Link
          className={styles.optionCard}
          href="/admin/dashboard/projects/edit"
        >
          <h4>Edit Projects</h4>
        </Link>
      </div>
    </div>
  );
};

export default ProjectsPage;
