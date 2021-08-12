import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Pokemon from "./Pokeinfo";

const Buscar = () => {
  const [poke, setPoke] = useState([]);
  const [name, setName] = useState(1);
  const [cargando, setCargando] = useState(true);
  useEffect(() => {
    const data = async () => {
      let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      if (res.ok === false) {
        setCargando(true);
      }
      const data = await res.json();
      setPoke({
        id: data.id,
        name: data.name,
        abilidad: data.abilities[0].ability.name,
        tipo: data.types[0].type.name,
        imagen1: data.sprites.other.dream_world.front_default,
        hp: data.stats[0].base_stat,
        ataque: data.stats[1].base_stat,
        defensa: data.stats[2].base_stat,
        especial: data.stats[3].base_stat,
      });

      setCargando(false);
    };
    data();
  }, [name]);

  const buscarPorNombre = (e) => {
    e.preventDefault();
    let form = e.currentTarget;
    const pokeName = form.pokeName.value;
    if (pokeName >= 650) {
      setCargando(true);
    } else {
      setName(Number(pokeName));
    }
    form.reset();
  };

  return (
    <div className="container p-5">
      <div className="mx-4 px-4">
        <form onSubmit={buscarPorNombre} className="input-group ">
          <input
            className="form-control mb-5  border border-dark"
            aria-label="Example text with button addon"
            aria-describedby="button-addon1"
            name="pokeName"
            type="text"
            placeholder="Id o Nombre"
          />
          <button
            className="btn btn-primary mb-5 border border-dark"
            id="button-addon1"
            type="submit"
          >
            Buscar
          </button>
        </form>
      </div>

      {cargando ? (
        <h1>
          Lo siento pokemon No econtrado :( intentalo de nuevo <br /> Tambien
          puedes intentar por ID Tienes 649 diponobles
        </h1>
      ) : (
        <Pokemon pokemon={{ poke, name, setName }} />
      )}
    </div>
  );
};

export default Buscar;
