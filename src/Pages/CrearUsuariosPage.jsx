import React, { useState } from 'react'
import { PathServer } from '../helpers/path';
import useFetch from '../helpers/useFetch';
import { useNavigate } from 'react-router-dom';
import { helpHttp } from '../helpers/hepHttp';
import * as $ from 'jquery';
import { SearchTable } from '../components/CreaRegistros/SearchTable';

const Path = PathServer();
const Path2 = Path.ruta;
let  api = helpHttp();

export const CrearUsuariosPage = ({item}) => {

    let valor = 0;
        $('html, body').animate({
            scrollTop: valor
        }, 0);
    let tableName = item.descripcionItem
    const navigate = useNavigate();
    const title = useFetch(`${Path2}/api/GetTable?tabla=${tableName}&SMercado=&TipoProd=`);
    if (title.loading || !title.result) {return "<Loading />";}
    const { data } = title.result;
    console.log("este es la parte del error", data[0])
    let encabezados = Object.keys(data[0]);
    encabezados.shift();

    const onAddClass = ({target}) =>{
      let positionSelect = target.selectedIndex;
      let elemento = target[positionSelect];
      elemento.classList.add("registro");
    }

  return (
    
    <div className='d-flex flex-column crearRegistro'>
    {encabezados.map( elemento => (
        <>
        {(elemento === "tipoProducto" || elemento === "marcaProducto" || elemento === "SuperMercado") ? (
          <div className='filtro' style={{position: "relative", width: "200px", left: "300px"}}>
          <label>{elemento}</label>
          <select className="form-select selectTipo" onChange={onAddClass}>
              <SearchTable opDefault="Todos" tableName = {elemento}/>
          </select>
      </div>
        ): 
        (
          <div style={{position: "relative", width: "200px", left: "300px"}}>
            <label className='lblRegistro'> {elemento}</label>
            <input className='registro'/>
          </div>
        ) }
        
        </>
    ) )} 

    <button className = "btn btn-primary"
            style={{position: "absolute", 
                    width: "200px", 
                    height:"100px", 
                    left: "calc(60vw)",
                    top: "calc(50vh)"}}
            onClick={() => saveRegistro(navigate, encabezados, tableName)}
            >
        Guardar
    </button> 
    </div>
    
  )
}


const saveRegistro = (navigate, encabezados, tableName) =>{
  
  let valorInput = document.getElementsByClassName('registro');
  let lblInput = document.getElementsByClassName('lblRegistro');
  let dataArray = [];
  let dataJson = {};
  const goBack = () => {
    navigate(-1);
  }
  
  for (let i = 0; i < valorInput.length; i++) {
    //asigna el valor a un nuevo array
    dataArray.push(valorInput[i].value);
    dataJson[encabezados[i]] = valorInput[i].value;
    //valida si el input esta vacio para cambiar el colo al label
      if (valorInput[i].value === "") {
          lblInput[i].style.color = "red";
      }
    }

    if (dataArray.includes("") === true) {
      
       alert("debe llenar todos los campos");
      return;
    }
//en el caso de que todos esten con info envia la data
else {
       
  let data = {
      "tableName": tableName, 
      "idRegistro":"",
      "Table" : encabezados,
      "Valores": dataArray
  }
  const createData = (data) => {
    data.id = Date.now();
    //console.log(data);
    let url = `${Path2}/api/InsertData`;
    let options = {
    body: data,
    headers: { "content-type": "application/json" },
    };
    console.log("esta es la data", data);
    api.post(url, options).then((res) => {
    /* console.log(res); */
    if (!res.err) {
       
        /* console.log("usuario",res) */
        //document.getElementById('login').classList.add('loading');
       
       
    } else {
        //console.log(res);
    }
    });
};

console.log("esta es la data del update", data)
createData(data);
goBack(); 
}
  }
