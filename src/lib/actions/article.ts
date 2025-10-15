'use server';

import { db } from '@/db/drizzle';
import { blogs, TBlog } from '@/db/schema';
import { TLanguage } from '@/types/globals';
import { desc, eq } from 'drizzle-orm';
import uploadImage from '../uploadImage';

export interface IArticleDataSave {
  title: string;
  description: string;
  tags: string[];
  language: TLanguage;
  enabled: boolean;
  image: File;
  content: string;
}

export const createArticle = async (articleData: IArticleDataSave) => {
  const { title, description, image, tags, content, language, enabled } =
    articleData;
  const imageUrl = await uploadImage(image);

  await db.insert(blogs).values({
    title,
    description,
    imageUrl,
    tags,
    content,
    language,
    enabled,
  });
};

export const updateArticles = async (
  id: number,
  articleData: Partial<IArticleDataSave>,
) => {
  const { title, description, image, tags, content, enabled, language } =
    articleData;

  let imageUrl: string | undefined = undefined;
  if (image) {
    imageUrl = await uploadImage(image);
  }

  await db
    .update(blogs)
    .set({
      title,
      description,
      imageUrl,
      language,
      tags,
      content,
      enabled,
    })
    .where(eq(blogs.id, id));
};

export const getAllArticles = async () => {
  const articles = await db.select().from(blogs).orderBy(desc(blogs.id));
  return articles;
};

export const getArticle = async (id: string): Promise<TBlog | undefined> => {
  const article = await db
    .select()
    .from(blogs)
    .where(eq(blogs.id, Number(id)))
    .limit(1)
    .then((res) => res[0]);

  return article;
};
