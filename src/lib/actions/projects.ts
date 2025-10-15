'use server';

import { db } from '@/db/drizzle';
import { projects, TProject } from '@/db/schema';
import { TLanguage } from '@/types/globals';
import { and, eq, sql } from 'drizzle-orm';
import uploadImage from '../uploadImage';

export interface IProjectDataSave {
  title: string;
  description: string;
  tags: string[];
  language: TLanguage;
  enabled: boolean;
  image: File;
  content: string;
}

export const createProject = async (projectData: IProjectDataSave) => {
  const { title, description, image, tags, content, language, enabled } =
    projectData;

  const imageUrl = await uploadImage(image);

  await db.insert(projects).values({
    title,
    description,
    imageUrl,
    tags,
    content,
    language,
    enabled,
  });
};

export const updateProjects = async (
  id: number,
  projectData: Partial<IProjectDataSave>,
) => {
  const { title, description, image, tags, content, enabled, language } =
    projectData;

  let imageUrl: string | undefined = undefined;
  if (image) {
    imageUrl = await uploadImage(image);
  }

  await db
    .update(projects)
    .set({
      title,
      description,
      imageUrl,
      language,
      tags,
      content,
      enabled,
    })
    .where(eq(projects.id, id));
};

type GetProjectsFilters = {
  language?: TLanguage;
  enabled?: boolean;
  tags?: string[];
};

export const getAllProjects = async (
  filters: GetProjectsFilters = {},
): Promise<TProject[]> => {
  const conditions = [];

  if (filters.language) {
    conditions.push(eq(projects.language, filters.language));
  }

  if (typeof filters.enabled === 'boolean') {
    conditions.push(eq(projects.enabled, filters.enabled));
  }

  if (filters.tags && filters.tags.length > 0) {
    // operador && de Postgres: intersección entre arrays
    conditions.push(
      sql`${projects.tags} && ${sql`ARRAY[${filters.tags.map(
        (_, i) => sql`$${i + 1}`,
      )}]::text[]`}`,
    );
  }

  const query = db
    .select()
    .from(projects)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(projects.createdAt);

  return await query;
};

export const getProject = async (id: string): Promise<TProject | undefined> => {
  const project = await db
    .select()
    .from(projects)
    .where(eq(projects.id, Number(id)))
    .limit(1)
    .then((res) => res[0]);

  return project;
};
