import { autorun } from "mobx";
import { useEffect, useState } from "react";
import { useXStore } from "../../store";

//--------------------------------------
// service/controller hook for Auth
//--------------------------------------

function useXAuthService() {
  const { authStore } = useXStore();

  const [auth, setAuth] = useState({ ...authStore });

  const logIn = authStore.logIn;

  const logOut = authStore.logOut;

  const register = authStore.register;

  const reset = authStore.reset;

  useEffect(() => {
    return autorun(() => {
      setAuth({ ...authStore });
    });
  }, [authStore]);

  return { auth, logIn, logOut, register, reset };
}

export { useXAuthService };
