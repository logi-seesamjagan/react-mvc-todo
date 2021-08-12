import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiLogin, apiLogout, apiRegister } from "../../ajax";
import { AuthStoreStatus, FSA, IAppStore, IAuthStore, LoginUser, User, RegisterUser } from "../../types";

//--------------------------------------
// #region Action Creatore
//--------------------------------------

function actionLoggingIn() {
  return { type: AuthStoreStatus.LOGGING_IN };
}

function actionLoggedIn(user: User) {
  const action: FSA<User> = {
    type: AuthStoreStatus.LOGGED_IN,
    payload: user,
  };
  return action;
}

function actionAuthError(message: string) {
  const action: FSA<string> = {
    type: AuthStoreStatus.AUTH_ERROR,
    payload: message,
  };
  return action;
}

function actionLoggingOut() {
  return { type: AuthStoreStatus.LOGGING_OUT };
}

function actionLoggedOut(user: User): FSA<User> {
  const action: FSA<User> = {
    type: AuthStoreStatus.LOGGED_OUT,
    payload: user,
  };
  return action;
}

function actionRegistering() {
  return { type: AuthStoreStatus.REGISTERING };
}

function actionRegisterationSuccess(user: User) {
  return { type: AuthStoreStatus.REGISTERING_SUCCESS, payload: user };
}

function actionRegisterationFailed(message: string) {
  return {
    type: AuthStoreStatus.REGISTERING_FAILED,
    payload: message,
  };
}
//--------------------------------------
//#endregion
//--------------------------------------

//--------------------------------------
// #region service/middleware hook for Auth
//--------------------------------------

function useReduxAuthService() {
  const auth = useSelector<IAppStore, IAuthStore>((state) => state.authStore);
  const dispatch = useDispatch();

  const logIn = useCallback(
    async (user: LoginUser): Promise<User | string> => {
      dispatch(actionLoggingIn());
      return apiLogin(user)
        .then((user) => {
          dispatch(actionLoggedIn(user));
          return user;
        })
        .catch((error) => {
          dispatch(actionAuthError(error.message));
          return error.message;
        });
    },
    [dispatch]
  );

  const logOut = useCallback(
    async (user: User): Promise<boolean> => {
      dispatch(actionLoggingOut());
      try {
        const isLoggeOout = await apiLogout(user);
        const action = isLoggeOout
          ? actionLoggedOut(user)
          : actionAuthError("Failed to logout");
        dispatch(action);
        return isLoggeOout;
      } catch (error) {
        const action = actionAuthError(error.message);
        dispatch(action);
        return false;
      }
    },
    [dispatch]
  );

  const register = useCallback(
    async (user: RegisterUser): Promise<User | string> => {
      dispatch(actionRegistering());
      return apiRegister(user)
        .then((u) => {
          dispatch(actionRegisterationSuccess(u));
          return u;
        })
        .catch((e) => {
          dispatch(actionRegisterationFailed(e.message));
          return e.message;
        });
    },
    [dispatch]
  );

  const reset = useCallback(() => {
    dispatch({ type: AuthStoreStatus.IDLE });
  }, [dispatch]);

  return { auth, logIn, logOut, register, reset };
}
//--------------------------------------
//#endregion
//--------------------------------------

export { useReduxAuthService };
