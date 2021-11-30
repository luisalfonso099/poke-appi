import React,{useContext} from "react";
import {Context} from "../context/PokeContext"
import { Link, useHistory} from "react-router-dom";
import pokeball from "../assets/pokeball.png"
import SugerenciasBusqueda from "./SugerenciasBusqueda.jsx";
import "./NavBar.css"

export default function NavBar() {
  const {setBusqueda, busqueda} = useContext(Context)

    const history = useHistory()
    const search = (e)=>{
        e.preventDefault();
        let form = e.currentTarget;
        let pokemon = form.Search.value;
       history.push(`/detalles/${pokemon}`)
       form.reset();
      }

    return (
              <nav className="container navbar navbarnavbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                  <div className="navbar-brand ">
                  <Link 
                  to="/" 
                  className="btn text-dark fs-5"
                  > 
                  <img style={{width: "30px"}} alt="pokeball" className="mx-2" src={pokeball}/>
                  Inicio
                  </Link>
                  <Link
                    className="btn text-dark fs-5" 
                    to="/tipos">
                      Tipos
                    </Link>

                  </div>
                  
                  <button 
                  className="navbar-toggler"
                   type="button" 
                   data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" 
                    aria-controls="navbarSupportedContent" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <div 
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent">
                    <form 
                    onSubmit={search} 
                    className="row mt-3">
                      <div className="col-lg-5 ">
                        <div className="d-flex">
                          <input 
                          autoComplete="off" 
                          value={busqueda} 
                          onChange={(e)=> setBusqueda(e.target.value)} 
                          className="form-control me-2" 
                          type="search" 
                          name="Search" 
                          placeholder="Search" 
                          aria-label="Search"/>
                          <button 
                          className="btn-sm btn-dark" 
                          type="submit">Search</button>
                        </div>
                       <SugerenciasBusqueda/>
                        </div>
                        </form>
                      </div>
                    </div>
               </nav>  
           )}