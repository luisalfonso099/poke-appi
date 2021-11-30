import React, {useState, useEffect} from 'react'
import {Fetch} from '../../helpers/Fecth'
const image = require.context("../../assets", true)

const Tipo = ({tipo,pokemon}) => {
  const [tipos, setTipos] = useState([])
  useEffect(()=>{
  const resp = async ()=>{
        const data = tipo.map(async url => await Fetch((url.type.url)))
        const prom = await Promise.all(data)
        setTipos(prom)
        }
      resp()
  },[tipo])

    return (
        <div>
            <h5>Tipo</h5>
            <div className="d-flex flex-wrap w-75 justify-content-evenly">
                {tipos.length > 0 && 
                    tipos.map(ty =>
                     <div 
                        key={ty.name} 
                        className={`d-flex mx-2 flex-column ${(ty.names[4].name).toString()}`}> 
                            <p>
                                {ty.names[4].name}
                            </p>  
                            <img 
                            alt={ty.names[4].name} 
                            src={image(`./${ty.names[4].name}.png`).default}
                            className="img-tipos"
                            />
                     </div>
                     )
                }
            </div>
        </div>
    )
}

export default Tipo
