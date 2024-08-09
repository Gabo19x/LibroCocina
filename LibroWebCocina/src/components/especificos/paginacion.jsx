import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

const elementosPorPagina = 2;

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
            
            {(elementosActuales != null)
                ? elementosActuales
                : <div>❌ No hay elementos para mostrar ❌</div>
            }
            
            <ReactPaginate
                breakLabel="°°°"
                nextLabel="->"
                onPageChange={handlePaginaClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="<-"
                renderOnZeroPageCount={null}
            />
        </>
            
            
    );
}