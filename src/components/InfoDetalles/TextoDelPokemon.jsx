import React from 'react'

const TextoDelPokemon = ({porEspecie}) => {
    const elPokemon = porEspecie.length > 0 && porEspecie[0].genera[5].genus;
    const textos = porEspecie.length > 0 && porEspecie[0].flavor_text_entries;
    const textosEs = textos.length > 0 && textos.filter(texto => texto.language.name === "es");
    return (
        <div className="mt-5">
            <h3>El {elPokemon}</h3>
               <p className="fs-4">
                 {textosEs.length > 0  && textosEs[0].flavor_text}
                </p>
        </div>
    )
}

export default TextoDelPokemon
