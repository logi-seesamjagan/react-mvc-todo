import { Route, Switch } from "react-router-dom";
import { Create, Home, Login, Todos, Register, Tiers } from "../../routes";

export function AppBody() {
  return (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/todos">
        <Todos />
      </Route>
      <Route path="/create">
        <Create />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/tiers/:tier">
        <Tiers />
      </Route>
      <Route>
        <div className="Page Page-404">
          <span className="Icon">😒</span>
          <h1>Page Not found</h1>
          <span className="MissingRoute">{window.location.pathname}</span>
        </div>
      </Route>
    </Switch>
  );
}
