import Table from '@/components/Table';
import { getAllArticles } from '@/lib/actions/article';

const ArticleEditPage = async () => {
  const articles = await getAllArticles();

  return (
    <Table>
      <Table.Desktop>
        <Table.Head>
          <Table.Row>
            <Table.Cell isHeader>Image</Table.Cell>
            <Table.Cell isHeader>Title</Table.Cell>
            <Table.Cell isHeader>Tags</Table.Cell>
            <Table.Cell isHeader>Created at</Table.Cell>
            <Table.Cell isHeader>""</Table.Cell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {articles.map((article) => (
            <Table.Row key={article.id}>
              <Table.Cell>
                <Table.Image alt={article.title} src={article.imageUrl} />
              </Table.Cell>
              <Table.Cell>{article.title}</Table.Cell>
              <Table.Cell>{article.tags.join(', ')}</Table.Cell>
              <Table.Cell>
                {new Date(article.createdAt).toLocaleDateString()}
              </Table.Cell>
              <Table.Cell>
                <Table.Btn
                  href={`/admin/dashboard/articles/edit/${article.id}`}
                  name="Edit"
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Desktop>

      <Table.Mobile>
        {articles.map((p) => (
          <Table.MobileCard key={p.id}>
            <Table.MobileImage src={p.imageUrl} alt={p.title} />
            <Table.MobileContent>
              <Table.MobileTitle>{p.title}</Table.MobileTitle>
              <Table.MobileMeta>
                <p>{p.language === 'EN' ? 'English' : 'Spanish'}</p>
                <p>{p.enabled ? 'Active' : 'Disabled'}</p>
              </Table.MobileMeta>
            </Table.MobileContent>
          </Table.MobileCard>
        ))}
      </Table.Mobile>
    </Table>
  );
};

export default ArticleEditPage;
