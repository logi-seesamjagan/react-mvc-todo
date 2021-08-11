import { User, IAuthStore, AuthStoreStatus, LoginUser } from "../../types";
import { makeAutoObservable } from "mobx";
import { apiLogin, apiLogout, apiRegister } from "../../ajax";

class AuthStore implements IAuthStore {
  user: User | null = null;
  status: AuthStoreStatus = AuthStoreStatus.IDLE;
  message: string = "";

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async logIn(user: LoginUser): Promise<User | string> {
    this.status = AuthStoreStatus.LOGGING_IN;
    return apiLogin(user)
      .then((user) => {
        this.status = AuthStoreStatus.LOGGED_IN;
        this.user = user;
        this.message = "";
        return user;
      })
      .catch((error) => {
        this.status = AuthStoreStatus.AUTH_ERROR;
        this.message = error.message;
        return error.message;
      });
  }

  async logOut(user: User): Promise<boolean> {
    this.status = AuthStoreStatus.LOGGING_OUT;
    return apiLogout(user)
      .then((isLoggedOut) => {
        this.status = isLoggedOut ? AuthStoreStatus.LOGGED_OUT : AuthStoreStatus.AUTH_ERROR;
        this.user = null; // TODO what to do in case of false?
        this.message = isLoggedOut ? "" : "Failed to logout!";
        return true;
      })
      .catch((error) => {
        this.status = AuthStoreStatus.AUTH_ERROR;
        this.message = error.message;
        return false;
      });
  }

  async register(user: User): Promise<User | string> {
    this.status = AuthStoreStatus.REGISTERING;
    return apiRegister(user)
      .then((u) => {
        this.status = AuthStoreStatus.REGISTERING_SUCCESS;
        return u;
      })
      .catch((e) => {
        this.status = AuthStoreStatus.REGISTERING_FAILED;
        this.message = e.message;
        return e.message;
      });
  }

  reset() {
    this.status = AuthStoreStatus.IDLE;
    this.user = null;
    this.message = "";
  }
}

export default new AuthStore();
