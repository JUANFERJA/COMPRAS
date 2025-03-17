import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faGear, faHouse, faPersonWalkingArrowLoopLeft, faPersonWalkingArrowRight } from '@fortawesome/free-solid-svg-icons'
import { useContext, useState } from 'react';
import { ItemSidebar } from './ItemSidebar';
import { AuthContext } from '../auth/context/AuthContext';
import { Navigate } from 'react-router-dom';


export const SideBar = () => {

    const [collapseSidebar, setcollapseSidebar] = useState(false);
    const {logout} = useContext(AuthContext);  

    const addClasseSidebar = () =>{
     setcollapseSidebar(true);    
    }

    const onSalir = () =>{
      logout();
      
    }

  return (
    <ul className='p-2' id = "mantenmientoP">
        <li className="btnli mt-3" id="btnli0"  key="hamburguer" style={{position:"relative", listStyleType:"none"}}>
            <button  className="hamburguer" id="hamburguer" onClick={addClasseSidebar} >
                <FontAwesomeIcon icon={faBars} className="iconSidebar"/>
            </button>
        </li>

        <li className="btnli mt-3" id="btnli0"  key="hamburguer" style={{position:"relative", listStyleType:"none"}}>
            <div data-bs-parent="#mantenmientoP">
              <button className="btnSidebar d-flex flex-row" data-bs-toggle="collapse" data-bs-target="#mantenmiento"
                      aria-expanded="false" >
                      <FontAwesomeIcon icon={faHouse} className="iconSidebar" />
                      <span className="spanSidebar">Inicio</span>
              </button>
            </div>
            <div className="collapse" id="mantenmiento" data-bs-parent="#mantenmientoP">
              <div className="btn-toggle-nav list-unstyled fw-normal pb-1 small" id="btnClose" style={{position: "relative"}}>
                    <ItemSidebar orden = {1}/>            
              </div>
            </div>                           
        </li>
        <li className="btnli mt-3" id="btnli0"  key="hamburguer" style={{position:"relative", listStyleType:"none"}}>
        <div data-bs-parent="#mantenmientoP">
              <button className="btnSidebar d-flex flex-row" data-bs-toggle="collapse" data-bs-target="#mantenmiento2"
                      aria-expanded="false" >
                      <FontAwesomeIcon icon={faGear} className="iconSidebar" />
                      <span className="spanSidebar">Mantenimiento</span>
              </button>
            </div>
            <div className="collapse" id="mantenmiento2" data-bs-parent="#mantenmientoP">
              <div className="btn-toggle-nav list-unstyled fw-normal pb-1 small" id="btnClose" style={{position: "relative"}}>
                    <ItemSidebar orden = {2}/>            
              </div>
            </div> 
        </li>
        <li className="btnli mt-3" id="btnli0"  key="hamburguer" style={{position:"relative", listStyleType:"none"}}>
            <button className="btnSidebar d-flex flex-row" id="hamburguer" onClick={onSalir} >
                <FontAwesomeIcon icon={faPersonWalkingArrowRight} className="iconSidebar" />
                <span className='spanSidebar'>Salir</span>
            </button>
        </li>   
    </ul>
  )
}

