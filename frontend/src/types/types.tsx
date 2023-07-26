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

export interface IRegisterData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface tokenState {
  accessToken: string;
}

export interface authState {
  authTokens: tokenState | null;
  user: null | {
    _id: string;
  };
}
