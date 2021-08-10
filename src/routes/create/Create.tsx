import { FormEvent, useReducer } from "react";
import { Blocker } from "../../components";
import { NewTodo, Todo, TodoStatus, TodoStoreStatus } from "../../types";
import { FormAction, formReducer, useAuthService, useTodosService } from "../../utils";

import "./Create.css";

type CreateViewProps = {
  addTodo: (todo: NewTodo) => Promise<Todo | null>;
  uid: string;
  status: TodoStoreStatus;
};

type CreateViewForm = {
  task: string;
  status: TodoStatus;
};

const createViewInitialState: CreateViewForm = {
  task: "",
  status: "open",
};

const initCreateViewState = (): CreateViewForm => {
  return { ...createViewInitialState };
};

function createViewReducer(
  state: CreateViewForm,
  action: FormAction | { type: "reset" }
): CreateViewForm {
  if (action.type === "reset") {
    return initCreateViewState();
  }
  return formReducer(state, action as FormAction);
}

export function CreateView(props: CreateViewProps) {
  const { status, addTodo, uid } = props;
  const [state, dispatch] = useReducer<
    typeof createViewReducer,
    CreateViewForm
  >(createViewReducer, initCreateViewState(), initCreateViewState);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTodo({ uid, text: state.task, status: state.status });
    dispatch({ type: "reset" });
  };

  return (
    <div className="Page CreatePage">
      <header className="PageHeader">
        <h1 className="PageTitle">Create</h1>
      </header>
      <div className="PageContent">
        <form className="Form" onSubmit={handleSubmit}>
          <header className="FormHeader">
            <h3 className="FormHeaderTitle">New Task</h3>
          </header>
          <div className="FormItem">
            <label className="FormItemLabel">Task</label>
            <input
              className="FormItemInput"
              type="text"
              id="task"
              value={state.task}
              onChange={dispatch}
            />
            <div className="FormItemInfo"></div>
          </div>
          <div className="FormItem">
            <label className="FormItemLabel">Status</label>
            <select
              className="FormItemInput"
              id="status"
              value={state.status}
              onChange={dispatch}
            >
              <option>open</option>
              <option>done</option>
              <option>wip</option>
            </select>
            <div className="FormItemInfo"></div>
          </div>
          <footer className="FormFooter">
            <button>Add</button>
          </footer>
        </form>
        <Blocker show={status === "adding-todo"}>Please Wait...</Blocker>
      </div>
    </div>
  );
}

export default function CreateContainer() {
  const { auth } = useAuthService();
  const { addTodo, status } = useTodosService();

  return (
    <CreateView status={status} addTodo={addTodo} uid={auth.user?.uid || ""} />
  );
}
