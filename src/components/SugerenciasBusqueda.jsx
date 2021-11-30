import React, {useContext, useEffect} from 'react'
import {Context} from "../context/PokeContext"
import {Link} from "react-router-dom"
const SugerenciasBusqueda = () => {
    const {data, busqueda, setBusqueda} = useContext(Context)
    const nombres = data.length > 0 && data.reduce((acc,el) => {return ([...acc,{id:el.id, name:el.name}])},[])
    const sugerencias = () => busqueda.length > 0 && nombres.filter(item => item.name.includes(busqueda))
    let resultado = sugerencias();
    useEffect(() => {
        sugerencias()
    },[busqueda,nombres])
    const selec =(e)=>{
        setBusqueda(e.target.text)
        setBusqueda("")
    }
        return ( 
        <div className="nav-item  p-3 text-dark">
            {resultado !== false && 
            <ul 
            className="navbar-nav me-auto mb-2 mb-lg-0 "> 
            {resultado.map(item => 
                <Link 
                to={`/detalles/${item.id}`}
                key={item.id} 
                onClick={selec} 
                className="nav-link ">
                    {item.name}
                </Link>).slice(0,5)} 
            </ul>}
        </div>
    )
}

export default SugerenciasBusqueda
