import { combineReducers, createStore, Store } from "redux";
import { AppStore } from "../../types";
import { authReducer, todosReducer } from "./reducers";

const rootReducer = combineReducers<AppStore>({
  auth: authReducer,
  todoStore: todosReducer,
});

const store: Store<AppStore> = createStore(rootReducer);

export default store;
