import { getArticle } from '@/lib/actions/article';
import { notFound } from 'next/navigation';
import ArticleForm from '../../_components/ArticleForm';

export default async function EditArticlePage({
  params,
}: {
  params: { id: string };
}) {
  const article = await getArticle(params.id);

  if (!article) {
    notFound();
  }

  return <ArticleForm type="edit" article={article} />;
}
