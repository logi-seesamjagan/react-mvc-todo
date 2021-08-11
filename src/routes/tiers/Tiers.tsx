import "./Tiers.css";
import { IAuthStore } from "../../types";
import { useAuthService } from "../../utils";
import { NavLink as Link, useParams } from "react-router-dom";

export function TiersView({
  tier = "free",
}: {
  auth: IAuthStore;
  tier?: string;
}) {
  return (
    <div className="Page Tiers">
      <header>
        <h2>Tiers - {tier}</h2>
      </header>
      <section>
        Details like cost, services, features about <strong>"{tier}"</strong>{" "}
        plan will go here.
      </section>
      {tier === "free" && (
        <section>
          Wish to <Link to={`/upgrade/gold`}>upgrade to gold</Link> tier?
        </section>
      )}
      {tier !== "free" && (
        <section>
          Wish to <Link to={`/upgrade/${tier}`}>upgrade to {tier}</Link> tier?
        </section>
      )}
      <section>
        <nav className="Nav">
          <Link to="/tiers/free">Free</Link>
          <Link to="/tiers/gold">Gold</Link>
          <Link to="/tiers/platinum">Platinum</Link>
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