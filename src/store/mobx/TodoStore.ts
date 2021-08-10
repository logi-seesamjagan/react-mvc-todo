import { Todo, ITodoStore, TodoStoreStatus } from "../../types";
import { makeAutoObservable } from "mobx";

class TodoStore implements ITodoStore {
  todos: Todo[] = [];
  status: TodoStoreStatus = TodoStoreStatus.IDLE;
  message: string = "";

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setTodo(todo: Todo) {
    // todo: validate the index for -1 case
    this.todos.splice(
      this.todos.findIndex((t) => t.id === todo.id),
      1,
      todo
    );
  }
}

export default new TodoStore();
