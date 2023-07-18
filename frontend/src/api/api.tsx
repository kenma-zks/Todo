import axios, { AxiosResponse } from "axios";
import { ITaskData } from "../types/types";

const instance = axios.create({
  baseURL: "http://localhost:5001/api/tasks",
});

export const getTasks = async (): Promise<ITaskData[]> => {
  const response: AxiosResponse<ITaskData[]> = await instance.get("/");
  return response.data;
};
