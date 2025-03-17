import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import useFetch from '../helpers/useFetch';
import { PathServer } from '../helpers/path';
import { helpHttp } from '../helpers/hepHttp';

const Path = PathServer();
const Path2 = Path.ruta;
let  api = helpHttp();

export const UpdateRegistro = () => {
    let params = useParams();
    const {tabla, id} = params;

    const navigate = useNavigate();
    const title = useFetch(`${Path2}/api/GetRegistro?tabla=${tabla}&id=${id}`);
    if (title.loading || !title.result) {return "<Loading />";}
    const { registro } = title.result;
    let encabezados = Object.keys(registro[0]);
    let valores = Object.values(registro[0])
    encabezados.shift();
    valores.shift();

    console.log("valores de los inputs", valores, encabezados);

  return (  
    
    <div className='d-flex flex-column'>
    {encabezados.map( (elemento, indice) => (
        <>
        <div style={{position: "relative", width: "200px", left: "300px"}}>
        <label className='lblRegistro'> {elemento}</label>
        <input className='registro' type='text' defaultValue = {valores[indice]}/>
        </div>
        </>
    ) )} 

    <button className = "btn btn-primary"
            style={{position: "absolute", 
            width: "200px", 
            height:"100px", 
            left: "calc(60vw)",
            top: "calc(50vh)"}}
            onClick={() => saveRegistro(navigate, encabezados, tabla, id)}
            >
        Guardar
    </button> 
    </div>
    
  )
}


const saveRegistro = (navigate, encabezados, tableName, id) =>{
  
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
            "idRegistro":id,
            "Table" : encabezados,
            "Valores": dataArray
        }
        const createData = (data) => {
          data.id = Date.now();
          //console.log(data);
          let url = `${Path2}/api/UpdateData`;
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
      createData(data)
        alert("se envio la data")
        goBack()
    }
  }
