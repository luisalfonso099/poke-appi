import React, { useEffect, useState } from 'react'
import { Link} from 'react-router-dom';
import imagen from '../assets/pokeapi.png'
import Paginacion from './Paginacion';


const Todos = () => {
    const [pokemons, setPokemons] = useState([])
    const [cargando, setCargando] = useState(true)
    const [page, setPage] = useState(0)
    const [total, setTotal] = useState(0)
    const dataP = async (limit = 25, offset = 0) => {
        const peticion = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
        const result = await peticion.json()
        return result
    }
    const detalles = async (url) =>{
        const detalles = await fetch(url)
        return await detalles.json();
    }
    const fetchPokemons = async ()=>{
        const data = await dataP(25, 25 * page)
        const promises = data.results.map(async (pokemon)=>{
            return await detalles(pokemon.url)
        })
        const results = await Promise.all(promises)
        setPokemons(results)
        setCargando(false)
        setTotal(Math.ceil(648 / 25)) 
    }
    useEffect(()=>{
        fetchPokemons()
        const recibir = Number(localStorage.getItem('pagina') )
        setPage(recibir )
    },[page])

    const paginaAnterior = ()=>{
        const anterior = Math.max(page -1, 0);
        localStorage.setItem("pagina", anterior )
        setPage(anterior)
    }

    const paginaSiguiente = ()=>{
        const siguiente = Math.min(page + 1, total)
        localStorage.setItem("pagina", siguiente )
        setPage(siguiente)
    }
    return (
        
        <div className="text-center">
            { cargando ?(
                <div className="text-center mt-5 spinner-border text-danger" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
            ):(
            <div>
             <img src={imagen} className="mt-4" alt="Pokemon" style={{width:"300px"}}/>
             <Paginacion 
                page={page + 1} 
                setPage={setPage} 
                totalpage={total} 
                onLeft={paginaSiguiente} 
                onRight={paginaAnterior}
              />
               <div className="d-flex justify-content-center flex-wrap container">
                {
                    pokemons.map(poke => {
                        return (
                            <div key={poke.id} className="card bg-light shadow-sm m-2 p-2 d-flex align-items-center justify-content-center" style={{"width": "350px"}}>
                                <img src={poke.sprites.other.dream_world.front_default} style={{height:"150px"}} className="card-img-top" alt={poke.name}/>
                                <div className="card-body">
                                  <h5 className="fs-3 card-title">{poke.name}  #{poke.id}</h5>
                                  <Link to={`/detalles/${poke.id}`} className="mt-1 btn btn-primary">Detalles</Link>
                                </div>
                          </div>
                        )
                    })
                }
              </div>
              <Paginacion 
                page={page + 1} 
                setPage={setPage} 
                totalpage={total} 
                onLeft={paginaSiguiente} 
                onRight={paginaAnterior}
              />
            </div>
            )
            }

        </div>

            
        
    )
}

export default Todos
