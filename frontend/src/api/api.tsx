import axios, { AxiosResponse } from "axios";
import { ITaskData } from "../types/types";

const instance = axios.create({
  baseURL: "http://localhost:5001/api/tasks",
});

export const getTasks = async (): Promise<ITaskData[]> => {
  const response: AxiosResponse<ITaskData[]> = await instance.get("/");
  return response.data;
};

export const createTaskMutation = async (task: ITaskData) => {
  const response: AxiosResponse<ITaskData> = await instance.post("/", task);
  return response.data;
};

export const updateTaskMutation = async (
  id: string,
  task: ITaskData
): Promise<ITaskData> => {
  const response: AxiosResponse<ITaskData> = await instance.put(`/${id}`, task);
  return response.data;
};

export const deleteTaskMutation = async (id: string) => {
  const response: AxiosResponse<ITaskData> = await instance.delete(`/${id}`);
  return response.data;
};
