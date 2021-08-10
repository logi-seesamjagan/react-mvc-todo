import { autorun } from "mobx";
import { useCallback, useEffect, useState } from "react";
import { apiLogin, apiLogout, apiRegister } from "../../ajax";
import { useXStore } from "../../store";
import { AuthStoreStatus, User } from "../../types";

//--------------------------------------
// service/controller hook for Auth
//--------------------------------------

function useXAuthService() {
  const { authStore } = useXStore();

  const [auth, setAuth] = useState({ ...authStore });

  const logIn = useCallback(
    async (user: User): Promise<User | string> => {
      authStore.status = AuthStoreStatus.LOGGING_IN;
      return apiLogin(user)
        .then((user) => {
          authStore.status = AuthStoreStatus.LOGGED_IN;
          authStore.user = user;
          authStore.message = "";
          return user;
        })
        .catch((error) => {
          authStore.status = AuthStoreStatus.AUTH_ERROR;
          authStore.message = error.message;
          return error.message;
        });
    },
    [authStore]
  );

  const logOut = useCallback(
    (user: User): Promise<boolean> => {
      authStore.status = AuthStoreStatus.LOGGING_OUT;
      return apiLogout(user)
        .then(() => {
          authStore.status = AuthStoreStatus.LOGGED_OUT;
          authStore.user = null;
          return true;
        })
        .catch((error) => {
          authStore.status = AuthStoreStatus.AUTH_ERROR;
          authStore.message = error.message;
          return false;
        });
    },
    [authStore]
  );

  const register = useCallback(
    (user: User): Promise<User | string> => {
      authStore.status = AuthStoreStatus.REGISTERING;
      return apiRegister(user)
        .then((u) => {
          authStore.status = AuthStoreStatus.REGISTERING_SUCCESS;
          return u;
        })
        .catch((e) => {
          authStore.status = AuthStoreStatus.REGISTERING_FAILED;
          authStore.message = e.message;
          return e.message;
        });
    },
    [authStore]
  );

  useEffect(() => {
    return autorun(() => {
      setAuth({ ...authStore });
    });
  }, [authStore]);

  return { auth, logIn, logOut, register };
}

export { useXAuthService };
