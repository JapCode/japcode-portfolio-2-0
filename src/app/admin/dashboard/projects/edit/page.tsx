import { getAllProjects } from '@/lib/actions/projects';
import { Eye, EyeClosed, Languages } from 'lucide-react';
import Link from 'next/link';
import styles from './editPage.module.css';

const ProjectEditPage = async () => {
  const projects = await getAllProjects();

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={`${styles.cell} ${styles.header}`}>Image</th>
            <th className={`${styles.cell} ${styles.header}`}>Title</th>
            <th className={`${styles.cell} ${styles.header}`}>Tags</th>
            <th className={`${styles.cell} ${styles.header}`}>Created at</th>
            <th className={`${styles.cell} ${styles.header}`}></th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id} className={styles.row}>
              <td className={styles.cell} data-label="Imagen">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className={styles.image}
                />
              </td>
              <td className={styles.cell} data-label="Título">
                {project.title}
              </td>
              <td className={styles.cell} data-label="Tags">
                {project.tags.join(', ')}
              </td>
              <td className={styles.cell} data-label="Creado">
                {new Date(project.createdAt).toLocaleDateString()}
              </td>
              <td className={styles.cell} data-label="Acciones">
                <Link
                  href={`/admin/dashboard/projects/edit/${project.id}`}
                  className={styles.editBtn}
                  // onClick={() => onEdit(project.id)}
                >
                  Editar
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.mobileContainer}>
        {projects.map((element) => (
          <Link
            key={element.id}
            className={styles.mobileProject}
            href={`/admin/dashboard/projects/edit/${element.id}`}
          >
            <figure className={styles.mobileImage}>
              <img src={element.imageUrl} />
            </figure>
            <div className={styles.mobileProjectContent}>
              <div className={styles.tagsContainer}>
                {element.tags.map((tag) => (
                  <div className={styles.tags} key={tag}>
                    {tag}
                  </div>
                ))}
              </div>
              <h4 className={styles.mobileProjectTitle}>{element.title}</h4>

              <span>
                <Languages
                  size={16}
                  style={{ color: 'rgba(255, 255, 255, 0.5)' }}
                />
                <p>
                  {element.language === 'EN'
                    ? 'English'
                    : element.language === 'ES'
                    ? 'Spanish'
                    : 'Undefined'}
                </p>
              </span>
              <span>
                {element.enabled ? (
                  <Eye
                    size={16}
                    style={{ color: 'rgba(255, 255, 255, 0.5)' }}
                  />
                ) : (
                  <EyeClosed size={16} />
                )}
                <p>{element.enabled ? 'Active' : 'Disabled'}</p>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProjectEditPage;
