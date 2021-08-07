import "./App.css";
import React from "react";
import Buscar from "./components/Buscar";
import imagen from "./assets/pokeapi.png";

function App() {
  return (
    <div className="app">
      <img className="my-4" alt="Poke api" src={imagen} />
      <h1 className="mb-4 text-white">Busca tu pokemon favorito</h1>
      <Buscar />
    </div>
  );
}

export default App;
