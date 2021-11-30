import React from 'react'

const Paginacion = ({onLeft, onRight, page, totalpage}) => {
    return (
        <div 
        className="d-flex justify-content-center my-4  align-items-center">
            <button 
                onClick={onRight} 
                className="mx-3 btn btn-outline-dark">
                 <i className="fas fs-1 fa-arrow-circle-left"></i>
            </button>
            <div   
                    className="text-dark">{page} de {totalpage}
            </div>
            <button 
                onClick={onLeft} 
                className="mx-3 btn btn-outline-dark">
                    <i className="fas fs-1 fa-arrow-circle-right"></i>
            </button>
        </div>
    )
}

export default Paginacion
