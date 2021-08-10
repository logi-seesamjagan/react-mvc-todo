import {
  AuthStoreStatus,
  AuthStore,
  FSA,
  Todo,
  User,
  TodoStore,
  TodoStoreStatus,
} from "../../types";
import { AuthActions } from "../actions";

export function authReducer(
  state: AuthStore = { status: "idle" },
  action: FSA<User | string, AuthStoreStatus>
): AuthStore {
  const { type, payload } = action;
  switch (type) {
    case AuthActions.LOGGED_IN:
      return { status: type, user: payload as User };
    case AuthActions.LOGGED_OUT:
      return { status: type };
    case AuthActions.LOGGING_IN:
      return { status: type };
    case AuthActions.LOGGING_OUT:
      return { ...state, status: type };
    case AuthActions.AUTH_ERROR:
      return {
        user: null,
        errorMessage: payload as string,
        status: type,
      };
    case AuthActions.REGISTERING:
    case AuthActions.REGISTERING_SUCCESS:
      return { status: type };
    case AuthActions.REGISTERING_FAILED:
      return { status: type, errorMessage: payload as string };
    default:
      return state;
  }
}

export function todosReducer(
  state: TodoStore = { todos: [], status: "idle", message: "" },
  action: FSA<Todo | Todo[] | string, TodoStoreStatus>
): TodoStore {
  const { type, payload } = action;
  switch (type) {
    // ---------------------------------
    case "adding-todo":
      return { ...state, status: type };
    case "add-todo-success":
      return {
        ...state,
        status: "idle",
        todos: [...state.todos, payload as Todo],
      };
    case "add-todo-failed":
      return { ...state, status: type };
    // ---------------------------------
    case "getting-todo":
      return { status: type, todos: [], message: "" };
    case "get-todo-success":
      return { status: "idle", todos: payload as Todo[], message: "" };
    case "get-todo-failed":
      return { status: type, message: payload as string, todos: [] };
    // ---------------------------------
    case "setting-todo":
      return { ...state, status: type };
    case "set-todo-success":
      const todo: Todo = payload as Todo;
      return {
        ...state,
        status: "idle",
        todos: [...state.todos.filter((t) => t.id !== todo.id), todo],
      };
    case "set-todo-failed":
      return {
        ...state,
        status: type,
        message: payload as string,
      };
    // ---------------------------------
    case AuthActions.LOGGED_OUT:
      return { status: "idle", todos: [], message: "" };
    default:
      return state;
  }
}
