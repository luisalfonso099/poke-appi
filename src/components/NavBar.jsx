import React from "react";
import { Link, useHistory} from "react-router-dom";
import pokeball from "../assets/pokeball.png"


export default function NavBar() {
    const history = useHistory()
    const search = (e)=>{
        e.preventDefault();
        let form = e.currentTarget;
        console.log(form)
        let pokemon = form.Search.value;
       history.push(`/detalles/${pokemon}`)
       form.reset();
      }
    return (
              <nav className="bg-dark navbar">
                <div className="container  px-5">
                
                <Link to="/" className="navbar-brand text-info"> 
                <img style={{width: "30px"}} className="mx-2" src={pokeball}/>
                Inicio
                </Link>
                  <form onSubmit={search} className="d-flex">
                  <input className="form-control me-2" type="search" name="Search" placeholder="Search" aria-label="Search"/>
                  <button className="btn btn-outline-info" type="submit">Search</button>
                  </form>
                </div>
               </nav>
            
 )}