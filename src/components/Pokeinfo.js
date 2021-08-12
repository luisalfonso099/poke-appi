import React from "react";

const Pokeinfo = ({ pokemon }) => {
  const { poke, name, setName } = pokemon;

  const siguiente = () => {
    setName(name + 1);
  };
  const anterior = () => {
    setName(name - 1);
  };
  return (
    <div>
      {name > 1 ? (
        <div className="d-flex  justify-content-center mb-2">
          <button
            onClick={anterior}
            className="col-1 mx-2 border  border-dark btn btn-primary"
          >
            <i className="fas fa-arrow-left "></i>
          </button>
          <button
            onClick={siguiente}
            className="col-1 border border-dark  btn btn-primary"
          >
            <i className="fas fa-arrow-right"></i>
          </button>
        </div>
      ) : (
        <div className="d-flex  justify-content-center mb-2">
          <button
            onClick={siguiente}
            className="col-4 border text-dark border-dark  btn btn-info"
          >
            <i className="fas fa-arrow-right mx-2"></i>
            Siguiente
          </button>
        </div>
      )}

      <div className="py-4 mb-5 card border border-dark">
        <div className="row g-0">
          <div className="col-md-6 d-flex justify-content-center ">
            <img
              alt={poke.name}
              className="img-fluid rounded-center"
              style={{ height: "400px" }}
              src={poke.imagen1}
            />
          </div>
          <div className="col-md-6 text-center">
            <div className="card-body">
              <h1 className="card-title text-danger">
                {poke.name.toUpperCase()} #{poke.id}
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
    </div>
  );
};

export default Pokeinfo;
