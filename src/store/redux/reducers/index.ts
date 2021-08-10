import {
  AuthStoreStatus,
  IAuthStore,
  FSA,
  Todo,
  User,
  ITodoStore,
  TodoStoreStatus,
} from "../../../types";

export function authReducer(
  state: IAuthStore = { status: AuthStoreStatus.IDLE },
  action: FSA<User | string, AuthStoreStatus>
): IAuthStore {
  const { type, payload } = action;
  switch (type) {
    case AuthStoreStatus.LOGGED_IN:
      return { status: type, user: payload as User };
    case AuthStoreStatus.LOGGED_OUT:
      return { status: type };
    case AuthStoreStatus.LOGGING_IN:
      return { status: type };
    case AuthStoreStatus.LOGGING_OUT:
      return { ...state, status: type };
    case AuthStoreStatus.AUTH_ERROR:
      return {
        user: null,
        message: payload as string,
        status: type,
      };
    case AuthStoreStatus.REGISTERING:
    case AuthStoreStatus.REGISTERING_SUCCESS:
      return { status: type };
    case AuthStoreStatus.REGISTERING_FAILED:
      return { status: type, message: payload as string };
    default:
      return state;
  }
}

export function todosReducer(
  state: ITodoStore = { todos: [], status: TodoStoreStatus.IDLE, message: "" },
  action: FSA<
    Todo | Todo[] | string,
    TodoStoreStatus & AuthStoreStatus.LOGGING_OUT
  >
): ITodoStore {
  const { type, payload } = action;
  switch (type) {
    // ---------------------------------
    case TodoStoreStatus.ADDING_TODO:
      return { ...state, status: type };
    case TodoStoreStatus.ADD_TODO_SUCCESS:
      return {
        ...state,
        status: TodoStoreStatus.IDLE,
        todos: [...state.todos, payload as Todo],
      };
    case TodoStoreStatus.ADD_TODO_FAILED:
      return { ...state, status: type };
    // ---------------------------------
    case TodoStoreStatus.GETTING_TODO:
      return { status: type, todos: [], message: "" };
    case TodoStoreStatus.GET_TODO_SUCCESS:
      return {
        status: TodoStoreStatus.IDLE,
        todos: payload as Todo[],
        message: "",
      };
    case TodoStoreStatus.GET_TODO_FAILED:
      return { status: type, message: payload as string, todos: [] };
    // ---------------------------------
    case TodoStoreStatus.SETTING_TODO:
      return { ...state, status: type };
    case TodoStoreStatus.SET_TODO_SUCCESS:
      const todo: Todo = payload as Todo;
      return {
        ...state,
        status: TodoStoreStatus.IDLE,
        todos: [...state.todos.filter((t) => t.id !== todo.id), todo],
      };
    case TodoStoreStatus.SET_TODO_FAILED:
      return {
        ...state,
        status: type,
        message: payload as string,
      };
    // ---------------------------------
    case AuthStoreStatus.LOGGED_OUT:
      return { status: TodoStoreStatus.IDLE, todos: [], message: "" };
    default:
      return state;
  }
}
