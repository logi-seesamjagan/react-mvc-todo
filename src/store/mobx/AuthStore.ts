import { User, IAuthStore, AuthStoreStatus } from "../../types";
import { makeAutoObservable } from "mobx";
import { apiLogin, apiLogout, apiRegister } from "../../ajax";

class AuthStore implements IAuthStore {
  user: User | null = null;
  status: AuthStoreStatus = AuthStoreStatus.IDLE;
  message: string = "";

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async logIn(user: User): Promise<User | string> {
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
      .then(() => {
        this.status = AuthStoreStatus.LOGGED_OUT;
        this.user = null;
        this.message = "";
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
}

export default new AuthStore();
