import { useCallback } from "react";
import { Blocker } from "../../components";
import { useAuthService } from "../../services";

function AutoInfo() {
  const { auth, logOut } = useAuthService();

  const { user, status } = auth;

  const handleLogoutClick = useCallback(async () => {
    if (user) {
      // console.log("::DEMO::Before")
      const result = await logOut(user);
      if(result) {
        // clean up
      } else {
        // alert user
      }
      // console.log("::DEMO::After")
    }
  }, [user, logOut]);

  if (!user) return null;

  return (
    <div className="AppAuthInfo">
      <span className="UserName">{user.userName}</span>
      <span
        className="Logout Icon"
        role="button"
        aria-label="Logout"
        title="Logout"
        onClick={handleLogoutClick}
      >
        🪟
      </span>
      <Blocker show={status === "logging-out"}>Wait...</Blocker>
    </div>
  );
}

export function AppHeader() {
  return (
    <header className="AppHeader">
      <h2 className="AppTitle">
        <span className="Icon">📒</span>MVC-In-ToDo [
        {process.env.REACT_APP_STORE}]
      </h2>
      <AutoInfo />
    </header>
  );
}
