import { Todo } from "@/schema/todo.schema";

type TodoProps = {
  todos: Todo[];
};

const Todos: React.FC<TodoProps> = ({ todos }) => {
  return (
    <div>
      <ul>
        {todos ? (
          todos.map((todo) => (
            <li key={todo.id}>
              {" "}
              {todo.list} - <strong>{todo.createdAt}</strong>{" "}
            </li>
          ))
        ) : (
          <h1> No results</h1>
        )}
      </ul>
    </div>
  );
};

export default Todos;
