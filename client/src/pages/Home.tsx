import Todos from "@/components/Todos";
import { Todo } from "@/schema/todo.schema";
import { useState } from "react";

const Home = () => {
  const [data, setData] = useState<Todo[]>([]);

  const fetchedTodo = async () => {
    
  }

  return (
    <div>
      <h1>Home</h1>
      <Todos />
    </div>
  );
};

export default Home;
