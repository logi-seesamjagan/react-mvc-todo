import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiLogin, apiLogout } from "../../ajax";
import mockService from "../../ajax/__mock/mock-service";
import { AuthStore, FSA, AppStore, User, AuthStoreStatus } from "../../types";

//--------------------------------------
// service/controller hook for Auth
//--------------------------------------

export function useAuthService() {
  const auth = useSelector<AppStore, AuthStore>((state) => state.auth);
  const dispatch = useDispatch();

  const logIn = useCallback(
    (user: User): Promise<User> => {
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
          throw error;
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
    (user: User): Promise<User> => {
      dispatch({ type: AuthStoreStatus.REGISTERING });
      return mockService
        .register(user)
        .then((u) => {
          dispatch({ type: AuthStoreStatus.REGISTERING_SUCCESS });
          return u;
        })
        .catch((e) => {
          dispatch({
            type: AuthStoreStatus.REGISTERING_FAILED,
            payload: e.message,
          });
          throw e;
        });
    },
    [dispatch]
  );

  return { auth, logIn, logOut, register };
}
