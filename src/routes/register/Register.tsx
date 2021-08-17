import { ChangeEvent, useEffect } from "react";
import { useState } from "react";
import { useCallback } from "react";
import { useHistory, Link } from "react-router-dom";
import { Blocker, Form, FormFooter, FormItem } from "../../components";
import {
  AuthStoreStatus,
  RegisterUser,
  Tiers,
  TierType,
  User,
} from "../../types";
import { useAuthService, useProductService } from "../../services";
import "./Register.css";

const MIN_LENGTH_USERNAME = 5;

export function RegisterView({
  registerUser,
  authStatus,
  tiers,
  tierStatusMessage,
}: {
  registerUser: (user: RegisterUser) => Promise<User | string>;
  authStatus: AuthStoreStatus;
  tiers: Tiers | null;
  tierStatusMessage: string | null;
}) {
  const [userName, setUserName] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [tier, setTier] = useState<TierType>("free");
  const [tierInfo, setTierInfo] = useState(tiers ? tiers[tier].info : null);

  const handleTierChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const t = e.target.value as TierType;
    setTier(t);
    tiers && setTierInfo(tiers[t].info);
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

  useEffect(() => {
    if (tiers) {
      setTierInfo(tiers[tier].info);
    }
  }, [tiers, tier]);

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
        <FormItem
          title="Tier"
          htmlFor="tier"
          info={tierInfo}
          error={tierStatusMessage}
        >
          <select
            id="tier"
            onChange={handleTierChange}
            value={tier}
            disabled={!tiers}
          >
            {tiers &&
              Object.keys(tiers).map((t) => (
                <option key={t} value={t}>
                  {tiers[t].name}
                </option>
              ))}
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

  const {
    productStore: { tiers, message },
    getTiers,
  } = useProductService();

  const history = useHistory();

  useEffect(() => {
    if (auth.status === AuthStoreStatus.REGISTERING_SUCCESS) {
      reset();
      history.push("/login");
    } else if (auth.status === AuthStoreStatus.LOGGED_IN) {
      history.push("/"); // goto home page if user is alredy logged in
    }
  }, [auth.status, history, reset]);

  useEffect(() => {
    if (!tiers) {
      getTiers();
    }
  }, [tiers, getTiers]);

  return (
    <RegisterView
      registerUser={register}
      authStatus={auth.status}
      tiers={tiers as any}
      tierStatusMessage={message}
    />
  );
}
