import React from 'react';

/*FUNCION
    Con una expresion regular, se dividira un texto en las secciones.
    Se creara varios parrafos para mejor visualizacion.
    @params texto a formatear
    @return un elemento con muchos parrafos
*/
function FormatearTexto({texto}) {
    const textoFormateado = texto.replace(/^\s*-\s?.*\n?/gm, '');
    
    const secciones = textoFormateado.split(/\n+/).filter(seccion => seccion.trim() !== '');
    
    return (
        <div className="TextoFormateado">

            {secciones.map((parte, index) => (
                <>
                    <div key={`Seccion-${index}`} className='TextoFormateado_parrafo'>
                        <p className="TextoFormateado_parte">{`${index + 1}.`}</p>
                        <br />
                        <p className="TextoFormateado_parte">{parte}</p>
                    </div>
                    <br />
                </>
                
            ))}
        </div>
    );
    
}

export default FormatearTexto;