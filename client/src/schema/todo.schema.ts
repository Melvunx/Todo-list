import { z } from "zod";

export const TodoSchema = z.object({
  id: z.string(),
  list: z.string(),
  status: z.string(),
  important: z.string(),
  position: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Todo = z.infer<typeof TodoSchema>;

export const TodosSchema = z.array(TodoSchema);

export const TodosResponseSchema = z.object({
  todos: TodosSchema,
});

export const TodoResponseSchema = z.object({
  todo: TodoSchema,
});