import { User, IAuthStore, AuthStoreStatus } from "../../types";
import { makeAutoObservable } from "mobx";

class AuthStore implements IAuthStore {
  user: User | null = null;
  status: AuthStoreStatus = AuthStoreStatus.IDLE;
  message: string = "";

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }
}

export default new AuthStore();