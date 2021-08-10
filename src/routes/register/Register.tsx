import { useEffect } from "react";
import { useState } from "react";
import { useCallback } from "react";
import { useHistory, Link } from "react-router-dom";
import { Blocker } from "../../components";
import { AuthStoreStatus, User } from "../../types";
import { useAuthService } from "../../utils";
import "./Register.css";

const MIN_LENGTH_USERNAME = 5;

export function RegisterView({
  registerUser,
  authStatus,
}: {
  registerUser: (user: User) => Promise<User | string>;
  authStatus: AuthStoreStatus;
}) {
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
        registerUser({ userName }).then((userOrErrorMessage) => {
          typeof userOrErrorMessage === "string" && alert(userOrErrorMessage);
        });
      } else {
        setUserNameError("Username is required");
      }
    },
    [userName, registerUser]
  );

  return (
    <div className="Page Register">
      <form className="Form" onSubmit={handleFormSubmit}>
        <header className="FormHeader">Register</header>
        <div className="FormItem">
          <label>Username</label>
          <input
            type="text"
            value={userName}
            onChange={handleUserNameChange}
            autoFocus
          />
          <cite className="Warning">{userNameError}</cite>
        </div>
        <footer className="FormFooter">
          <button className="btn Register">Register</button>
        </footer>
        <footer className="FormFooter">
          Already Have an Account?&nbsp;<Link to="/login"> Login</Link>
        </footer>
      </form>
      <Blocker show={authStatus === "registering"}>
        <p>Please Wait...</p>
      </Blocker>
    </div>
  );
}

export default function RegisterContainer() {
  const { register, auth } = useAuthService();

  const history = useHistory();

  useEffect(() => {
    if (auth.status === "registering-success") {
      history.push("/login");
    } else if (auth.status === "logged-in") {
      history.push("/"); // goto home page if user is alredy logged in
    }
  }, [auth.status, history]);

  return (
    <RegisterView
      registerUser={register}
      authStatus={auth.status}
    />
  );
}
