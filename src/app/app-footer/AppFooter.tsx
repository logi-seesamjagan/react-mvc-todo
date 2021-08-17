import { NavLink as Link } from "react-router-dom";

export function AppFooter() {
  return (
    <nav className="NavBar">
      <Link className="Link" to="/" exact>
        <span className="Icon">🏠</span>
        <span>Home</span>
      </Link>
      <Link className="Link" to="/todos">
        <span className="Icon">🗂</span>
        <span>Todos</span>
      </Link>
      <Link className="Link" to="/create">
        <span className="Icon">✍🏽</span>
        <span>Create</span>
      </Link>
      <Link className="Link" to="/settings">
        <span className="Icon">⚙️</span>
        <span>Settings</span>
      </Link>
    </nav>
  );
}
