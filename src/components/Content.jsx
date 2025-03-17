import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import { LoginPage } from '../Pages/LoginPage';
import { MantenimientoPage } from '../Pages/MantenimientoPage';
import { CrearUsuariosPage } from '../Pages/CrearUsuariosPage';
import { UpdateRegistro } from '../Pages/UpdateRegistro';
import { HomePage } from '../Pages/HomePage';
import { TusComprasPage } from '../Pages/TusComprasPage';
import { CrearComprasPage } from '../Pages/CrearComprasPage';
import { HistorialCompras } from '../Pages/HistorialCompras';
import { Recetas } from '../Pages/Recetas';


export const Content = ({items}) => {

  if (items.loading || !items.result) {return "<Loading />";}        
      const { data } = items.result;
 

  return (
   
    <Routes>
        
        <Route  path={`/Login`} key={`regionrouter456`} element={<LoginPage/>}>     
        </Route>
        {data.map(item => (
           <>{item.ordenItem === "2" ? (
               <Route path={`/${item.descripcionItem}`}
                  element={<MantenimientoPage item={item} />}>
               </Route>
               ) : (
                <>
                {
                  item.descripcionItem === "Tus Compras" && (
                    <Route path={`/${item.descripcionItem}`}
                      element={<TusComprasPage item={item}/>}>
                    </Route>
                  )
                }
                {
                  item.descripcionItem === "Nueva Compra" && (
                    <Route path={`/${item.descripcionItem}`}
                      element={<CrearComprasPage item={item}/>}>
                    </Route>
                  )
                }
                {
                  item.descripcionItem === "Historial de Compras" && (
                    <Route path={`/${item.descripcionItem}`}
                      element={<HistorialCompras item={item}/>}>
                    </Route>
                  )
                }   
                {
                  item.descripcionItem === "Recetas" && (
                    <Route path={`/${item.descripcionItem}`}
                      element={<Recetas item={item}/>}>
                    </Route>
                  )
                }              
                </>
              
              )
            }
           </>
        ))}  
        
        {data.map(item => (
        <>{item.ordenItem === "2" ? (
        <Route  path={`/Crear${item.descripcionItem}`} 
                element={<CrearUsuariosPage item = {item}/>}>     
        </Route>
        ) : (
        <Route  path={`/Crear${item.descripcionItem}`} 
                element={<CrearComprasPage item = {item}/>}>     
        </Route>
        )
        }
        
        </>
        
        
        ))}

        <Route  path={`/UpdateRegistro/:tabla/:id`} 
                element={<UpdateRegistro />}>     
        </Route>
        
    </Routes>
   
  );
}
