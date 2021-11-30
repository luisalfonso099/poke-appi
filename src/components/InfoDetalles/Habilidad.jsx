import React, {useEffect,useState} from 'react'

const Habilidad = ({name,pokemon}) => {
  const [habilidad, setHabilidad] = useState([])

    useEffect(()=>{
        const url = pokemon.length > 0 && pokemon[0].abilities[0].ability.url
        const porHabilidad = async()=>{
         const resp = await fetch(url);
         const data = await resp.json();
         setHabilidad([data])
       }
       porHabilidad()
     },[name,pokemon]);
     useEffect(() => {
      return ()=>  setHabilidad([])
     },[])
     const nombreHabilidad = habilidad.length > 0 && habilidad[0].names[5].name;
     const habilidadLista = habilidad.length > 0 && habilidad[0].flavor_text_entries.filter(i => i.language.name).length > 1 ?
     (habilidad[0].flavor_text_entries.filter(i => i.language.name === "es")[0].flavor_text):""

    return (
        <div >
            <h3>{nombreHabilidad}</h3>
            <p className="fs-4">{habilidadLista}</p>
        </div>
    )
}

export default Habilidad
