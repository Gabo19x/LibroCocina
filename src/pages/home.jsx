import { useEffect, useState } from "react";

import { supabase } from '../supabaseClient';
import UseApi from "../hooks/useApi";
import Header from "../components/generales/header";
import Footer from "../components/generales/footer";
import Paginacion from "../components/especificos/paginacion";
import Comida from "../components/especificos/comida";
import Buscador from "../components/especificos/buscador";

import {useAuth} from "../context/Autenticar";

import "../styles/home/home.css";

export default function Home() {
    const {data, cargando} = UseApi();
    const [recetaNueva, setRecetaNueva] = useState(null);

    /* FUNCION de flecha
        Con los datos de la API, filtra las recetas evitando la mas reciente,
        luego las mapea como componentes para ser usadas.
    */
    const listaRecetas = data
        .filter((receta) => receta.id !== recetaNueva.id)
        .map((receta) => (
            <Comida 
                tipo={true}
                comida={receta}
            />
        )
    )
    
    /* USEEFFECT
        Se ejecuta al inicio del renderizado, 
        y con una funcion asincrona: obtiene la receta mas nueva de supabase y se guarda.
    */
    useEffect(() => {
        async function ComidaNueva() {
            const {data: reciente} = await supabase
                .from("recipes").select("*").order("created_at", {ascending: false}).limit(1).single()

            setRecetaNueva(reciente);
        }

        ComidaNueva()
    }, [])
    

    const { user, profile, signOut, isAdmin } = useAuth()
    
    return(
        <>

            <Header principal={true} />
        
            <main className="Home_main">
                <p className="Home_main_parrafo">
                    Mi libro de cocina <span>El jardin culinario</span>, es un lugar para compartir mis recetas, pero principalmente, para tener a la mano un libro
                    de recetas. Para ser actualizado o consultado en diferentes ocasiones.
                    <hr />
                </p>
                

                <div className="Home_main_grid">
                    <Buscador/>

                    <div className="Paginacion">
                        <h2>⭐ Receta recién "horneada"</h2>

                        <section className="Paginacion_flex">
                            { 
                                ( cargando )
                                ? <h3 className="Mensaje_cargando">🥪 Cargando comida destacada...</h3>
                                : <Comida tipo={true} comida={recetaNueva} />
                            }
                        </section>

                        <h2>Recetas publicadas</h2>

                        <section className="Paginacion_flex">
                            { 
                                ( cargando )
                                ? <h3 className="Mensaje_cargando">🥪 Cargando comida...</h3>
                                : <Paginacion elementos={listaRecetas} />
                            }
                        </section>
                    </div>
                </div>
                
                
                

            </main>
            
            <Footer/>
        </>
    );
}