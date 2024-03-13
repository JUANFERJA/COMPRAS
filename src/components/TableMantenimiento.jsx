import React, { useContext } from 'react'
import images from '../assets/images'
import { Link } from 'react-router-dom'
import { ModalCondominios } from './ModalCondominios';
import { functions } from '../helpers/functions';
import { UpdateContext } from '../context/UpdateContext'

const {activeModalSection, deleteRegistro} = functions();


export const TableMantenimiento = ({data, encabezados, tabla}) => {
    const { setflagAll } = useContext(UpdateContext);

    return(
        <>
            {data.map( elemento => (
                
                <>
                <tr className='txtTBody'>
                    {encabezados.map( (atributo, indice) =>(
                    atributo !== "imagenProducto" && (
                        <td> {elemento[atributo]} </td>
                    )))}
                    {
                      data[0].id != "0" &&
                      <td > 
                       <div className="d-flex btnAcciones">
                        <button  className="btnMantenimientoDoc">
                            <Link to={`/UpdateRegistro/${tabla}/${elemento.id}`} className="btnEditar" style={{textDecoration:"none"}} onClick = {() => console.log("debería editar el artefacto")}>
                                <div className="toolContainer">
                                        <span className="toolEdit">Editar</span>
                                        <img className="Editar" src={images.editar} />
                                </div> 
                            </Link>
                        </button>
                 
                    <button className="btnMantenimientoDoc " data-bs-toggle="modal" onClick={() =>activeModalSection(`btnDelete${elemento.id}`)}>
                      <div className="toolContainer">
                        <span className="toolDelete ">Eliminar</span>
                        <img className="Eliminar" src={images.eliminar} />
                      </div>
                    </button>
                      <ModalCondominios  idModal = {`#${elemento.UserName}`.trim().replace(/\s+/g, '')} 
                                               idBtn={`btnDelete${elemento.id}`} 
                                               actionTrue = {() => deleteRegistro(tabla, elemento.id, setflagAll)}
                                               titleModal = {`Eliminar Template/Herramienta ${elemento.id}`}
                                               modalBody = "¿Está seguro de eliminar este registro?"
                                               txtActiontrue = "Aceptar"
                                               txtActionFalse = "Cancelar"
                                               />
                 
                       </div>
                      </td>
                    }                    
                </tr>                    
                </>                
            ) )}            
        </>       
    )
}
