import { useXTodosService } from "./TodoService_mobx";
import { useReduxTodosService } from "./TodoService_redux";

export const useTodosService =
  process.env.REACT_APP_STORE === "mobx"
    ? useXTodosService
    : useReduxTodosService;
