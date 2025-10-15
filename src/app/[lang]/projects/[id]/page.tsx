import ContentComponent from '@/components/ContentComponent';
import MDRender from '@/components/MDRender';
import { getProject } from '@/lib/actions/projects';
import formatDate from '@/utils/formatDate';
import { notFound } from 'next/navigation';

export default async function ProjectDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const project = await getProject(id);

  if (!project) {
    notFound();
  }
  const {
    content,
    createdAt,
    description,
    enabled,
    id: projectId,
    imageUrl,
    language,
    tags,
    title,
  } = project;
  return (
    <ContentComponent>
      <ContentComponent.CardContainer>
        <ContentComponent.ImageHeader imageSrc={imageUrl} />
        <ContentComponent.CardTitle title={title} />
        <ContentComponent.HeaderInfo
          tags={tags}
          date={formatDate(createdAt.toISOString())}
          timeReader="2 min"
          words={270}
        />
        {/* <ContentComponent.CardDescription
          lineClamp={3}
          content="Nemo vel ad consectetur namut rutrum ex, venenatis sollicitudin urna. Aliquam erat volutpat. Integer eu ipsum sem. Ut bibendum lacus vestibulum maximus suscipit. Quisque vitae nibh iaculis neque bland"
        /> */}
      </ContentComponent.CardContainer>
      <MDRender content={content} />
    </ContentComponent>
  );
}
