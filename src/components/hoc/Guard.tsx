import { Redirect, useLocation } from "react-router-dom";
import { AuthStoreStatus } from "../../types";
import { useAuthService } from "../../utils";

export function withGuard<CompPropType = any>(Comp: any) {
  function WithGuard(props: CompPropType) {
    const { auth } = useAuthService();
    const location = useLocation();

    if (
      ![AuthStoreStatus.LOGGED_IN, AuthStoreStatus.LOGGING_OUT].includes(
        auth.status
      )
    ) {
      return (
        <Redirect
          to={{
            pathname: "/login",
            search: location.pathname,
            state: { referrer: location.pathname },
          }}
          push
        />
      );
    }
    return <Comp {...props} />;
  }
  return WithGuard;
}
