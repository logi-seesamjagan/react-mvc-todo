import { combineReducers, createStore, Store } from "redux";
import { IAppStore } from "types";
import { authReducer, productReducer, todosReducer } from "./reducers";

const rootReducer = combineReducers<IAppStore>({
  authStore: authReducer,
  todoStore: todosReducer,
  productStore: productReducer,
});

const store: Store<IAppStore> = createStore(rootReducer);

export default store;
