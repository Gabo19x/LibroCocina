import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

import "../../styles/paginacion/paginacion.css"

const elementosPorPagina = 6;

export default function Paginacion({ elementos }) { 
    
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + elementosPorPagina;
    const elementosActuales = elementos.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(elementos.length / elementosPorPagina);

    const handlePaginaClick = (event) => {
        const newOffset = (event.selected * elementosPorPagina) % elementos.length;
        setItemOffset(newOffset);
    };

    return (
        <>
            <section className='Paginacion_flex_elementos'>
                {(elementosActuales != null)
                    ? elementosActuales
                    : <p className='Mensaje_error'>❌ No hay elementos para mostrar ❌</p>
                }
            </section>
            
            <div className='Paginacion_flex_pag'>
                <ReactPaginate
                    breakLabel="°°°"
                    nextLabel="🢂"
                    onPageChange={handlePaginaClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="🢀"
                    renderOnZeroPageCount={null}
                />
            </div>
            
        </>
            
            
    );
}