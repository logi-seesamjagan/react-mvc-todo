import { IAuthService } from "../types";
import { useXAuthService } from "./AuthService_mobx";
import { useReduxAuthService } from "./AuthService_redux";

export const useAuthService: IAuthService =
  process.env.REACT_APP_STORE === "mobx"
    ? useXAuthService
    : useReduxAuthService;
