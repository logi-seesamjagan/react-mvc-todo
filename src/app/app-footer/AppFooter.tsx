import { NavLink as Link } from "react-router-dom";

export function AppFooter() {
  return (
    <nav className="NavBar">
      <Link className="Link" to="/" exact>
        <span className="Icon">🏠</span>Home
      </Link>
      <Link className="Link" to="/todos">
        <span className="Icon">🗂</span>Todos
      </Link>
      <Link className="Link" to="/create">
        <span className="Icon">✍🏽</span>Create
      </Link>
    </nav>
  );
}
