export interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export interface CreateTaskData {
  text: string;
}

export interface UpdateTaskData {
  // text: string;
  completed: boolean;
}
