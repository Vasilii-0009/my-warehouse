export interface User {
  id: number;
  username: string;
  email: string;
  tasks: number;
  todos?: { id: number; title: string; completed: boolean }[];
}

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
