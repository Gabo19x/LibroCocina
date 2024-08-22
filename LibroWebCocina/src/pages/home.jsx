import { useEffect, useState } from "react";

import UseApi from "../hooks/useApi";
import Header from "../components/generales/header";
import Footer from "../components/generales/footer";
import Paginacion from "../components/especificos/paginacion";
import Comida from "../components/especificos/comida";
import Buscador from "../components/especificos/buscador";

import "../styles/home/home.css";

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
        
            <main className="Home_main">
                <p className="Home_main_parrafo">
                    Mi libro de cocina, es un lugar para compartir mis recetas, pero principalmente, para tener a la mano un libro
                    de recetas. Para ser actualizado o consultado en diferentes ocasiones.
                    <hr />
                </p>
                

                <div className="Home_main_grid">
                    <Buscador/>

                    <div className="Paginacion">
                        <h2>Recetas publicadas</h2>

                        <section className="Paginacion_grid">
                            { 
                                ( cargando )
                                ? <h3 className="Mensaje_cargando">🥪 Cargando comida...</h3>
                                : <Paginacion elementos={listaObjetos} />
                            }
                        </section>
                    </div>
                </div>
                
                
                

            </main>
            
            <Footer/>
        </>
    );
}