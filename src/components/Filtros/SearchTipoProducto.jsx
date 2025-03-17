import React from 'react';
import { PathServer } from '../../helpers/path';
import useFetch from '../../helpers/useFetch';

const Path = PathServer();
const Path2 = Path.ruta;

export const SearchTipoProducto = () => {

    const title = useFetch(
        `${Path2}/api/GetTipoProducto`
    );
    if (title.loading || !title.result) {
        return "<Loading />";
    }
    const { data } = title.result;

    return (

        <>
            {data.map((elemento, indice) => (
                <option value={elemento.descripcion} id={elemento.id} >{elemento.descripcion}

                </option>
            ))}
            <option value={""} id={""} selected>Todos</option>
        </>
    )
}
