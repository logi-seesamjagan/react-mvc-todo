import "./Home.css";
import { Link } from "react-router-dom";
import { AuthStore } from "../../types";
import { useAuthService } from "../../utils";

export function HomeView({ auth }: { auth: AuthStore }) {
  return (
    <div className="Page Home">
      {auth.status === "logged-in" && (
        <blockquote>
          Hello <strong>{auth.user?.userName}</strong>. Please help yourself
        </blockquote>
      )}
      <blockquote>
        This is Home page. anyone can visit this page.
        <em> No Auth Required!</em>
      </blockquote>
      {auth.status !== "logged-in" && (
        <>
          <blockquote>
            To visit other pages, you need to{" "}
            <Link className="LoginLink" to="/login">
              Login
            </Link>
          </blockquote>
          <blockquote>
            Didn't have an account with us? <Link to="/register">Create</Link>{" "}
            one!
          </blockquote>
        </>
      )}
    </div>
  );
}

export default function HomeContainer() {
  const { auth } = useAuthService();

  return <HomeView auth={auth} />;
}
