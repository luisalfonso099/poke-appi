import React from "react";

const Pokeinfo = ({ pokemon }) => {
  const poke = pokemon;

  return (
    <div className="p-5 mb-5 card  border border-danger ">
      <div className="row g-0">
        <div className="col-md-6 d-flex justify-content-center ">
          <img
            alt={poke.name}
            className="img-fluid rounded-center"
            src={poke.imagen1}
          />
        </div>
        <div className="col-md-6 text-center">
          <div className="card-body">
            <h1 className="card-title text-danger">
              {poke.name} #{poke.id}
            </h1>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <b>Abilidad :</b> {poke.abilidad}
            </li>
            <li className="list-group-item">
              <b>Tipo :</b> {poke.tipo}
            </li>
            <li className="list-group-item">
              <b>HP :</b> {poke.hp}
            </li>
            <li className="list-group-item">
              <b>Ataque :</b> {poke.ataque}
            </li>
            <li className="list-group-item">
              <b>Defensa :</b> {poke.defensa}
            </li>
            <li className="list-group-item">
              <b>Especial :</b> {poke.especial}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Pokeinfo;
