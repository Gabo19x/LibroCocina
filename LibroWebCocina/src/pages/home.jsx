import { useEffect, useState } from "react";

import UseApi from "../hooks/useApi";
import Header from "../components/generales/header";
import Footer from "../components/generales/footer";
import Paginacion from "../components/especificos/paginacion";
import Comida from "../components/especificos/comida";

export default function Home() {
    const {data, cargando} = UseApi();
    
    const listaObjetos = data.map((record) => (
        <Comida 
            tipo={true}
            comida={record}
        />
    ));
    
    return(
        <>
            <Header principal={true} />
        
            <main>
                <p>
                    Mi libro de cocina, es un lugar para compartir mis recetas, pero principalmente, para yo tener a la mano un libro
                    de recetas. Para ser actualizado o consultado en diferentes ocasiones.
                </p>

                <section>
                    { 
                       ( cargando )
                       ? <h3>🥪 Cargando comida...</h3>
                       : <Paginacion elementos={listaObjetos} />
                    }
                    
                </section>
            </main>
            
            <Footer/>
        </>
    );
}