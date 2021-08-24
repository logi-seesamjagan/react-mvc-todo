import { Todo, ITodoStore, TodoStoreStatus, TodoStatus, NewTodo } from "types";
import { makeAutoObservable } from "mobx";
import { apiAddTodo, apiGetTodos, apiSetTodo } from "ajax";

class TodoStore implements ITodoStore {
  todos: Todo[] = [];
  status: TodoStoreStatus = TodoStoreStatus.IDLE;
  message: string = "";

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async getTodos(uid: string, status?: TodoStatus) {
    this.status = TodoStoreStatus.GETTING_TODO;
    return apiGetTodos(uid, status)
      .then((todos) => {
        this.status = TodoStoreStatus.GET_TODO_SUCCESS;
        this.todos = todos;
        return todos;
      })
      .catch((error: Error) => {
        this.status = TodoStoreStatus.GET_TODO_FAILED;
        this.message = error.message;
        return null;
      });
  }

  async setTodo(todo: Todo) {
    this.status = TodoStoreStatus.SETTING_TODO;
    return apiSetTodo(todo)
      .then((todo) => {
        this.status = TodoStoreStatus.SET_TODO_SUCCESS;
        // TODO handle -1 index case
        this.todos.splice(
          this.todos.findIndex((t) => t.id === todo.id),
          1,
          todo
        );
        return todo;
      })
      .catch((error: Error) => {
        this.status = TodoStoreStatus.SET_TODO_FAILED;
        this.message = error.message;
        return null;
      });
  }

  async addTodo(todo: NewTodo) {
    this.status = TodoStoreStatus.ADDING_TODO;
    return apiAddTodo(todo)
      .then((todo) => {
        this.status = TodoStoreStatus.ADD_TODO_SUCCESS;
        this.todos.push(todo);
        return todo;
      })
      .catch((error: Error) => {
        this.status = TodoStoreStatus.ADD_TODO_FAILED;
        this.message = error.message;
        return null;
      });
  }
}

export default new TodoStore();
