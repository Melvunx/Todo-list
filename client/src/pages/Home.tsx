import FormTodo from "@/components/FormTodo";
import Todos from "@/components/Todos";
import { Separator } from "@/components/ui/separator";
import { Todo } from "@/schema/todo.schema";
import { useEffect, useState } from "react";
import { Toaster } from "sonner";

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
      console.log("Todolist update");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchedTodo();
  }, []);

  return (
    <div>
      <h1 className="bg-slate-500/30 py-6 text-center font-mono font-semibold italic">
        Melvunx Todolist
      </h1>
      <Todos todos={todoData} onRefresh={fetchedTodo} />
      <Separator />
      <Toaster />
      <FormTodo onRefresh={fetchedTodo} />
    </div>
  );
};

export default Home;
