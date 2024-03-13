import React from 'react';
import { PathServer } from '../../helpers/path';
import useFetch from '../../helpers/useFetch';

const Path = PathServer();
const Path2 = Path.ruta;

export const SearchTable = ({tableName}) => {

    const title = useFetch(
        `${Path2}/api/GetTable?tabla=${tableName}&SMercado=&TipoProd=`
    );
    if (title.loading || !title.result) {
        return "<Loading />";
    }
    const { data } = title.result;

    return (

        <>
            {data.map((elemento, indice) => (
                <option value={elemento.descripcion} id={elemento.descripcion}>{elemento.descripcion}
                    {elemento[1]}
                </option>
            ))}
        </>
    )
}
