import  '../styles/CardMantenimientoTitulo.scss';

export const CardMantenimientoTitulo = ({NameClass, txtTitle, style, styleP}) =>{

    return(
        <div className={`p-2 asdf-warning ${NameClass}`} id = {NameClass} style = {style}>
            <p className="textcarDoc" style={styleP}>{txtTitle}</p>
        </div>
    )
}