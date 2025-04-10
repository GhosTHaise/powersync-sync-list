// drizzle/schema.ts
import { pgTable, text, integer, timestamp } from 'drizzle-orm/pg-core';

export const lists = pgTable('lists', {
  id: text('id').primaryKey(), // Assuming id is the primary key
  createdAt: timestamp('created_at').defaultNow(),
  name: text('name'),
  ownerId: text('owner_id'),
});

export const todos = pgTable('todos', {
  id: text('id').primaryKey(), // Assuming id is the primary key
  listId: text('list_id'),
  createdAt: timestamp('created_at').defaultNow(),
  completedAt: timestamp('completed_at'),
  description: text('description'),
  createdBy: text('created_by'),
  completedBy: text('completed_by'),
  completed: integer('completed').default(0), // Assuming 0 means incomplete, 1 means completed
});


