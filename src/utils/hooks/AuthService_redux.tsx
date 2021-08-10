import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiLogin, apiLogout, apiRegister } from "../../ajax";
import { AuthStoreStatus, FSA, IAppStore, IAuthStore, User } from "../../types";

//--------------------------------------
// service/controller hook for Auth
//--------------------------------------

function useReduxAuthService() {
  const auth = useSelector<IAppStore, IAuthStore>((state) => state.authStore);
  const dispatch = useDispatch();

  const logIn = useCallback(
    async (user: User): Promise<User | string> => {
      dispatch({ type: AuthStoreStatus.LOGGING_IN });
      return apiLogin(user)
        .then((user) => {
          const action: FSA<User> = {
            type: AuthStoreStatus.LOGGED_IN,
            payload: user,
          };
          dispatch(action);
          return user;
        })
        .catch((error) => {
          const action: FSA<string> = {
            type: AuthStoreStatus.AUTH_ERROR,
            payload: error.message,
          };
          dispatch(action);
          return error.message;
        });
    },
    [dispatch]
  );

  const logOut = useCallback(
    (user: User): Promise<boolean> => {
      dispatch({ type: AuthStoreStatus.LOGGING_OUT });
      return apiLogout(user)
        .then(() => {
          const action: FSA<User> = {
            type: AuthStoreStatus.LOGGED_OUT,
            payload: user,
          };
          dispatch(action);
          return true;
        })
        .catch((error) => {
          const action: FSA<string> = {
            type: AuthStoreStatus.AUTH_ERROR,
            payload: error.message,
          };
          dispatch(action);
          return false;
        });
    },
    [dispatch]
  );

  const register = useCallback(
    (user: User): Promise<User | string> => {
      dispatch({ type: AuthStoreStatus.REGISTERING });
      return apiRegister(user)
        .then((u) => {
          dispatch({ type: AuthStoreStatus.REGISTERING_SUCCESS });
          return u;
        })
        .catch((e) => {
          dispatch({
            type: AuthStoreStatus.REGISTERING_FAILED,
            payload: e.message,
          });
          return e.message;
        });
    },
    [dispatch]
  );

  return { auth, logIn, logOut, register };
}

export { useReduxAuthService };
