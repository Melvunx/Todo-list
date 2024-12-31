import { z } from "zod";

export const TodoSchema = z.object({
  id: z.string(),
  list: z.string(),
  status: z.number(),
  important: z.number(),
  position: z.number(),
  createdAt: z.string().date(),
  updatedAt: z.string().date(),
});

export type Todo = z.infer<typeof TodoSchema>;

export const TodosSchema = z.array(TodoSchema);

export const TodosResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: TodosSchema,
});

export type TodosResponse = z.infer<typeof TodosResponseSchema>;

export const TodoResponseSchema = z.object({
  todo: TodoSchema,
});
