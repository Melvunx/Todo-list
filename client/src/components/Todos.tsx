import { Todo } from "@/schema/todo.schema";
import { useState } from "react";
import Task from "./Task";

type TodoProps = {
  todos: Todo[];
  onRefresh: () => Promise<void>;
};

const Todos: React.FC<TodoProps> = ({ todos, onRefresh }) => {
  const [isHoverDiv, setIsHoverDiv] = useState<boolean>(true);

  return (
    <div
      onMouseEnter={() => setIsHoverDiv(true)}
      onMouseLeave={() => setIsHoverDiv(false)}
    >
      <ul className="my-4 flex flex-col gap-5">
        {todos ? (
          todos.map((todo, index) => (
            <div key={todo.id} className="relative">
              <p
                className={`absolute left-3 top-1/3 italic text-slate-600/30 ${
                  isHoverDiv ? "text-indigo-700/30" : ""
                }`}
                key={index}
              >
                Tâche n°{index + 1}
              </p>
              <Task key={todo.id} task={todo} onRefresh={onRefresh} />
            </div>
          ))
        ) : (
          <h1> No results</h1>
        )}
      </ul>
    </div>
  );
};

export default Todos;
