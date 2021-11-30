import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import PokeContext from "./context/PokeContext";

ReactDOM.render(
  <PokeContext>
    <App />
  </PokeContext>,
  document.getElementById("root")
);
