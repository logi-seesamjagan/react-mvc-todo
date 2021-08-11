import "./Home.css";
import { Link } from "react-router-dom";
import { IAuthStore } from "../../types";
import { useAuthService } from "../../utils";

const TechStack = [
  "HTML",
  "CSS",
  "Javascript",
  "ReactJS",
  "React-Router-Dom",
  "Typescript",
];
if (process.env.REACT_APP_STORE === "redux") {
  TechStack.push("Redux", "React-Redux");
} else {
  TechStack.push("MobX");
}

export function HomeView({ auth }: { auth: IAuthStore }) {
  return (
    <div className="Page Home">
      <header>
        <h2>
          <span>📒</span>ToDo
        </h2>
      </header>
      {auth.status === "logged-in" && (
        <section>
          Hello <strong>{auth.user?.userName}</strong>. Now you can
          <Link to="/create">Create</Link>or<Link to="/todos">View</Link>your
          Todos!
        </section>
      )}
      <section>
        Anyone can visit this page.
        <cite> No Auth Required!</cite>
      </section>
      <section>
        <header>
          <h3>Tech Stack</h3>
        </header>
        <div className="Techs">
          {TechStack.map((tech) => (
            <span key={tech} className="Tech">
              {tech}
            </span>
          ))}
        </div>
      </section>
      {auth.status !== "logged-in" && (
        <>
          <section>
            To access other pages, you need to
            <Link className="LoginLink" to="/login">
              Login.
            </Link>
            If you don't have an account? Then
            <Link to="/register">Register</Link>one!
          </section>
        </>
      )}
    </div>
  );
}

export default function HomeContainer() {
  const { auth } = useAuthService();

  return <HomeView auth={auth} />;
}
