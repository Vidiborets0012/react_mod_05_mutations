import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Task, UpdateTaskData } from "../../types/task";
import { deleteTask, updateTask } from "../../services/taskServices";
import css from "./TaskList.module.css";

interface TaskListProps {
  tasks: Task[];
}

export default function TaskList({ tasks }: TaskListProps) {
  const queryClient = useQueryClient();

  const { mutate: deleteTaskM, isPending } = useMutation({
    mutationFn: (id: Task["id"]) => deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const { mutate: updateTaskM } = useMutation({
    mutationFn: ([id, data]: [Task["id"], UpdateTaskData]) =>
      updateTask(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
  return (
    <ul className={css.list}>
      {tasks.map((task) => (
        <li key={task.id} className={css.item}>
          <input
            type="checkbox"
            defaultChecked={task.completed}
            onChange={() =>
              updateTaskM([
                task.id,
                {
                  // text: task.text,
                  completed: !task.completed,
                },
              ])
            }
            className={css.checkbox}
          />
          <span className={css.text}>{task.text}</span>
          <button
            type="button"
            className={css.button}
            disabled={isPending}
            onClick={() => deleteTaskM(task.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
