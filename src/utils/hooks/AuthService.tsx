import { useXAuthService } from "./AuthService_mobx";
import { useReduxAuthService } from "./AuthService_redux";

export const useAuthService =
  process.env.REACT_APP_STORE === "mobx"
    ? useXAuthService
    : useReduxAuthService;
