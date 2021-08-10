import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import mockService from "../../ajax/__mock/mock-service";
import {
  FSA,
  AppStore,
  Todo,
  TodoStoreStatus,
  NewTodo,
  TodoStore,
} from "../../types";

//--------------------------------------
// service/controller hook for todos
//--------------------------------------

export function useTodosService() {
  //
  const todoStore = useSelector<AppStore, TodoStore>(
    (store) => store.todoStore
  );

  const { todos, status } = todoStore;

  const dispatch = useDispatch();

  const getTodos = useCallback(
    (uid: string, status?: string) => {

      const action: Omit<FSA<any, TodoStoreStatus>, "payload"> = {
        type: TodoStoreStatus.GETTING_TODO,
      };

      dispatch(action);
      return mockService
        .getTodos(uid, status)
        .then((todos) => {
          const action: FSA<Todo[], TodoStoreStatus> = {
            type: TodoStoreStatus.GET_TODO_SUCCESS,
            payload: todos,
          };
          dispatch(action);
          return todos;
        })
        .catch((error: Error) => {
          const action: FSA<string, TodoStoreStatus> = {
            type: TodoStoreStatus.GET_TODO_FAILED,
            payload: error.message,
          };
          dispatch(action);
          return null;
        });
    },
    [dispatch]
  );

  const setTodo = useCallback(
    (todo: Todo) => {
      const action: Omit<FSA<any, TodoStoreStatus>, "payload"> = {
        type: TodoStoreStatus.SETTING_TODO,
      };
      dispatch(action);
      return mockService
        .setTodo(todo)
        .then((todo) => {
          const action: FSA<Todo, TodoStoreStatus> = {
            type: TodoStoreStatus.SET_TODO_SUCCESS,
            payload: todo,
          };
          dispatch(action);
          return todo;
        })
        .catch((error: Error) => {
          const action: FSA<string, TodoStoreStatus> = {
            type: TodoStoreStatus.SET_TODO_FAILED,
            payload: error.message,
          };
          dispatch(action);
          return null;
        });
    },
    [dispatch]
  );

  const addTodo = useCallback(
    (todo: NewTodo) => {
      const action: Omit<FSA<any, TodoStoreStatus>, "payload"> = {
        type: TodoStoreStatus.ADDING_TODO,
      };
      dispatch(action);
      return mockService
        .addTodo(todo)
        .then((todo) => {
          const action: FSA<Todo, TodoStoreStatus> = {
            type: TodoStoreStatus.ADD_TODO_SUCCESS,
            payload: todo,
          };
          dispatch(action);
          return todo;
        })
        .catch((error: Error) => {
          const action: FSA<string, TodoStoreStatus> = {
            type: TodoStoreStatus.ADD_TODO_FAILED,
            payload: error.message,
          };
          dispatch(action);
          return null;
        });
    },
    [dispatch]
  );

  return { todos, status, getTodos, setTodo, addTodo };
}
