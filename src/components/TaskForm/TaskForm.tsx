import { useMutation, useQueryClient } from "@tanstack/react-query";
import css from "./TaskForm.module.css";
import { createTask } from "../../services/taskServices";
import type { CreateTaskData } from "../../types/task";

interface TaskFormProps {
  onSuccess: () => void;
}
export default function TaskForm({ onSuccess }: TaskFormProps) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: CreateTaskData) => createTask(data),
  });

  console.log("queryClient:", queryClient);

  const handleSubmit = (data: FormData) => {
    // console.log("data:", data);
    mutate(
      {
        text: data.get("text") as string,
      },
      {
        onSuccess: () => {
          // console.log("Success");
          queryClient.invalidateQueries({ queryKey: ["tasks"] });
          onSuccess();
        },
        onError: (error) => {
          console.log(error);
        },
      }
    );
  };
  return (
    <form className={css.form} action={handleSubmit}>
      <label className={css.label}>
        Task text
        <textarea name="text" className={css.input} rows={5}></textarea>
      </label>

      <button type="submit" className={css.button} disabled={isPending}>
        {isPending ? "Creating..." : "Create"}
      </button>
    </form>
  );
}
