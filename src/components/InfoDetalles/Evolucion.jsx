import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'

const Evolucion = ({name, color}) => {
    const [ evoluciones, setEvoluciones] = useState([])
    const [pokemonEvolucion, setPokemonEvolucion] = useState([])
    const [cargando, setCargando] = useState(true)
    const url = name.length > 0 && name[0].evolution_chain.url
    
   
    useEffect(() => {
        const getEvolucion = async()=>{
            if(url !== false){
            const resp = await fetch(url);
            const data = await resp.json();
            if(data.chain.evolves_to.length > 0){
                const [ evol ] =  data.chain.evolves_to
                const {species} =  evol;
                const evol1 = data.chain.evolves_to.map(n => n.species.name)
                const evol2 = evol.evolves_to.map(n => n.species.name)
                const nombres = (data.chain.evolves_to).length >= 0 ?
                [data.chain.species.name, ...evol1, ...evol2 ] :
                [data.chain.species.name,species.name];
                setEvoluciones(nombres);
            }} }
       getEvolucion()
    },[name,url])

    useEffect(() => {
        const getEvolucionPokemon = async()=>{
            const pokemones = evoluciones.map(async item => {
               const resp = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${item}`)
               return  await resp.json();
            })
            const resp = await Promise.all(pokemones)
            setPokemonEvolucion(resp)
            setCargando(false)
        }
       getEvolucionPokemon()
    },[evoluciones]);

    useEffect(() => {
        return () => {
            setPokemonEvolucion([])
            setEvoluciones([])
        }
    },[])


    return (
        <>
           <div className="text-center ">
           {
                pokemonEvolucion.length > 0 &&
               <h2 >
               Cadena de evolucion
               </h2>
              
           }
           </div>
            <div className={pokemonEvolucion.length.toString() > 0 ? `evolucion ${color.toString()}`: ""}>
            {!cargando ?
            ( pokemonEvolucion.map(pok => {
                return (
                    <Link 
                    to={`/detalles/${pok.id}`}
                     key={pok.id} 
                     className="text-center evoluciones card bg-light">
                       <img 
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pok.id}.png`}   
                        alt={pok.name}
                        className="img-evoluciones"                        
                        />
                        <h3>{pok.names[6].name}</h3>
                    </Link>
                )
            }) ):
            <div className="spinner-border text-success text-center mt-5"  role="status">
            <span className="visually-hidden text-center">Loading...</span>
             </div>
            }
            </div>
        </>
    )
}

export default Evolucion
