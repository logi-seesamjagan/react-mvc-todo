import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiAddTodo, apiGetTodos, apiSetTodo } from "../../ajax";
import {
  FSA,
  IAppStore,
  ITodoStore,
  NewTodo,
  Todo,
  TodoStatus,
  TodoStoreStatus
} from "../../types";

//--------------------------------------
// service/controller hook for todos
//--------------------------------------

export function useReduxTodosService() {
  //
  const todoStore = useSelector<IAppStore, ITodoStore>(
    (store) => store.todoStore
  );

  const { todos, status } = todoStore;

  const dispatch = useDispatch();

  const getTodos = useCallback(
    (uid: string, status?: TodoStatus) => {
      const action: Omit<FSA<any, TodoStoreStatus>, "payload"> = {
        type: TodoStoreStatus.GETTING_TODO,
      };

      dispatch(action);
      return apiGetTodos(uid, status)
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
      return apiSetTodo(todo)
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
      return apiAddTodo(todo)
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