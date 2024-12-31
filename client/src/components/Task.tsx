import { Todo } from "@/schema/todo.schema";
import { OctagonAlertIcon, PenIcon, PenLine, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import ButtonManager from "./layout/ButtonManager";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Checkbox } from "./ui/checkbox";
import { Textarea } from "./ui/textarea";
import { Toggle } from "./ui/toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

type TaskProps = {
  task: Todo;
  onRefresh: () => Promise<void>;
};

const Task: React.FC<TaskProps> = ({ task, onRefresh }) => {
  const [editedList, setEditedList] = useState("");
  const [isEdited, setIsEdited] = useState(false);

  const dateFormater = (dateTime: Date) => {
    try {
      const formatedDate = dateTime.toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      return formatedDate;
    } catch (error) {
      console.error(error);
    }
  };

  const toastedMessage = (title: string, description: string) => {
    toast(title, {
      description,
      action: {
        label: "Fermer",
        onClick: () => {
          toast.dismiss();
        },
      },
    });
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

  const onSwitchImportant = async (taskId: string) => {
    try {
      const toggleImportance = task.important === 0 ? 1 : 0;
      await fetch(`http://localhost:3000/api/todo-important/${taskId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ important: toggleImportance }),
      });
      onRefresh();
    } catch (error) {
      console.error(error);
    }
  };

  const onEditedList = async (taskId: string) => {
    try {
      const data = {
        todo: { list: editedList ? editedList : task.list },
      };
      await fetch(`http://localhost:3000/api/todos/edit-todo/${taskId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      onRefresh();
      setIsEdited(false);
    } catch (error) {
      console.error(error);
    }
  };

  const onDelete = async (taskId: string) => {
    try {
      await fetch(`http://localhost:3000/api/todos/${taskId}`, {
        method: "DELETE",
      });
      onRefresh();
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
        {isEdited ? (
          <div className="flex items-center justify-between gap-12">
            <Textarea
              className="w-3/4 resize-none"
              defaultValue={editedList ? editedList : task.list}
              onChange={(e) => setEditedList(e.target.value)}
            ></Textarea>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Toggle
                    className="rounded-lg"
                    onClick={() => onSwitchImportant(task.id)}
                  >
                    <OctagonAlertIcon size={50} strokeWidth={1.8} />
                  </Toggle>
                </TooltipTrigger>
                <TooltipContent align="start">
                  {task.important === 0 ? (
                    <p className="text-red-500">Rendre la tâche prioritaire</p>
                  ) : (
                    <p className="text-indigo-500">
                      Rendre la tâche non prioritaire
                    </p>
                  )}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        ) : (
          <p
            className={
              task.status === 1
                ? "text-orange-900 line-through transition-colors"
                : ""
            }
          >
            {task.list}
          </p>
        )}

        {/* <Dot className="text-indigo-600" /> */}
        <strong className="italic">
          {dateFormater(
            new Date(task.updatedAt === null ? task.createdAt : task.updatedAt)
          )}
        </strong>
      </div>
      <div className="absolute right-10 flex gap-3">
        {isEdited ? (
          <ButtonManager
            variant="outline"
            className="hover:text-green-400"
            onClick={() => {
              onEditedList(task.id);

              setTimeout(() => {
                toastedMessage(
                  "Tâche modifiée !",
                  `Tâche modifiée le ${dateFormater(new Date(Date.now()))}`
                );
              }, 500);
            }}
          >
            <PenLine />
          </ButtonManager>
        ) : (
          <ButtonManager
            variant="outline"
            className="hover:text-indigo-500"
            onClick={() => setIsEdited(true)}
          >
            <PenIcon />
          </ButtonManager>
        )}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <ButtonManager variant="outline" className="hover:text-rose-500">
              <Trash2Icon />
            </ButtonManager>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-black/80 text-white">
            <AlertDialogHeader>
              <AlertDialogTitle>Êtes-vous sur de faire cela ?</AlertDialogTitle>
              <AlertDialogDescription>
                Si vous accepter, vous allez supprimer définitivement votre
                tâche.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="hover:text-indigo-500">
                Annuler
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  onDelete(task.id);

                  setTimeout(() => {
                    toastedMessage(
                      "Tâche supprimée !",
                      `Tâche supprimée le ${dateFormater(new Date(Date.now()))}`
                    );
                  }, 500);
                }}
                className=" hover:bg-white hover:text-red-500"
              >
                Continuer
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default Task;
