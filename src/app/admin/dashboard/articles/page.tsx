import AdminContentComponent from '@/components/AdminContentComponents';

const ProjectsPage = () => {
  return (
    <AdminContentComponent>
      <AdminContentComponent.Header title="Blog Articles">
        <p>Look and create new projects</p>
      </AdminContentComponent.Header>
      {/* Add your project management components here */}

      <AdminContentComponent.CardContainer>
        <AdminContentComponent.CardLink
          href="/admin/dashboard/articles/new"
          name="Create a new Article"
        />
        <AdminContentComponent.CardLink
          href="/admin/dashboard/articles/edit"
          name="Edit an Article"
        />
      </AdminContentComponent.CardContainer>
    </AdminContentComponent>
  );
};

export default ProjectsPage;
