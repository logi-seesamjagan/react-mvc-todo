import { autorun } from "mobx";
import { useEffect, useState } from "react";
import { useXStore } from "../../store";
import { AuthStoreStatus, ITodoStore, TodoStoreStatus } from "../../types";

//--------------------------------------
// service/controller hook for todos
//--------------------------------------

export function useXTodosService() {
  //
  const { todoStore } = useXStore();

  const [store, setStore] = useState<ITodoStore>({ ...todoStore });

  const getTodos = todoStore.getTodos;

  const setTodo = todoStore.setTodo;

  const addTodo = todoStore.addTodo;

  useEffect(() => {
    autorun(() => {
      setStore({ ...todoStore });
    });
  }, [todoStore]);

  return { ...store, getTodos, setTodo, addTodo };
}

autorun(() => {
  const { authStore, todoStore } = useXStore();
  if (
    [AuthStoreStatus.LOGGED_OUT, AuthStoreStatus.IDLE].includes(
      authStore.status
    )
  ) {
    todoStore.todos = [];
    todoStore.status = TodoStoreStatus.IDLE;
  }
});
