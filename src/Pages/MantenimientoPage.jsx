import React, { useState } from 'react';
import images from "../assets/images"
import { CardMantenimientoTitulo, TableMantenimiento } from '../components';
import { PathServer } from '../helpers/path';
import useFetch from '../helpers/useFetch';
import { Link } from 'react-router-dom';
import { Filtros } from '../components/Filtros/Filtros';

const Path = PathServer();
const Path2 = Path.ruta;
export const MantenimientoPage = ({item}) => {

   
    const [idSuperMercado, setidSuperMercado] = useState("");
    const [tipoProd, settipoProd] = useState("");
    const [search, setSearch] = useState("");
    
    const title = useFetch(`${Path2}/api/GetTable?tabla=${item.descripcionItem}&SMercado=${idSuperMercado}&TipoProd=${tipoProd}&search=${search}`);
   
   
    if (title.loading || !title.result) {return "<Loading />";}
    const { data } = title.result;
    console.log("este es el item", item, data)
    let encabezados = Object.keys(data[0])
    let tabla = item.descripcionItem
    let date = new Date();
    date = (date.getDate() + "/" + (date.getMonth() +1) + "/" + date.getFullYear());

      
  return (
    <>
    <div className="d-flex flex-row card border-2 p-3 cardManDoc" id="cardManDoc">
               
            <div className="d-flex flex-column p-2 asdf-warning textHead">
            <div className="p-2 asdf-success titleDoc">Bienvenido al módulo de Mantenimiento</div>
            <div className="p-2 asdf-primary descDoc">Con esta herramienta podrás gestionar tus registros de: {tabla}, creando o actualizándolos.</div>
            <div className="p-2 asdf-danger lastLog">
            <p className="">La última vez que ingresaste fue el
                <strong className="resaltado">{ ` ${date}` }</strong></p>
            </div>
            </div>
                            
            <div className="p-2 asdf-primary imgDoc">
            <img src={images.matenimientoCard} className="align-content-rigth img-fluid"/>
            </div>  
    </div>
    <CardMantenimientoTitulo NameClass = "cardGrilla" txtTitle = {tabla} styleP={{position: "relative",
                                                                  left:"15px"}}/>
                                                                  <div className="p-2 asdf-primary btnNuevo">
    <button className="btnNuevoDoc">
      <Link className="txtBtnNuevo" to={`/Crear${tabla}`}>
         Nuevo
      </Link>
    </button>
    </div>
   
   {
    tabla == "Productos"&&(
      <Filtros setSearch={setSearch} setidSuperMercado={setidSuperMercado} settipoProd={settipoProd}/>
    )
   }
   
    <div className="asdf-danger tableDoc"  id = "tableDoc">
        <table className="DocumenTable" >
                    <thead className="tHead">
                        <tr className="txttHead"> 
                        {encabezados.map( elemento => (
                            elemento !== "imagenProducto" && (
                              <th>{elemento.replace("User", "").replace("Producto", "")}</th>
                            )                            
                        ) )}     
                         {
                           data[0].id != "0" && <th>Acciones</th>
                         }                
                        </tr>
                    </thead>

                    <tbody className="TBody">
                     <TableMantenimiento data = {data} encabezados ={encabezados} tabla = {tabla}
                                         idSuperMercado = {idSuperMercado} tipoProd = {tipoProd}/>          
                    </tbody>
                
        </table>
    </div>
    </>
  )
}
