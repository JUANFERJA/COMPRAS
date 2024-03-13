import { PathServer } from "./path";


const Path = PathServer();
const Path2 = Path.ruta;

export const functions = () => {

 const activeModalSection = ( orden ) =>{
        
        let btnAction = document.getElementById(orden);
        btnAction.click();
 } 

 const deleteRegistro = async(tabla, id, setflagAll) =>{
 
    console.log(`deberia eliminar el registro con el id: ${id} de la tabla: ${tabla}`)
    let url = `${Path2}/api/DeleteRegistro?tabla=${tabla}&id=${id}`;
    await fetch(url);
    setflagAll(false);
    setTimeout(() => {
      setflagAll(true);
    }, 500);
 }

  return {
    activeModalSection,
    deleteRegistro,
  }
}
