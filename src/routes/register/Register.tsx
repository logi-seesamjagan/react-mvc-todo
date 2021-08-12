import { ChangeEvent, useEffect } from "react";
import { useState } from "react";
import { useCallback } from "react";
import { useHistory, Link } from "react-router-dom";
import { Blocker, Form, FormFooter, FormItem } from "../../components";
import { AuthStoreStatus, RegisterUser, User } from "../../types";
import { useAuthService } from "../../utils";
import "./Register.css";

const MIN_LENGTH_USERNAME = 5;

const TierInfos: any = {
  free: "Can manage upto 5 task at a time",
  gold: "Can manage 500 task. Free 500 MiB Cloud storage",
  platinum: "Can manage unlimited task. Free Unlimited Cloud storage",
};

export function RegisterView({
  registerUser,
  authStatus,
}: {
  registerUser: (user: RegisterUser) => Promise<User | string>;
  authStatus: AuthStoreStatus;
}) {
  const [userName, setUserName] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [tierInfo, setTierInfo] = useState(TierInfos.free);
  const [tier, setTier] = useState("free");

  const handleTierChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const t = e.target.value;
    setTier(t);
    setTierInfo(TierInfos[t]);
  };

  const handleUserNameChange = useCallback((e) => {
    setUserName(e.target.value);
    setUserNameError("");
  }, []);

  const handleFormSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (userName.trim().length >= MIN_LENGTH_USERNAME) {
        registerUser({ userName, tier }).then((userOrErrorMessage) => {
          typeof userOrErrorMessage === "string" && alert(userOrErrorMessage);
        });
      } else {
        setUserNameError(
          /^[a-z0-9_]+$/gi.test(userName)
            ? "Username should have minimun 5 characters"
            : "Only Alpha numeric and underscore is allowed"
        );
      }
    },
    [userName, registerUser, tier]
  );

  return (
    <div className="Page Register">
      <Form title="Register" onSubmit={handleFormSubmit}>
        <FormItem
          title="Username"
          htmlFor="userName"
          error={userNameError}
          info={`Should containg minimum of ${MIN_LENGTH_USERNAME} characters and can contain only alpha numeric & underscore`}
        >
          <input
            id="userName"
            type="text"
            value={userName}
            onChange={handleUserNameChange}
            autoFocus
          />
        </FormItem>
        <FormItem title="Tier" htmlFor="tier" info={tierInfo}>
          <select id="tier" onChange={handleTierChange} value={tier}>
            <option value="free">Free</option>
            <option value="gold">Gold</option>
            <option value="platinum">Platinum</option>
          </select>
        </FormItem>
        <FormFooter>
          <button className="btn Register">Register</button>
        </FormFooter>
        <FormFooter>
          <p>
            Already Have an Account? <Link to="/login">Login</Link>
          </p>
        </FormFooter>
      </Form>
      <Blocker show={authStatus === "registering"}>
        <p>Please Wait...</p>
      </Blocker>
    </div>
  );
}

export default function RegisterContainer() {
  const { register, auth, reset } = useAuthService();

  const history = useHistory();

  useEffect(() => {
    if (auth.status === AuthStoreStatus.REGISTERING_SUCCESS) {
      reset();
      history.push("/login");
    } else if (auth.status === AuthStoreStatus.LOGGED_IN) {
      history.push("/"); // goto home page if user is alredy logged in
    }
  }, [auth.status, history, reset]);

  return <RegisterView registerUser={register} authStatus={auth.status} />;
}
