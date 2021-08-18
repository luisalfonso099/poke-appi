import React, {useEffect, useState} from "react";
import { useParams,Link, useHistory } from 'react-router-dom';


const Detalles = () => {
  const [pokemon, setPokemon] = useState(null)
  const [cargando, setCargando] = useState(true)
  const {name} = useParams();
  const history = useHistory()
  const getPokemon = async()=>{
    const get = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    const data = await get.json() 
    setPokemon([data])
    setCargando(false)
  }

  useEffect(()=>{
      getPokemon()
  },[])
  console.log(pokemon)

  const volver = (e)=>{
    e.preventDefault();
   history.goBack();
  }

  return (
    <div className="text-center ">
      {
        cargando ? (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ): (
        pokemon.map(poke => 
          { 
            return (
        <div className="card mt-3 p-4" >
        <div className="row d-flex justify-content-center align-items-center g-0">
          <div className="col-md-7">
            <img src={poke.sprites.other.dream_world.front_default} style={{height: "600px"}}  className="img-fluid  rounded-start" alt="..."/>
          </div>
          <div className="col-md-5 mt-2">
            <div className="card-body">
              <h1 className="card-title">{poke.name} </h1>
              <h4>Nro: {poke.id}</h4>
              <p className="card-text">Habilidades :  {poke.abilities[0].ability.name}</p>
              <p className="card-text">Tipo:  {poke.types[0].type.name}</p>
              <p className="card-text">HP: 
              <div className="progress">
                  <div className="progress-bar bg-success" role="progressbar" style={{width:`${poke.stats[0].base_stat}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
               </div>
               </p>
              <p className="card-text">Artque:
              <div className="progress">
                  <div className="progress-bar bg-danger" role="progressbar" style={{width:`${poke.stats[1].base_stat}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
               </div>
               </p>
              <p className="card-text">Defensa: 
              <div className="progress">
                  <div className="progress-bar bg-warning" role="progressbar" style={{width:`${poke.stats[2].base_stat}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
               </div>
               </p>
              <p className="card-text">Especial: 
              <div className="progress">
                  <div className="progress-bar bg-primary" role="progressbar" style={{width:`${poke.stats[3].base_stat}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
               </div>
               </p>
           <button onClick={volver} className="btn btn-dark">Volver al Listado</button>
            </div>
          </div>
        </div>
      </div>
      )}))}
    </div>
  );
};

export default Detalles;
