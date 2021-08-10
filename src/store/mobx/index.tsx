import authStore from "./AuthStore";
import todoStore from "./TodoStore";

function useXStore() {
    return {authStore, todoStore}
}

export {
    useXStore,
}