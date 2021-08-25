import React, {useEffect, useState} from "react";
import { useParams,Link } from 'react-router-dom';



const Detalles = () => {
  const [pokemon, setPokemon] = useState(null)
  const [cargando, setCargando] = useState(true)
  const {name} = useParams();
  
  useEffect(()=>{
    const getPokemon = async()=>{
      const get = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      const data = await get.json() 
      setPokemon([data])
      setCargando(false)
    }
    getPokemon()},[])

  return (
    <div className="text-center" >
      {
        cargando ? (
        <div className="spinner-border mt-5" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ): (
        pokemon.map(poke => 
          { 
            return (
        <div className="mt-5 p-4" key={poke.id}>
        <div className="row d-flex justify-content-center align-items-center g-0">
          <div className="col-md-5">
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${poke.id}.png`}   className="img-fluid mx-0 rounded-start" alt={poke.name}/>
          </div>
          <div className="col-md-5 mt-2">
            <div className="card-body">
              <h1 className="card-title fst-italic">{poke.name} </h1>
              <h4>Nro: {poke.id}</h4>
              <p className="card-text">Habilidades :  {poke.abilities[0].ability.name}</p>
              <p className="card-text">Tipo:  {poke.types[0].type.name}</p>
              <p className="card-text mb-0">HP: </p>
              <div className="progress">
                  <div className="progress-bar bg-success" role="progressbar" style={{width:`${poke.stats[0].base_stat}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
               </div>
              <p className="card-text mt-4 mb-1">Ataque:</p>
              <div  className="progress">
                  <div className="progress-bar bg-danger" role="progressbar" style={{width:`${poke.stats[1].base_stat}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
               </div>
               <p className="card-text mt-4 mb-1">Defensa: </p>
              <div className="progress">
                  <div className="progress-bar bg-warning" role="progressbar" style={{width:`${poke.stats[2].base_stat}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
               </div>
               <p className="card-text mt-4 mb-1">Especial:</p>
               <div className="progress">
                  <div className="progress-bar bg-primary" role="progressbar" style={{width:`${poke.stats[3].base_stat}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
               </div>
           <Link to='/' className="mt-3 btn btn-dark">Volver al Listado</Link>
            </div>
          </div>
        </div>
      </div>
      )}))}
    </div>
  );
};

export default Detalles;
