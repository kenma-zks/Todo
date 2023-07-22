export interface ITaskData {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: string;
  progress: string;
  createdAt: string;
}

export interface ILoginData {
  email: string;
  password: string;
}
