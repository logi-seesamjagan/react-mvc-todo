import { Action } from "redux";

export type LoginUser = {
  userName: string;
};

export type RegisterUser = LoginUser & {
  tier: TierType;
};

export type User = RegisterUser & {
  uid: string;
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
  IDLE = "idle-auth-store",
}

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
  IDLE = "idle-todo-store",
}

export interface IAuthStore {
  status: AuthStoreStatus;
  user?: User | null;
  message?: string;
}

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

export interface ITodoStore {
  todos: Todo[];
  status: TodoStoreStatus;
  message: string;
}

export interface IAppStore {
  authStore: IAuthStore;
  todoStore: ITodoStore;
  productStore: IProductStore;
}

export type FSA<Payload = any, ActionType = string> = Action<ActionType> & {
  payload: Payload;
};

export type IAuthService = () => {
  auth: IAuthStore;
  logIn: (user: LoginUser) => Promise<string | User>;
  logOut: (user: User) => Promise<boolean>;
  register: (user: RegisterUser) => Promise<User | string>;
  reset: () => void;
};

export type TierType = "free" | "gold" | "platinum";

export type Tier = {
  type: TierType;
  name: string;
  info: string;
  taskBucket: number;
  storageBucket: number;
};

export type Tiers = {
  [key: string]: Tier;
};

export enum ProductStoreStatus {
  IDLE = "idle-product-store",
  LOADING_TIERS = "loading-tiers",
  LOADING_TIERS_SUCCESS = "loading-tiers-success",
  LOADING_TIERS_FAILED = "loading-tiers-failed",
}

export interface IProductStore {
  tiers: Tiers | null;
  status: ProductStoreStatus;
  message: string | null;
}
