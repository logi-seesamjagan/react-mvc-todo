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
  TodoStoreStatus,
} from "../../types";
//--------------------------------------
//#region action creators - Todos
//--------------------------------------

function actionGettingTodos() {
  const action: Omit<FSA<any, TodoStoreStatus>, "payload"> = {
    type: TodoStoreStatus.GETTING_TODO,
  };
  return action;
}

function actionGetTodosSuccess(todos: Todo[]) {
  const action: FSA<Todo[], TodoStoreStatus> = {
    type: TodoStoreStatus.GET_TODO_SUCCESS,
    payload: todos,
  };
  return action;
}

function actionGetTodosFailed(message: string) {
  const action: FSA<string, TodoStoreStatus> = {
    type: TodoStoreStatus.GET_TODO_FAILED,
    payload: message,
  };
  return action;
}

function actionSettingTodo() {
  const action: Omit<FSA<any, TodoStoreStatus>, "payload"> = {
    type: TodoStoreStatus.SETTING_TODO,
  };
  return action;
}

function actionSetTodoSuccess(todo: Todo) {
  const action: FSA<Todo, TodoStoreStatus> = {
    type: TodoStoreStatus.SET_TODO_SUCCESS,
    payload: todo,
  };
  return action;
}

function actionSetTodoFailed(message: string) {
  const action: FSA<string, TodoStoreStatus> = {
    type: TodoStoreStatus.SET_TODO_FAILED,
    payload: message,
  };
  return action;
}

function actionAddingTodo() {
  const action: Omit<FSA<any, TodoStoreStatus>, "payload"> = {
    type: TodoStoreStatus.ADDING_TODO,
  };
  return action;
}

function actionAddTodoSuccess(todo: Todo) {
  const action: FSA<Todo, TodoStoreStatus> = {
    type: TodoStoreStatus.ADD_TODO_SUCCESS,
    payload: todo,
  };
  return action;
}

function actionAddTodoFailed(message: string) {
  const action: FSA<string, TodoStoreStatus> = {
    type: TodoStoreStatus.ADD_TODO_FAILED,
    payload: message,
  };
  return action;
}
//--------------------------------------
//#endregion
//--------------------------------------

//--------------------------------------
// #region todos service/middleware hook
//--------------------------------------

export function useReduxTodosService() {
  //
  const todoStore = useSelector<IAppStore, ITodoStore>(
    (store) => store.todoStore
  );

  const { todos, status } = todoStore;

  const dispatch = useDispatch();

  const getTodos = useCallback(
    async (uid: string, status?: TodoStatus) => {
      dispatch(actionGettingTodos());
      return apiGetTodos(uid, status)
        .then((todos) => {
          dispatch(actionGetTodosSuccess(todos));
          return todos;
        })
        .catch((error: Error) => {
          dispatch(actionGetTodosFailed(error.message));
          return null;
        });
    },
    [dispatch]
  );

  const setTodo = useCallback(
    async (todo: Todo) => {
      dispatch(actionSettingTodo());
      return apiSetTodo(todo)
        .then((todo) => {
          dispatch(actionSetTodoSuccess(todo));
          return todo;
        })
        .catch((error: Error) => {
          dispatch(actionSetTodoFailed(error.message));
          return null;
        });
    },
    [dispatch]
  );

  const addTodo = useCallback(
    (todo: NewTodo) => {
      dispatch(actionAddingTodo());
      return apiAddTodo(todo)
        .then((todo) => {
          dispatch(actionAddTodoSuccess(todo));
          return todo;
        })
        .catch((error: Error) => {
          dispatch(actionAddTodoFailed(error.message));
          return null;
        });
    },
    [dispatch]
  );

  return { todos, status, getTodos, setTodo, addTodo };
}

//--------------------------------------
// #endregion
//--------------------------------------
