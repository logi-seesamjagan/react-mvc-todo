import { useEffect } from "react";
import { useState } from "react";
import { useCallback } from "react";
import { Link, useHistory } from "react-router-dom";
import { Blocker } from "../../components";
import { User } from "../../types";
import { useAuthService } from "../../utils";
import "./Login.css";

type LoginViewPropType = {
  logIn: (user: User) => Promise<User | string>;
  authStatus: string;
};

const MIN_LENGTH_USERNAME = 5;

export function LoginView({ logIn, authStatus }: LoginViewPropType) {
  const [userName, setUserName] = useState("");
  const [userNameError, setUserNameError] = useState("");

  const handleUserNameChange = useCallback((e) => {
    setUserName(e.target.value);
    setUserNameError("");
  }, []);

  const handleFormSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (userName.trim().length >= MIN_LENGTH_USERNAME) {
        logIn({ userName }).then((userOrErrorMessage) => {
          typeof userOrErrorMessage === "string" && alert(userOrErrorMessage);
        });
      } else {
        setUserNameError("Username is required");
      }
    },
    [userName, logIn]
  );

  return (
    <div className="Page Login">
      <form className="Form LoginForm" onSubmit={handleFormSubmit}>
        <header className="FormHeader">Login</header>
        <div className="FormItem">
          <label>Username</label>
          <input
            className="FormItemInput"
            type="text"
            value={userName}
            onChange={handleUserNameChange}
            autoFocus
          />
          <cite className="FormItemWarning">{userNameError}</cite>
        </div>
        <footer className="FormFooter">
          <button className="btn Login">Login</button>
        </footer>
        <footer className="FormFooter">
          Need an Account?&nbsp;<Link to="/register">Create </Link>&nbsp;one.
        </footer>
      </form>
      <Blocker show={authStatus === "logging-in"}>
        <p>Please Wait...</p>
      </Blocker>
    </div>
  );
}

export default function LoginContainer() {
  const { logIn, auth } = useAuthService();

  const history = useHistory();

  useEffect(() => {
    if (auth.status === "logged-in") {
      history.length > 0 ? history.goBack() : history.push("/");
    }
  }, [auth, auth.status, history]);

  return (
    <LoginView
      logIn={logIn}
      authStatus={auth.status}
    />
  );
}
