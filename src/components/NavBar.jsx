import { useContext } from "react";
import images from "../assets/images"
import { AuthContext } from "../auth/context/AuthContext";

export const NavBar = () => {
  const {user} = useContext(AuthContext);
  console.log("usuario", user.UserEmail)
  return (
    <div className='d-flex flex-row justify-content-between'>
        <div>
          <img src={images.logoNavbar} className="logo" id="iconSistran"/>
          <span className="nameBarrio">Go-Mart juan</span>
        </div>
        <div className="d-flex flex-row buscador">
          <input class="form-control barraBusqueda" type="search" placeholder="Search" aria-label="Search"/>
        </div>   
        <div className="d-flex flex-column usuario">
         <span className="infoUsuario">Bienvenido: {user.UserName}</span>
         <span className="userEmail">{user.UserEmail}</span>
        </div>      
    </div>
  )
}
