import { Route, Switch } from "react-router-dom";
import { Create, Home, Login, Todos, Register } from "../../routes";

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
      <Route>
        <div className="Page Page-404">
          <h1>Page Not found</h1>
        </div>
      </Route>
    </Switch>
  );
}
