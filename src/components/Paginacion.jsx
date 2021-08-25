import React from 'react'

const Paginacion = (props) => {

    const {onLeft, onRight, page, totalpage} = props;

    return (
        <div className="d-flex justify-content-center my-4  align-items-center">
            <button onClick={onRight} className="mx-3 btn btn-outline-info"><i className="fas fa-arrow-circle-left"></i></button>
            <div className="text-info">{page} de {totalpage}</div>
            <button onClick={onLeft} className="mx-3 btn btn-outline-info"><i className="fas fa-arrow-circle-right"></i></button>
            
        </div>
    )
}

export default Paginacion
