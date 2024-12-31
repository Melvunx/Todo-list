import { Todo } from "@/schema/todo.schema";
import { PenIcon, Trash2Icon } from "lucide-react";
import ButtonManager from "./layout/ButtonManager";
import { Checkbox } from "./ui/checkbox";

type TaskProps = {
  task: Todo;
  onRefresh: () => Promise<void>;
};

const Task: React.FC<TaskProps> = ({ task, onRefresh }) => {
  const dateFormater = (dateTime: string) => {
    try {
      const date = new Date(dateTime);
      const formatedDate = date.toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      return formatedDate;
    } catch (error) {
      console.error(error);
    }
  };

  const onChecked = async (taskId: string) => {
    try {
      const toggleStatus = task.status === 0 ? 1 : 0;
      await fetch(`http://localhost:3000/api/todo-status/${taskId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: toggleStatus }),
      });
      onRefresh();
    } catch (error) {
      console.error(error);
    }
  };

  const editedList = async (taskId: string) => {
    try {
      await fetch("http://localhost:3000/api/todo/")
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative m-auto flex w-5/6 items-center justify-center rounded-lg bg-slate-400/10 py-1">
      <Checkbox
        checked={task.status === 1}
        onCheckedChange={() => onChecked(task.id)}
        className="absolute left-32"
      />
      <div
        className={` flex w-3/5 items-center justify-between rounded-lg p-4 ${
          task.important === 1 ? "bg-rose-500/30" : "bg-indigo-500/30"
        }`}
      >
        <p
          className={
            task.status === 1
              ? "text-orange-900 line-through transition-colors"
              : ""
          }
        >
          {task.list}
        </p>
        {/* <Dot className="text-indigo-600" /> */}
        <strong className="italic">{dateFormater(task.createdAt)}</strong>
      </div>
      <div className="absolute right-10 flex gap-3">
        <ButtonManager variant="outline" className="hover:text-indigo-500">
          <PenIcon />
        </ButtonManager>
        <ButtonManager variant="outline" className="hover:text-rose-500">
          <Trash2Icon />
        </ButtonManager>
      </div>
    </div>
  );
};

export default Task;
