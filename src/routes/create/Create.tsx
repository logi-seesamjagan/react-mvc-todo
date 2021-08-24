import { useEffect } from "react";
import { FormEvent, useReducer } from "react";
import { Blocker, Form, FormFooter, FormItem } from "../../components";
import {
  NewTodo,
  ProductStoreStatus,
  Tier,
  Todo,
  TodoStatus,
  TodoStoreStatus,
} from "../../types";
import { FormAction, formReducer } from "../../utils";
import {
  useAuthService,
  useProductService,
  useTodosService,
} from "./../../services";

import "./Create.scss";

type CreateViewProps = {
  addTodo: (todo: NewTodo) => Promise<Todo | null>;
  uid: string;
  userName: string;
  status: TodoStoreStatus;
  totalTodos: number;
  userTier: Tier;
};

type CreateViewForm = {
  task: string;
  status: TodoStatus;
};

const createViewInitialState: CreateViewForm = {
  task: "",
  status: TodoStatus.OPEN,
};

const initCreateViewState = (): CreateViewForm => {
  return { ...createViewInitialState };
};

function createViewFormReducer(
  state: CreateViewForm,
  action: FormAction | { type: "reset" }
): CreateViewForm {
  if (action.type === "reset") {
    return initCreateViewState();
  }
  return formReducer(state, action as FormAction);
}

export function CreateView(props: CreateViewProps) {
  const { status, addTodo, uid, userTier, totalTodos, userName } = props;
  const [state, dispatch] = useReducer<
    typeof createViewFormReducer,
    CreateViewForm
  >(createViewFormReducer, initCreateViewState(), initCreateViewState);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTodo({ uid, text: state.task, status: state.status });
    dispatch({ type: "reset" });
  };

  const getTaskBucketInfo = () => {
    const { taskBucket, name } = userTier;
    if (taskBucket < 0) {
      return null;
    } else if (taskBucket - totalTodos === 0) {
      return (
        <div className="TaskBucketInfo Danger">
          You have reached your <strong>{name}</strong> tier limit (
          <strong>{taskBucket}</strong> task!)
        </div>
      );
    } else {
      return (
        <div className="TaskBucketInfo Info">
          Hi <strong>{userName}</strong>, you can manage{" "}
          <strong>{userTier.taskBucket - totalTodos}</strong> more task!
        </div>
      );
    }
  };

  return (
    <div className="Page CreatePage">
      <header className="PageHeader">
        <h1 className="PageTitle">
          Create <i>({userTier.name} Tier)</i>
        </h1>
      </header>
      <div className="PageContent">
        {getTaskBucketInfo()}
        <Form onSubmit={handleSubmit} title="New Task">
          <FormItem title="Task" htmlFor="task">
            <input
              className="FormItemInput"
              type="text"
              id="task"
              value={state.task}
              onChange={dispatch}
            />
          </FormItem>
          <FormItem title="Status" htmlFor="status">
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
          </FormItem>
          <FormFooter>
            <button
              disabled={
                totalTodos >= userTier.taskBucket && userTier.taskBucket > 0
              }
            >
              Add
            </button>
          </FormFooter>
        </Form>
        <Blocker show={status === "adding-todo"}>Please Wait...</Blocker>
      </div>
    </div>
  );
}

export default function CreateContainer() {
  const { auth } = useAuthService();
  const { addTodo, status, todos } = useTodosService();
  const {
    productStore: { tiers, status: tierStatus, message: tierStatusMessage },
    getTiers,
  } = useProductService();

  useEffect(() => {
    if (!tiers) {
      getTiers();
    }
  }, [tiers, getTiers]);

  if (!auth.user) {
    return null;
  }

  if (ProductStoreStatus.LOADING_TIERS_FAILED === tierStatus) {
    return <div className="Page">{tierStatusMessage}</div>;
  } else if (ProductStoreStatus.LOADING_TIERS === tierStatus) {
    return <div className="Page">Initilizing...</div>;
  } else if (!tiers) {
    return null;
  }

  return (
    <CreateView
      status={status}
      addTodo={addTodo}
      uid={auth.user.uid || ""}
      totalTodos={todos.length}
      userTier={tiers[auth.user.tier]}
      userName={auth.user.userName}
    />
  );
}
