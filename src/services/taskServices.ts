import axios from "axios";
import type { CreateTaskData, Task, UpdateTaskData } from "../types/task";

axios.defaults.baseURL = "https://62584f320c918296a49543e7.mockapi.io";

export const getTasks = async () => {
  const res = await axios.get<Task[]>("/tasks");
  return res.data;
};

export const createTask = async (data: CreateTaskData) => {
  const res = await axios.post<Task>("/task", data);
  return res.data;
};

export const deleteTask = async (id: Task["id"]) => {
  await axios.delete(`/tasks/${id}`);
};

export const updateTask = async (id: Task["id"], data: UpdateTaskData) => {
  const res = await axios.put<Task>(`/tasks/${id}`, data);
  return res.data;
};
