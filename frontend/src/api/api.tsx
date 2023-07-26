import axios, { AxiosResponse } from "axios";
import { ILoginData, IRegisterData, ITaskData } from "../types/types";

const instance = axios.create({
  baseURL: "http://localhost:5001/api",
});

export const getTasks = async (): Promise<ITaskData[]> => {
  const response: AxiosResponse<ITaskData[]> = await instance.get("/tasks/", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  });
  return response.data;
};

export const getUser = async () => {
  const response = await instance.get("/users/current", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  });
  return response.data;
};

export const createTaskMutation = async (task: ITaskData) => {
  const response: AxiosResponse<ITaskData> = await instance.post(
    "/tasks/",
    task
  );
  return response.data;
};

export const updateTaskMutation = async (
  id: string,
  task: ITaskData
): Promise<ITaskData> => {
  const response: AxiosResponse<ITaskData> = await instance.put(
    `/tasks/${id}`,
    task
  );
  return response.data;
};

export const deleteTaskMutation = async (id: string) => {
  const response: AxiosResponse<ITaskData> = await instance.delete(
    `/tasks/${id}`
  );
  return response.data;
};

export const loginMutation = async (loginData: ILoginData) => {
  const response = await instance.post("/users/login", loginData);
  return response.data;
};

export const registerMutation = async (registerData: IRegisterData) => {
  const response = await instance.post("/users/register", registerData);
  return response.data;
};
