import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiLogin, apiLogout } from "../../ajax";
import mockService from "../../ajax/__mock/mock-service";
import { AuthActions } from "../../store/actions";
import { AuthStore, FSA, AppStore, User } from "../../types";

//--------------------------------------
// service/controller hook for Auth
//--------------------------------------

export function useAuthService() {
  const auth = useSelector<AppStore, AuthStore>((state) => state.auth);
  const dispatch = useDispatch();

  const loggingIn = useCallback(() => {
    dispatch({ type: AuthActions.LOGGING_IN });
  }, [dispatch]);

  const loggingOut = useCallback(() => {
    dispatch({ type: AuthActions.LOGGING_OUT });
  }, [dispatch]);

  const loggedIn = useCallback(
    (user: User) => {
      const action: FSA<User> = {
        type: AuthActions.LOGGED_IN,
        payload: user,
      };
      dispatch(action);
    },
    [dispatch]
  );

  const loggedOut = useCallback(
    (user: User) => {
      const action: FSA<User> = {
        type: AuthActions.LOGGED_OUT,
        payload: user,
      };
      dispatch(action);
      return true;
    },
    [dispatch]
  );

  const authError = useCallback(
    (message: string) => {
      const action: FSA<string> = {
        type: AuthActions.AUTH_ERROR,
        payload: message,
      };
      dispatch(action);
    },
    [dispatch]
  );

  const logIn = useCallback(
    (user: User): Promise<User> => {
      loggingIn();
      return apiLogin(user)
        .then((user) => {
          loggedIn(user);
          return user;
        })
        .catch((error) => {
          authError(error.message);
          throw error;
        });
    },
    [loggingIn, loggedIn, authError]
  );

  const logOut = useCallback(
    (user: User): Promise<true> => {
      loggingOut();
      return apiLogout(user)
        .then(() => loggedOut(user) as true)
        .catch((error) => {
          authError(error.message);
          throw error;
        });
    },
    [loggingOut, loggedOut, authError]
  );

  const register = useCallback(
    (user: User): Promise<User> => {
      dispatch({ type: AuthActions.REGISTERING });
      return mockService
        .register(user)
        .then((u) => {
          dispatch({ type: AuthActions.REGISTERING_SUCCESS });
          return u;
        })
        .catch((e) => {
          dispatch({
            type: AuthActions.REGISTERING_FAILED,
            payload: e.message,
          });
          throw e;
        });
    },
    [dispatch]
  );

  return { auth, logIn, logOut, register };
}
