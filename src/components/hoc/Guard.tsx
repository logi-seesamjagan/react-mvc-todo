import { Redirect } from "react-router-dom";
import { useAuthService } from "../../utils";

export function withGuard<CompPropType = any>(Comp: any) {
  function WithGuard(props: CompPropType) {
    const { auth } = useAuthService();

    if (auth.status !== "logged-in") {
      return <Redirect to="/login" push />;
    }

    return <Comp {...props} />;
  }
  return WithGuard;
}
