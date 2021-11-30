import React, {useEffect, useState} from "react";
import { useParams } from 'react-router-dom';
import Tipo from "./InfoDetalles/Tipo";
import Evolucion from "./InfoDetalles/Evolucion";
import "./Detalles.css"
import Habilidad from "./InfoDetalles/Habilidad";
import TextoDelPokemon from "./InfoDetalles/TextoDelPokemon";

const Detalles = () => {
  const [pokemon, setPokemon] = useState([])
  const [cargando, setCargando] = useState(true)
  const [porEspecie, setPorEspecie] = useState([])
  const {name} = useParams();
  useEffect(() => {
    const porEspecies = async()=>{
      const resp = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`)
      const data = await resp.json();
      setPorEspecie([data])
    }
    const porDetalles = async()=>{
      const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      const data = await resp.json();
      setPokemon([data])
      setCargando(false)
    }
    porDetalles()
    porEspecies()
  },[name])
 
    const namePokemon = porEspecie.length > 0 && porEspecie[0].names[6].name;
    const color = porEspecie.length > 0 && porEspecie[0].color.name;
    const extraerPeso = pokemon.length > 0 && pokemon[0].weight.toString()
    const peso = extraerPeso.length > 0 && extraerPeso.slice(0, extraerPeso.length -1) + "," + extraerPeso.slice(extraerPeso.length -1,extraerPeso.length )
    const extraerAltura = pokemon.length > 0 && pokemon[0].height.toString()
    const alto = extraerAltura.length > 0 && 
    (extraerAltura.length < 2 ? "0," + extraerAltura : extraerAltura.slice(0, extraerAltura.length -1) + "," + extraerAltura.slice(extraerAltura.length -1,extraerAltura.length ))
    return (
    <div className="container" >
      {
        cargando ? (
        <div className="spinner-border loading" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ): (
        pokemon.map(poke => 
          { 
            return (
        <div className="my-5 targeta p-2 d-flex  row" key={poke.id}>
           <h2 className="nombrePokemon">{namePokemon} #{name} </h2>
          <div className="col-md-5 d-flex flex-column ">
            <img 
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${poke.id}.png`}   
            alt={poke.name}
            className={ `${color.toString()} shadow-lg animate__animated animate__pulse`}
            />
              <div className="text-center stack">
                  HP
                  <div className="progress my-1">
                    <div 
                    className="progress-bar bg-primary"
                    role="progressbar" 
                    style={{"width": `${poke.stats[0].base_stat}%`}} 
                    aria-valuemax="100">
                    <i className="fas fa-heartbeat"></i>  
                    </div>
                  </div>
                  Ataque
                  <div className="progress my-1">
                    <div 
                    className="progress-bar bg-danger" 
                    role="progressbar" 
                    style={{"width": `${poke.stats[1].base_stat}%`}} 
                    aria-valuemax="100">
                     <i className="fas fa-fist-raised ">
                       </i>  
                    </div>
                  </div>
                  Defensa
                  <div className="progress my-1">
                    <div 
                    className="progress-bar bg-success" 
                    role="progressbar" 
                    style={{"width": `${poke.stats[2].base_stat}%`}} 
                    aria-valuemax="100">
                     <i className="fas fa-shield-alt "></i> 
                    </div>
                  </div>
                  Especial
                  <div className="progress my-1">
                    <div 
                    className="progress-bar bg-warning" 
                    role="progressbar" 
                    style={{"width": `${poke.stats[3].base_stat}%`}} 
                    aria-valuemax="100">
                     <i className="fas fa-star"></i> 
                    </div>
                  </div>
                  
              </div>
          </div>
          <div className="info-detalles col-md-6 ">
          <TextoDelPokemon porEspecie={porEspecie}/>
           <hr/>
          <div className="info">
              <h2> 
               Habilidad
              </h2>
             <Habilidad name={name} pokemon={pokemon}/>
            </div>
           <hr/>
            <div className="d-flex justify-content-between">
              <div>
                      <h5>Altura</h5>
                      <p > 
                        <i className="fs-2 mx-3 fas fa-arrows-alt-v"></i>
                        {alto} m
                      </p>
                      <br/>
                      <h5>Peso </h5>
                      <p >  
                        <i className="fas fs-2 fa-weight-hanging"></i>  {" "}
                        {peso} kg 
                      </p>
              </div>
              <Tipo tipo={poke.types} pokemon={poke}/>
            </div>
          </div>
      </div>
      )}))}
      <Evolucion name={porEspecie} color={color}/>
    </div>
  );
};

export default Detalles;
