import { useEffect, useState } from "react";

import UseApi from "../hooks/useApi";
import Header from "../components/generales/header";
import Footer from "../components/generales/footer";
import Paginacion from "../components/especificos/paginacion";

export default function Home() {
    const {data, cargando} = UseApi();
    
    const listaObjetos = data.map((record) => (
        
        <div key={`food-${record.get("Id")}`}>
            <p>{record.get("Titulo")}</p>
            <p>{record.get("Receta")}</p>
            <img src={record.get("Imagen") == undefined ? "_" : record.get("Imagen")[0].url} alt="Imagen de comida" />
            <p>{record.get("Resumen") }</p>
            <br />
        </div>
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
                       cargando 
                       ? <h2>🥪 Cargando comida...</h2>
                       : <Paginacion elementos={listaObjetos} />
                    }
                    
                </section>
            </main>
            
            <Footer/>
        </>
        
    );
}