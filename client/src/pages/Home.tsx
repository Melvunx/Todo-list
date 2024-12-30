import FormTodo from "@/components/FormTodo";
import { ModeToggle } from "@/components/ModeToggle";
import Todos from "@/components/Todos";
import { Separator } from "@/components/ui/separator";
import { Todo } from "@/schema/todo.schema";
import { useEffect, useState } from "react";

const Home = () => {
  const [todoData, setTodoData] = useState<Todo[]>([]);

  const fetchedTodo = async () => {
    try {
      await fetch("http://localhost:3000/api/todos/").then((res) => {
        res.json().then((response) => {
          const { todos } = response.data;
          setTodoData(todos);
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchedTodo();
  }, []);

  return (
    <div>
      <h1>Home</h1>
      <ModeToggle />
      <Todos todos={todoData} />
      <Separator />
      <FormTodo onRefresh={fetchedTodo} />
    </div>
  );
};

export default Home;
