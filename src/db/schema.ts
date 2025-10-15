import type { AdapterAccountType } from '@auth/core/adapters';
import { sql } from 'drizzle-orm';
import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

export const roleEnum = pgEnum('role', ['USER', 'ADMIN']);
export const languageEnum = pgEnum('language', ['EN', 'ES']);

export const users = pgTable('user', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name'),
  email: text('email').unique(),
  role: roleEnum().default('USER'),
  password: text('password'),
});

export const accounts = pgTable(
  'account',
  {
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: text('type').$type<AdapterAccountType>().notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('providerAccountId').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state'),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
);

export const sessions = pgTable('session', {
  sessionToken: text('sessionToken').primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
});

export const verificationTokens = pgTable(
  'verificationToken',
  {
    identifier: text('identifier').notNull(),
    token: text('token').notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
  },
  (verificationToken) => ({
    compositePk: primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  }),
);

export const passwordResets = pgTable('password_resets', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  token: text('token').notNull().unique(),
  expires: timestamp('expires').notNull(),
  used: boolean('used').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  imageUrl: text('image_url').notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  language: languageEnum().default('EN').notNull(),
  enabled: boolean('enabled').default(true).notNull(),
  tags: text('tags')
    .array()
    .notNull()
    .default(sql`ARRAY[]::text[]`),
  description: text('description').notNull(),
  projectDate: timestamp('project_date', { withTimezone: true })
    .defaultNow()
    .notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  content: text('content').notNull(),
});

export const blogs = pgTable('blogs', {
  id: serial('id').primaryKey(),
  imageUrl: text('image_url').notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  language: languageEnum().default('EN').notNull(),
  enabled: boolean('enabled').default(true).notNull(),
  tags: text('tags')
    .array()
    .notNull()
    .default(sql`ARRAY[]::text[]`),
  description: text('description').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  content: text('content').notNull(),
});

export type TProject = typeof projects.$inferSelect;
export type TBlog = typeof blogs.$inferSelect;
export type TUser = typeof users.$inferSelect;
