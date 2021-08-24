import "./Tiers.scss";
import { IAuthStore } from "types";
import { useAuthService } from "services";
import { NavLink as Link, useParams } from "react-router-dom";

export function TiersView({
  tier = "free",
}: {
  auth: IAuthStore;
  tier?: string;
}) {
  return (
    <div className="Page Tiers">
      <header className="PageHeader">
        <h1 className="PageTitle">Tiers - {tier}</h1>
      </header>
      <section>
        Details like cost, services, features about <strong>"{tier}"</strong>{" "}
        plan will go here.
      </section>
      {tier === "free" && (
        <section>
          upgrade to <Link to={`/upgrade/gold`}>gold</Link> or{" "}
          <Link to={`/upgrade/platinum`}>platinum</Link> tier to enjoy more
          benifits!
        </section>
      )}
      {tier !== "free" && (
        <section>
          Wish to <Link to={`/upgrade/${tier}`}>upgrade to {tier}</Link> tier?
        </section>
      )}
      <section>
        <nav className="Nav">
          <p>
            Check out our other plans as well
            <Link to="/tiers/free">Free</Link>
            <Link to="/tiers/gold">Gold</Link>
            <Link to="/tiers/platinum">Platinum</Link>
          </p>
        </nav>
      </section>
    </div>
  );
}

export default function TiersContainer() {
  const { auth } = useAuthService();
  const params = useParams<{ tier?: string }>();

  return <TiersView auth={auth} tier={params.tier} />;
}
