import { LoginUser, NewTodo, Todo, User } from "../../types";

const getNetworkDelay = () => 1000 + Math.random() * 1000;

class MockService {
  //
  constructor() {
    console.log("******************");
    console.log("***Mock Service***");
    console.log("******************");
  }
  //
  static userIndex: number = 1;

  static todoIndex: number = 0;

  users: User[] = [{ userName: "Jagan", uid: "1", tier: "free" }];

  session: User[] = [];

  todos: Todo[] = [];

  //------------------------------------
  // Auth Releated
  //------------------------------------

  login(user: LoginUser): Promise<User> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const u = this.users.find((u) => u.userName === user.userName);
        if (u) {
          if (this.session.includes(u)) {
            reject(new Error("User already signed in somewhere else"));
          } else {
            this.session.push(u);
            resolve(u);
          }
        } else {
          reject(new Error("Invalid user credential!"));
        }
      }, getNetworkDelay());
    });
  }

  logout(user: User): Promise<boolean> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const u = this.session.find((u) => u.userName === user.userName);
        if (u) {
          this.session.splice(this.session.indexOf(u), 1);
          resolve(true);
        } else {
          reject(new Error("Invalid user input!"));
        }
      }, getNetworkDelay());
    });
  }

  register(user: User): Promise<User> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const u = this.users.find((u) => u.userName === user.userName);
        if (u) {
          reject(new Error("Username already exist"));
        } else {
          MockService.userIndex++;
          let u = { ...user, uid: MockService.userIndex.toString() };
          this.users.push(u);
          resolve(u);
        }
      }, getNetworkDelay());
    });
  }

  //------------------------------------
  // Todo Related
  //------------------------------------

  addTodo(todo: NewTodo): Promise<Todo> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (todo.uid) {
          if (this.session.find((u) => u.uid === todo.uid)) {
            const t = { ...todo, id: (MockService.todoIndex++).toString() };
            this.todos.push(t);
            resolve(t);
          } else {
            reject(new Error("401-unauthorized access"));
          }
        } else {
          reject(new Error("400-bad request. session info not found"));
        }
      }, getNetworkDelay());
    });
  }

  setTodo(todo: Todo): Promise<Todo> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (todo.uid) {
          if (this.session.find((u) => u.uid === todo.uid)) {
            const qResult = this.todos.find((t) => t.id === todo.id);
            if (qResult) {
              this.todos.splice(this.todos.indexOf(qResult), 1, todo);
              resolve(todo);
            } else {
              reject(new Error("400-bad request. invalid todo id"));
            }
          } else {
            reject(new Error("401-unauthorized access"));
          }
        } else {
          reject(new Error("400-bad request. session info not found"));
        }
      }, getNetworkDelay());
    });
  }

  getTodos(uid: string, status?: string): Promise<Todo[]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (uid) {
          if (this.session.find((u) => u.uid === uid)) {
            const result = this.todos.filter(
              (t) => t.uid === uid && (!status || t.status === status)
            );
            resolve(result);
          } else {
            reject(new Error("401-unauthorized access"));
          }
        } else {
          reject(new Error("400-bad request. session info not found"));
        }
      }, getNetworkDelay());
    });
  }
}

export default new MockService();
