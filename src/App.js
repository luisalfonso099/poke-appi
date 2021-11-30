import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Todos from "./components/Todos.jsx";
import NavBar from "./components/NavBar.jsx";
import Detalles from "./components/Detalles.jsx";
import BuscarTipos from "./components/BuscarTipos.jsx";

import "./style.css";
function App() {
  return (
    <div className="bg-light text-center">
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/">
            <Todos />
          </Route>
          <Route path="/detalles/:name?">
            <Detalles />
          </Route>
          <Route path="/tipos">
            <BuscarTipos />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
