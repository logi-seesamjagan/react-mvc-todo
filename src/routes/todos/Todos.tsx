import { ChangeEvent, useRef, useState, MouseEvent } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Blocker, Form, FormItem } from "../../components";
import { Todo, TodoStatus, TodoStoreStatus } from "../../types";
import { useAuthService, useTodosService } from "../../utils";

import "./Todos.css";

type TodosViewProps = {
  todos: Todo[];
  status: TodoStoreStatus;
  userName: string;
  saveTodo: (todo: Todo) => Promise<Todo | null>;
};

type TodoViewProps = {
  data: Todo;
  saveTodo: (todo: Todo) => Promise<Todo | null>;
  status: TodoStoreStatus;
};

const statusIcons = {
  done: "👍🏽",
  open: "🤞",
  wip: "🔥",
};

function TodoView(props: TodoViewProps) {
  const { data, saveTodo } = props;
  const [action, setAction] = useState("");
  const [editedTask, setEditedTask] = useState(data.text);

  const handleActionClick = (e: MouseEvent<HTMLSpanElement>) => {
    const a = e.currentTarget.title;
    if (a === "Save") {
      saveTodo({ ...data, text: editedTask });
    } else if (a === "Remove") {
      if (action === "Edit") {
        setAction("");
        setEditedTask(data.text);
      } else {
        // TODO invoke delete service
      }
    }
    setAction(a);
  };

  const handleTaskChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditedTask(e.target.value);
  };

  return (
    <div className="Todo">
      <span className="Icon">{statusIcons[data.status]}</span>
      <input
        type="text"
        className={"Task " + action}
        value={editedTask}
        disabled={action !== "Edit"}
        onChange={handleTaskChange}
      />
      <div className="Actions">
        {action !== "Edit" && (
          <span
            onClick={handleActionClick}
            role="button"
            aria-label="Edit"
            title="Edit"
            className="Icon Action Edit"
          >
            ✏️
          </span>
        )}
        {action === "Edit" && (
          <span
            onClick={handleActionClick}
            role="button"
            aria-label="Save"
            title="Save"
            className="Icon Action Save"
          >
            💾
          </span>
        )}
        <span
          onClick={handleActionClick}
          role="button"
          aria-label="Remove"
          title="Remove"
          className="Icon Action Delete"
        >
          ❌
        </span>
      </div>
    </div>
  );
}

export function TodosView(props: TodosViewProps) {
  const { todos, status, userName, saveTodo } = props;
  const [filter, setFilter] = useState<TodoStatus | "All">("All");

  const handleShowAllChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value as TodoStatus | "All");
  };
  return (
    <div className="Page TodosPage">
      <header className="PageHeader">
        <h1 className="PageTitle">Todos</h1>
        <Form>
          <FormItem title="Show" htmlFor="filter">
            <select className="FormItemInput" onChange={handleShowAllChange}>
              <option>All</option>
              <option>open</option>
              <option>wip</option>
              <option>done</option>
            </select>
          </FormItem>
        </Form>
      </header>
      <div className="Todos">
        {todos
          .filter((todo) => filter === "All" || todo.status === filter)
          .map((todo) => (
            <TodoView
              data={todo}
              key={todo.id}
              saveTodo={saveTodo}
              status={status}
            />
          ))}
        {todos.length === 0 && status !== "getting-todo" && (
          <div className="No-Data">
            <p>
              Hi <span className="UserName">{userName}</span>, Seems you dont
              have any task to track! would you like to{" "}
              <Link to="/create">Create</Link> one?
            </p>
          </div>
        )}
      </div>
      <Blocker show={["getting-todo", "setting-todo"].includes(status)}>
        Please Wait...
      </Blocker>
    </div>
  );
}

export default function TodosContainer() {
  const { todos, getTodos, status, setTodo } = useTodosService();
  const { auth } = useAuthService();
  const didMount = useRef<boolean>(false);

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      if (todos.length === 0 && auth.user?.uid) {
        getTodos(auth.user.uid);
      }
    }
  }, [auth.user, getTodos, todos]);
  return (
    <TodosView
      todos={todos}
      status={status}
      userName={auth.user?.userName || ""}
      saveTodo={setTodo}
    />
  );
}
