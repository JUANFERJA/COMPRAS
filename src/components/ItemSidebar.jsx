import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faGear, faHouse,  } from '@fortawesome/free-solid-svg-icons'
import useFetch from '../helpers/useFetch';
import { PathServer } from '../helpers/path';
import { Link } from 'react-router-dom';

const Path = PathServer();
const Path2 = Path.ruta;
export const ItemSidebar = ({orden}) => {

       const title = useFetch(
        `${Path2}/api/GetItemsSidebar?orden=${orden}`
       );
       if (title.loading || !title.result) {
         return "<Loading />";
       }
       const { data } = title.result;
console.log(data)

  return (
    <ul>
        <>
        {data.map((elemento, indice) => (
            <li className="btnli mt-3" id="btnli0"  key="hamburguer" style={{position:"relative", listStyleType:"none"}}>
                <button className="btnSidebar d-flex flex-row" id="hamburguer">
                    <Link to = {`/${elemento.descripcionItem}`}>
                    <span className='spanSidebar'>{elemento.descripcionItem}</span>
                    </Link>
                </button>
            </li>
         ))}   
        </>               
    </ul>
  )
}
