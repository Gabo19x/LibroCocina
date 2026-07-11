import {useParams} from "react-router-dom";
import { useEffect, useState } from "react";
import {supabase} from "../supabaseClient";

import UseApi from "../hooks/useApi";
import Header from "../components/generales/header";
import Footer from "../components/generales/footer";
import Comida from "../components/especificos/comida";

export default function ComidaPagina() {
    const {id} = useParams();
    const [cargando, setCargando] = useState(true)
    const [objFiltrado, setObjFiltrado] = useState(null);

    useEffect(() => {
        async function CargarReceta() {
            setCargando(true)

            const {data, error} = await supabase
                .from("recipes").select("*").eq("id", id).single();

            if(error) {
                console.log("No se encontro la receta: ", error)
            } else {
                setObjFiltrado(data)
            }

            setCargando(false)
        }

        CargarReceta()

    }, [id]);

    return(
        <>
            <Header></Header>

            {
                (cargando)
                ? <h3 className="Mensaje_cargando">🥪 Cargando comida...</h3>
                : <Comida tipo={false} comida={objFiltrado} />
            }

            <Footer></Footer>
        </>
    );
}