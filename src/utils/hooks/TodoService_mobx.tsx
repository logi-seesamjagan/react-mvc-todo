import { autorun } from "mobx";
import { useCallback, useEffect, useState } from "react";
import { apiAddTodo, apiGetTodos, apiSetTodo } from "../../ajax";
import { useXStore } from "../../store";
import {
  AuthStoreStatus, ITodoStore,
  NewTodo,
  Todo,
  TodoStatus,
  TodoStoreStatus
} from "../../types";

//--------------------------------------
// service/controller hook for todos
//--------------------------------------

export function useXTodosService() {
  //
  const { todoStore } = useXStore();

  const [store, setStore] = useState<ITodoStore>({ ...todoStore });

  const getTodos = useCallback(
    async (uid: string, status?: TodoStatus) => {
      todoStore.status = TodoStoreStatus.GETTING_TODO;
      return apiGetTodos(uid, status)
        .then((todos) => {
          todoStore.status = TodoStoreStatus.GET_TODO_SUCCESS;
          todoStore.todos = todos;
          return todos;
        })
        .catch((error: Error) => {
          todoStore.status = TodoStoreStatus.GET_TODO_FAILED;
          todoStore.message = error.message;
          return null;
        });
    },
    [todoStore]
  );

  const setTodo = useCallback(
    async (todo: Todo) => {
      todoStore.status = TodoStoreStatus.SETTING_TODO;
      return apiSetTodo(todo)
        .then((todo) => {
          todoStore.status = TodoStoreStatus.SET_TODO_SUCCESS;
          todoStore.setTodo(todo);
          return todo;
        })
        .catch((error: Error) => {
          todoStore.status = TodoStoreStatus.SET_TODO_FAILED;
          todoStore.message = error.message;
          return null;
        });
    },
    [todoStore]
  );

  const addTodo = useCallback(
    async (todo: NewTodo) => {
      todoStore.status = TodoStoreStatus.ADDING_TODO;
      return apiAddTodo(todo)
        .then((todo) => {
          todoStore.status = TodoStoreStatus.ADD_TODO_SUCCESS;
          todoStore.todos.push(todo);
          return todo;
        })
        .catch((error: Error) => {
          todoStore.status = TodoStoreStatus.ADD_TODO_FAILED;
          todoStore.message = error.message;
          return null;
        });
    },
    [todoStore]
  );

  useEffect(() => {
    autorun(() => {
      setStore({ ...todoStore });
    });
  }, [todoStore]);

  return { ...store, getTodos, setTodo, addTodo };
}

autorun(() => {
  const { authStore, todoStore } = useXStore();
  if (authStore.status === AuthStoreStatus.LOGGED_OUT) {
    todoStore.todos = [];
    todoStore.status = TodoStoreStatus.IDLE;
  }
});