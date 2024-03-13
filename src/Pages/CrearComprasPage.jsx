import React, { useState } from 'react'
import { CardMantenimientoTitulo } from '../components'
import { Link } from 'react-router-dom';
import { PathServer } from '../helpers/path';
import useFetch from '../helpers/useFetch';
import images from '../assets/images';
import { Filtros } from '../components/Filtros/Filtros';
import swal from "sweetalert";

const Path = PathServer();
const Path2 = Path.ruta;
const urlimagen = require.context('../assets/images/productos', true);

export const CrearComprasPage = ({item}) => {
    const [idSuperMercado, setidSuperMercado] = useState("");
    const [tipoProd, settipoProd] = useState("");
    const [search, setSearch] = useState("");
    const [compra, setcompra] = useState([]);
    const [bandera, setbandera] = useState(false);
    let url = (`${Path2}/api/GetTable?tabla=Productos&SMercado=${idSuperMercado}&TipoProd=${tipoProd}&search=${search}`)
    const title = useFetch(url);
       
    if (title.loading || !title.result) {return "<Loading />";}
    const { data } = title.result;
    
    
    let tabla = item.descripcionItem
    let date = new Date();
    date = (date.getDate() + "/" + (date.getMonth() +1) + "/" + date.getFullYear());
   
    const enviarData = () =>{
      console.log("este es el onjeto a enviar", compra);

      if(compra.length === 0 ){
        swal("Ups!", "Debe seleccionar al menos un producto", "error");
        return;
      }
      document.getElementById('Generar').style.display = "none";
      document.getElementById('Comprar').style.display = "block";
      setbandera(true);
    }

    let valorTotal = 0; 

    compra.forEach(element => {
      valorTotal = valorTotal + parseFloat(element.precioProducto);
    });

    let valorIva = (valorTotal * 0.12)+valorTotal;
   
  return (
    <div className='' style={{width:"100%", height:"100%"}}>
       <div className="d-flex flex-row card border-2 p-3 cardManDoc" id="cardManDoc">
               
               <div className="d-flex flex-column p-2 asdf-warning textHead">
               <div className="p-2 asdf-success titleDoc">Bienvenido aquí podrás planificar tu compra</div>
               <div className="p-2 asdf-primary descDoc">Podrás elegir tus productos de cada super mercado, filtharlos por tipo de producto y por marca.</div>
               <div className="p-2 asdf-danger lastLog">
               <p className="">La última vez que ingresaste fue el
                   <sthong className="resaltado">{ ` ${date}` }</sthong></p>
               </div>
               </div>
                               
               <div className="p-2 asdf-primary imgDoc">
               <img src={images.matenimientoCard} className="align-content-rigth img-fluid"/>
               </div>  
       </div>
       <CardMantenimientoTitulo NameClass = "cardGrilla" txtTitle = {tabla} styleP={{position: "relative",
                                                                     left:"15px", 
                                                                     width:"300px"}}/>
                                                                     <div className="p-2 asdf-primary btnNuevo">
       <button className="btnNuevoDoc" id = "Generar" onClick={enviarData}>
          <span className='txtBtnNuevo'>
              Generar
          </span>        
       </button>
       <button className="btnNuevoDoc Comprar"  id="Comprar" onClick={enviarData}>
          <span className='txtBtnNuevo'>
              Comprar
          </span>        
       </button>
       </div>

       {
        bandera === true ? (
          <div className='tableDoc'>
            <table className="DocumenTable">
              <thead className='tHead'>
             <tr className="txttHead">
                <th>
                    Cantidad
                </th>
                <th>
                    Tescripción
                </th>
                <th>
                    Tipo
                </th>
                <th>
                    Marca
                </th>
                <th>
                    Medida
                </th>
                <th>
                    Valor.U
                </th>
                <th>
                    Valor.T
                </th>
             </tr>
              </thead>

              <tbody className='TBody'>               
                  <RowTablePedido objeto = {{compra}}/>
                  <tr className='valores'>
                    <th>
                      Valor total sin IVA: 
                    </th>
                    <th>
                       {valorTotal.toFixed(2)}
                    </th>
                  </tr>   
                  <tr className='valores'>
                    <th>
                      Valor total con IVA: 
                    </th>
                    <th>
                       {valorIva.toFixed(2)}
                    </th>
                  </tr>               
              </tbody>
            </table>

          </div>
          
        ) : (
          <>
            <Pedido objeto={{setcompra, compra, data, setSearch, setidSuperMercado, settipoProd}}/>
          </>          
        )
       }
    </div>
  )
}



const BotonPlus = ({setcompra, elemento, compra}) =>{

  const [valorFin, setvalorFin] = useState(0);
  const addProducto = () =>{
    setvalorFin(valorFin + 1);
    setcompra([...compra, elemento]);    
  }

  const deleteProducto = (elmento) =>{
    if(valorFin > 0 ){
      setvalorFin(valorFin - 1)
    }    
    const newCompra = compra.findIndex(item => item.id === elmento);
    compra.splice(newCompra, 1);   
  }

  const recuento = compra.filter(item => item.descripcionProducto === elemento.descripcionProducto).length;
   
  return(
    <>
        <span className='cantidad'>Cantidad:{recuento}</span>
        <button className='btn btn-primary btnPlus' id={elemento} 
                onClick={() =>addProducto(`valor${elemento}`)}> 
        <span className='mas'>+</span>
        </button> 
        <button className='btn btn-primary btnDelete' id={elemento} 
                onClick={() =>deleteProducto(elemento.id)}> 
        <span className='mas'>-</span>
        </button>
    </>
    
  )
}


const Pedido = ({objeto}) => {

  const {setcompra, compra, data, setSearch, setidSuperMercado, settipoProd} = objeto;
  return(
    <>
    <Filtros setSearch = {setSearch} setidSuperMercado = {setidSuperMercado} settipoProd = {settipoProd}/>
       <div className="card mb-3 mt-2 cardProductos d-flex flex-row">
          <div className="card-body d-flex flex-row" >
            <>
              
              {
                data.length > 1 &&
                data.map (elemento =>(
                  <div className="card mb-3 mt-2 producto">
                    <div className="card-body d-flex flex-column"> 
                     <div className='d-flex flex-row'>
                       <img className='imgProducto' src={urlimagen(`./${elemento.imagenProducto.trim()}`)}/>
                       <div className='d-flex flex-column precio'>
                          <span >Precio:</span>
                          <span className='Valor'>{elemento.precioProducto}</span> 
                          <span >$ c/u</span>
                       </div>                       
                     </div>      
                     {console.log("esta es la data asdf", elemento.descripcionProducto.length)}                                   
                     <span className='descripcion'>{elemento.descripcionProducto}</span> 
                     <BotonPlus setcompra = {setcompra} compra = {compra} elemento = {elemento}/>    
                    </div>
                  </div>
                 )
                )
              }
            </>                              
          </div>              
       </div>
    </>       
  )
}


const RowTablePedido = ({objeto}) =>{

  const {compra}  = objeto;

  const unicos = [... new Set(compra)];
  
  return(
    <>
    {unicos.map(elemento =>(
        <tr className='txtTBody'>
          <th style={{width:"50px", textAlign:"center"}}>
            <Cantidad objeto = {{compra, elemento}}/>
          </th>
          <th style={{width:"250px",textAlign:"initial"}}>
            {elemento.descripcionProducto}
          </th>
          <th style={{width:"200px", textAlign:"initial"}}>
            {elemento.tipoProducto}
          </th>
          <th style={{width:"150px", textAlign:"initial"}}>
            {elemento.marcaProducto}
          </th>
          <th style={{width:"100px", textAlign:"initial"}}>
            {elemento.medidaProducto}
          </th>
          <th style={{width:"50px", textAlign:"end", left:"-35px", position:"relative"}}>
            {elemento.precioProducto}
          </th>
          <th style={{width:"0px", textAlign:"end", left:"-15px", position:"relative"}}>
            <ValorTotal objeto = {{compra, elemento}}/>
          </th>
        </tr>
     ))} 
    </>      
  )
}


const Cantidad = ({objeto}) =>{

  const {compra, elemento} = objeto;
  const recuento = compra.filter(item => item.descripcionProducto === elemento.descripcionProducto).length;

  return(
    <span style={{width:"80px"}}>
        {recuento}
    </span>
  )

}

const ValorTotal = ({objeto}) =>{

  const {compra, elemento} = objeto;
  const recuento = compra.filter(item => item.descripcionProducto === elemento.descripcionProducto).length;

  let valorTotal = recuento * elemento.precioProducto

  return(
    <span style={{textAlign:"end"}}>
      {valorTotal.toFixed(2)}
    </span>
  )
}