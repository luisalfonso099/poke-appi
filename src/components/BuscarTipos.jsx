import React, {useState,useEffect,useContext} from 'react'
import { Context } from '../context/PokeContext'
import { Link} from 'react-router-dom';
import {Fetch} from '../helpers/Fecth'
import imagen from '../assets/pokeapi.png'

const image = require.context("../assets", true)


const BuscarTipos = () => {
    const [tipos, setTipos] = useState([]);
    const [dataType, setDataType] = useState([]);
    const [valueSelect, setValueSelect] = useState("normal");
    const [Loading, setLoading] = useState(true)
    const {data} = useContext(Context)

    const respTypes = async () => {
      const resp = await fetch("https://pokeapi.co/api/v2/type");
      const { results } = await resp.json();
       await results.splice(results.length - 2, results.length)
        const data = await  results.map(async tp => {return await Fetch(tp.url)})
        const tipos = await Promise.all(data)
        setTipos(tipos)
    };
    useEffect(() => {
      function filtrarPorTipo (type) {
        const tipo =
          data.length > 0 &&
           data.filter((p) => { 
             return ( p.types.length > 1 ? p.types[0].type.name === type || p.types[1].type.name === type : p.types[0].type.name === type)});
        setDataType(tipo);
        setTimeout(() => {
        setLoading(false)
        },1000)
      };
        filtrarPorTipo(valueSelect)
    },[valueSelect,data]);
    useEffect(() => {
      respTypes();
    },[]);
    useEffect(()=>{
      return () =>  setDataType([]);
    },[])
    return !Loading ? (
        <div className="d-flex flex-wrap mt-2 justify-content-center container">
              <div>
                <img 
                src={imagen} 
                className="mt-4" 
                alt="Pokemon" 
                style={{width:"300px"}}/>
              </div>
                <div className="mt-3">
                    { 
                         tipos.map(tipo =>{
                            return  (
                                <button 
                                onClick={(e) => setValueSelect(tipo.name)} 
                                className="m-1 btn btn-primary"
                                 key={tipo.name}>
                                   {tipo.names[4].name}
                                   <img 
                                    alt={tipo.names[4].name} 
                                    src={image(`./${tipo.names[4].name}.png`).default}
                                    className="img-tipos-btn"
                                    />
                                </button>
                            )
                        })
                    }
                </div>
                    {
                      dataType.length > 0 ? dataType.map(poke => {
                        return (
                          <Link key={poke.id}  to={`/detalles/${poke.id}`}>
                                <div className="mt-5 mx-1 poke-general animate__animated animate__zoomIn">
                                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${poke.id}.png`} 
                                    className="img-fluid img-poke mx-0 rounded-start"
                                    alt={poke.name}/> 
                                    <div className="text-center">{poke.types.length > 1 ? <div >
                                    <button className="btn btn-success mx-1"> {poke.types[0].type.name}</button>
                                    <button className="btn btn-success"> {poke.types[1].type.name}</button>
                                    </div>
                                    :
                                    <button className="btn btn-success"> {poke.types[0].type.name}</button>
                                     }</div> 
                                </div>
                          </Link>
                          )
                      }) : null
                }
        </div>
    ) : <div className="spinner-border text-danger text-center mt-5"  role="status">
          <span className="visually-hidden text-center">Loading...</span>
        </div>
}

export default BuscarTipos
