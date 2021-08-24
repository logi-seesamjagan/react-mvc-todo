import { useEffect } from "react";
import { useState } from "react";
import { useCallback } from "react";
import { Link, useHistory } from "react-router-dom";
import { Blocker, Form, FormFooter, FormItem } from "../../components";
import { LoginUser, User } from "../../types";
import { useAuthService } from "../../services";
import "./Login.scss";

type LoginViewPropType = {
  logIn: (user: LoginUser) => Promise<User | string>;
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
          if (typeof userOrErrorMessage === "string") {
            alert(userOrErrorMessage);
          } else {
            // success! logged in! init user and app!
          }
        });
      } else {
        setUserNameError("Username is required");
      }
    },
    [userName, logIn]
  );

  return (
    <div className="Page Login">
      <Form onSubmit={handleFormSubmit} title="Login">
        <FormItem title="Username" htmlFor="userName" error={userNameError}>
          <input
            id="userName"
            type="text"
            value={userName}
            onChange={handleUserNameChange}
            autoFocus
          />
        </FormItem>
        <FormFooter>
          <button>Login</button>
        </FormFooter>
        <footer className="FormFooter">
          <p>
            Need an Account? Just&nbsp;<Link to="/register">Create</Link>
            &nbsp;it.
          </p>
        </footer>
      </Form>
      <Blocker show={authStatus === "logging-in"}>
        <p>Please Wait...</p>
      </Blocker>
    </div>
  );
}

export default function LoginContainer() {
  const { logIn, auth } = useAuthService();

  const history = useHistory<{ referrer?: string } | undefined>();

  useEffect(() => {
    if (auth.status === "logged-in") {
      const referrer = history.location.state?.referrer || "/";
      history.push(referrer.indexOf("/login") === 0 ? "/" : referrer);
    }
  }, [auth, auth.status, history]);

  return <LoginView logIn={logIn} authStatus={auth.status} />;
}
