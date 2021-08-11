import { Redirect, useLocation } from "react-router-dom";
import { useAuthService } from "../../utils";

export function withGuard<CompPropType = any>(Comp: any) {
  function WithGuard(props: CompPropType) {
    const { auth } = useAuthService();
    const location = useLocation();

    if (auth.status !== "logged-in") {
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
