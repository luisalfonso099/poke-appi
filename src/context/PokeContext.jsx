import React, {useState, useEffect,createContext} from 'react'

export const Context = createContext()
const PokeContext = ({children}) => {
    const [data, setData] = useState([]);
    const [busqueda, setBusqueda] = useState([]);

    const respDetalles = async (url) => {
        const peticion = await fetch(url);
        const result = await peticion.json();
        return result
      };
    useEffect(()=>{
      const traerPoke = async () => {
        const resp = await fetch(
          "https://pokeapi.co/api/v2/pokemon?offset=0&limit=898"
        );
        const {results} = await resp.json();
        const todos = await results.map(async(pok) => {
           return await respDetalles(pok.url);
         });
        const pokemones = await Promise.all(todos);
        setData(pokemones);
      };
        traerPoke()
    },[])
    return (
        <Context.Provider value={{data,busqueda, setBusqueda}}>
            {children}
        </Context.Provider >
    )
}

export default PokeContext
