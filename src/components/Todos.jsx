import React, { useEffect, useState} from 'react'
import { Link} from 'react-router-dom';
import imagen from '../assets/pokeapi.png'
import Paginacion from './Paginacion';



const Todos = () => {
    const [pokemons, setPokemons] = useState([])
    const [cargando, setCargando] = useState(true)
    const [page, setPage] = useState(Number(localStorage.pagina))
    const [total, setTotal] = useState(0)
    const dataP = async (limit = 20, offset = 0) => {
        const peticion = await fetch(`https://pokeapi.co/api/v2/pokemon-species?limit=${limit}&offset=${offset}`)
        const result = await peticion.json()
        setCargando(false)
        return result
    }
    const funcionDetalles = async (url) =>{
        const detalles = await fetch(url)
        return await detalles.json();
    }
    
   
    const paginaAnterior = ()=>{
        const anterior = Math.max(page -1, 0);
        localStorage.setItem("pagina", anterior )
        setPage(anterior)
        setCargando(false)
    }

    const paginaSiguiente = ()=>{
        const siguiente = Math.min(page + 1, total) 
        localStorage.setItem("pagina", siguiente ) 
        setPage(siguiente)
        setCargando(false)
    }
    useEffect(()=>{
        const recibir = Number(localStorage.getItem('pagina') )
        setPage( recibir )
        const fetchPokemons = async ()=>{
            const data = await dataP(20, 20 * page)
            const promises = data.results.map(async (pokemon)=>{
                return await funcionDetalles(pokemon.url)
            })
            const results = await Promise.all(promises)
            setTotal(Math.ceil(898 / 20)) 
            setPokemons(results)
            setCargando(false)
        }
        fetchPokemons()
        
    },[page,setPage])
    return (
        <div className="text-center w-100 ">
              <div>
                <img src={imagen} 
                className="mt-4" 
                alt="Pokemon" 
                />
                    <Paginacion 
                        page={page + 1} 
                        setPage={setPage} 
                        totalpage={total} 
                        onLeft={paginaSiguiente} 
                        onRight={paginaAnterior}
                    />
              </div>
            { cargando ?(
                <div className="text-center mt-5 spinner-border text-danger" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
            ):(
               <div className="contenedor">
                {
                    pokemons.map(poke => {
                        return (
                          <Link key={poke.id}  to={`/detalles/${poke.id}`}>
                                <div className="mt-5 mx-1 poke-general animate__animated animate__zoomIn">
                                    { 
                                    !cargando ? 
                                    <>
                                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${poke.id}.png`} 
                                    className="img-fluid img-poke mx-0 rounded-start"
                                    alt={poke.name}/>
                                    <h5 className="fst-italic">{poke.names[6].name}  #{poke.id} </h5>
                                    </> : 
                                    <div className="text-center mt-5 spinner-border text-danger" role="status">
                                         <span className="visually-hidden">Loading...</span>
                                    </div>
                                    }
                                </div>
                          </Link>
                          )})}
                </div> 
                )}
        </div>
    )
}

export default Todos
