import { BrowserRouter } from "react-router-dom";
import { AppBody } from "./app-body/AppBody";
import { AppFooter } from "./app-footer/AppFooter";
import { AppHeader } from "./app-header/AppHeader";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppHeader />
        <AppBody />
        <AppFooter />
      </BrowserRouter>
    </div>
  );
}

export default App;
