import React from 'react'
import { SearchSuperMercado } from './SearchSuperMercado';
import { SearchTipoProducto } from './SearchTipoProducto';

export const Filtros = ({setSearch, setidSuperMercado, settipoProd}) => {
    const onAddSM = ({target}) =>{

        setidSuperMercado(target.value);
      }
  
      const onAddTipo = ({target}) =>{
  
        settipoProd(target.value);
      }
  
      const onAddSearch = ({target}) =>{
        setSearch(target.value);
      }

  return (
        <div className='d-flex filtros'>
        <div className='filtro'>
            <label>Super Mercado</label>
            <select className="form-select selectTipo" onChange={onAddSM} >
                <SearchSuperMercado opDefault="Todos"/>
            </select>
        </div>
        
        <div className='filtro'>
            <label>Tipo de Producto</label>
            <select className="form-select selectTipo" onChange={onAddTipo} >
                <SearchTipoProducto  opDefault="Todos"/>
            </select>
        </div>   
        <div className="d-flex flex-row buscadorProducto">
            <input class="form-control barraBusqueda" type="search" placeholder="Search" 
                    aria-label="Search" onChange={onAddSearch}/>
        </div> 

        </div>
  )
}
