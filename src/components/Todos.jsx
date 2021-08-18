import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import imagen from '../assets/pokeapi.png'


const Todos = () => {
    const [pokemons, setPokemons] = useState([])
    const [cargando, setCargando] = useState(true)

    const dataP = async () => {
        const peticion = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=648&offset=0`)
        const result = await peticion.json()
        return result
    }
    const detalles = async (url) =>{
        const detalles = await fetch(url)
        return await detalles.json();
    }
    const fetchPokemons = async ()=>{
        const data = await dataP()
        const promises = data.results.map(async (pokemon)=>{
            return await detalles(pokemon.url)
        })
        const results = await Promise.all(promises)
        setPokemons(results)
        setCargando(false)
    }
    useEffect(()=>{
        fetchPokemons()
    },[])
    return (
        
        <div className="text-center">
            { cargando ?(
                <div className="text-center mt-5 spinner-border text-danger" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
            ):(
            <div>
             <img src={imagen} className="mt-4" style={{width:"300px"}}/>
               <div className="d-flex justify-content-center flex-wrap container">
                {
                    pokemons.map(poke => {
                        return (
                            <div key={poke.id} className="card shadow-sm m-3 d-flex align-items-center justify-content-center" style={{"width": "340px"}}>
                                <img src={poke.sprites.other.dream_world.front_default} style={{height:"150px"}} className="mt-3 card-img-top" alt="..."/>
                                <div className="card-body">
                                  <h5 className="fs-3 card-title">{poke.name}  #{poke.id}</h5>
                                  <Link to={`/detalles/${poke.id}`} className="mt-5 btn btn-outline-info">Detalles</Link>
                                </div>
                          </div>
                        )
                    })
                }
              </div>
            </div>
            )
            }
        </div>

            
        
    )
}

export default Todos
