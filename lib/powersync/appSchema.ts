import { column, Schema, Table } from '@powersync/web';

const lists = new Table({
  created_at: column.text,
  name: column.text,
  owner_id: column.text
});

const todos = new Table(
  {
    list_id: column.text,
    created_at: column.text,
    completed_at: column.text,
    description: column.text,
    created_by: column.text,
    completed_by: column.text,
    completed: column.integer
  },
  { indexes: { list: ['list_id'] } }
);

export const AppSchema = new Schema({
  todos,
  lists
});

// For types
export type Database = (typeof AppSchema)['types'];
export type TodoRecord = Database['todos'];
// OR:
// export type Todo = RowType<typeof todos>;
export type ListRecord = Database['lists'];