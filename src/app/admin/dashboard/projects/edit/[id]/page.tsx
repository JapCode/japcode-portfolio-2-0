import { getProject } from '@/lib/actions/projects';
import { notFound } from 'next/navigation';
import ProjectForm from '../../_components/ProjectForm';

export default async function EditProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const project = await getProject(params.id);

  if (!project) {
    notFound();
  }

  return (
    <div style={{ width: '100%' }}>
      {/* <h1>Edit Project: {project.title}</h1> */}
      {/* <EditProjectForm project={project} /> */}
      <ProjectForm type="edit" project={project} />
    </div>
  );
}
