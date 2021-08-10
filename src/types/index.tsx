import { Action } from "redux";

export type User = {
  userName: string;
  uid?: string;
};

export enum AuthStoreStatus {
  LOGGED_IN = "logged-in",
  LOGGED_OUT = "logged-out",
  LOGGING_IN = "logging-in",
  LOGGING_OUT = "logging-out",
  AUTH_ERROR = "auth-error",
  REGISTERING = "registering",
  REGISTERING_SUCCESS = "registering-success",
  REGISTERING_FAILED = "registering-failed",
  IDLE = "idle"
} ;

export enum TodoStoreStatus {
  GETTING_TODO = "getting-todo",
  GET_TODO_SUCCESS = "get-todo-success",
  GET_TODO_FAILED = "get-todo-failed",
  SETTING_TODO = "setting-todo",
  SET_TODO_SUCCESS = "set-todo-success",
  SET_TODO_FAILED = "set-todo-failed",
  ADDING_TODO = "adding-todo",
  ADD_TODO_SUCCESS = "add-todo-success",
  ADD_TODO_FAILED = "add-todo-failed",
  IDLE = "idle",
}

export type AuthStore = {
  status: AuthStoreStatus;
  user?: User | null;
  errorMessage?: string;
};

export enum TodoStatus {
  OPEN = "open",
  DONE = "done",
  WIP = "wip",
}

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
