import { AuthStoreStatus } from "../../types";

export class AuthActions {
  static LOGGED_IN:AuthStoreStatus = "logged-in";
  static LOGGED_OUT:AuthStoreStatus = "logged-out";
  static LOGGING_IN:AuthStoreStatus = "logging-in";
  static LOGGING_OUT:AuthStoreStatus = "logging-out";
  static IDLE:AuthStoreStatus = "idle";
  static AUTH_ERROR:AuthStoreStatus = "auth-error";
  static REGISTERING:AuthStoreStatus = "registering";
  static REGISTERING_SUCCESS:AuthStoreStatus = "registering-success"
  static REGISTERING_FAILED:AuthStoreStatus = "registering-failed"
}
