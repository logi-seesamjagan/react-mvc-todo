import { Todo, TodoStatus } from "../types";

import mockService from "./__mock/mock-service";

export function apiAddTodo(todo: Todo): Promise<Todo> {
  return mockService.addTodo(todo);
}

export function apiSetTodo(todo: Todo): Promise<Todo> {
  return mockService.setTodo(todo);
}

export function getTodos(uid: string, status?: TodoStatus): Promise<Todo[]> {
  return mockService.getTodos(uid, status);
}
