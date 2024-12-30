import { TodosResponseSchema } from "@/schema/todo.schema";

export const getTodos = async () => {
  fetch("http://localhost:3000/api/todos/").then((res) => {
    res.json().then(TodosResponseSchema.parse);
  });
};
