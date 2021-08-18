import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import React from "react";
import Todos from "./components/Todos.jsx";
import NavBar from "./components/NavBar.jsx";
import Detalles from "./components/Detalles.jsx";

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/">
          <Todos />
        </Route>
        <Route path="/detalles/:name?">
          <Detalles />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
