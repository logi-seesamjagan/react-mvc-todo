import { Action } from "redux";

export type User = {
  userName: string;
  uid?: string;
};

export type AuthStoreStatus =
  | "logged-in"
  | "logged-out"
  | "logging-in"
  | "logging-out"
  | "auth-error"
  | "registering"
  | "registering-success"
  | "registering-failed"
  | "idle";

export type TodoStoreStatus =
  | "getting-todo"
  | "get-todo-success"
  | "get-todo-failed"
  | "setting-todo"
  | "set-todo-success"
  | "set-todo-failed"
  | "adding-todo"
  | "add-todo-success"
  | "add-todo-failed"
  | 'idle';

export type AuthStore = {
  status: AuthStoreStatus;
  user?: User | null;
  errorMessage?: string;
};

export type TodoStatus = "open" | "done" | "wip";

export type Todo = {
  status: TodoStatus;
  text: string;
  uid: string;
  id: string;
};

export type NewTodo = Omit<Todo, "id">;

export type TodoStore = {
  todos: Todo[];
  status: TodoStoreStatus;
  message: string;
};

export type AppStore = {
  auth: AuthStore;
  todoStore: TodoStore;
};

export type FSA<Payload = any, ActionType = string> = Action<ActionType> & {
  payload: Payload;
};
