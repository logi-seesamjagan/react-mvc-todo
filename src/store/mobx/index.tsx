import authStore from "./AuthStore";
import todoStore from "./TodoStore";
import productStore from "./ProductStore";

function useXStore() {
  return { authStore, todoStore, productStore };
}

export { useXStore };
