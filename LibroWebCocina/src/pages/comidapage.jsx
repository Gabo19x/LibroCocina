import {useParams} from "react-router-dom";

import UseApi from "../hooks/useApi";
import Header from "../components/generales/header";
import Footer from "../components/generales/footer";
import Comida from "../components/especificos/comida";
import { useEffect, useState } from "react";

export default function ComidaPagina() {
    const {id} = useParams();
    const {data, cargando} = UseApi();
    const [objFiltrado, setObjFiltrado] = useState([]);

    useEffect(() => {
        const filtro = data.find((record) => record.get("Id") == id );
        const algo = data.map((record) => console.log(`${record.get("Id")} =? ${id}`) );
        
        

        if(filtro) {
            setObjFiltrado(
                <Comida
                    tipo={false}
                    comida={filtro}
                />
            );
        } else {
            console.log("No se encontro la comida :C");
        }
    }, [data]);

    return(
        <>
            <Header></Header>

            {
                (cargando)
                ? <h3>🥪 Cargando comida...</h3>
                : objFiltrado
            }

            <Footer></Footer>
        </>
    );
}