import { useState } from "react";
import { useNavigate } from 'react-router-dom';

import UseApi from "../../hooks/useApi";

export default function Buscador() {
    const [comida, setComida] = useState("");
    const [filtro, setFiltro] = useState([]);
    const {data, cargando} = UseApi();

    const navegar = useNavigate();

    function VerComida(id) {
        navegar(`/comida/${id}`);
    }

    function Cambio(e) {
        setComida(e.target.value);
    }

    function Buscar(e) {
        e.preventDefault();

        const busqueda = data.filter((food) => food.get("Titulo").toLowerCase().includes(comida.toLowerCase()));     
        
        if(comida == "") {
            setFiltro(
                <p>❕ Busqueda poco especifica ❕</p>
            );
        } else if(busqueda.length == 0) {
            setFiltro(
                <p>❌ No se han encontrado recetas similares ❌</p>
            );
        } else if(busqueda.length >= 6) {
            setFiltro(
                <p>❕ Demasiados resultados, por favor sea más especifico ❕</p>
            );
        } else {
            setFiltro(
                busqueda.map((record) => (
                    <article key={`Food-mini-${record.get("Id")}`}>
                        <p>• {record.get("Titulo")}</p>
                        <button onClick={() => { VerComida(record.get("Id")); }}>➕</button>
                    </article>
                ))
            );
        }
        
    }

    return(
        <section>
            <form >
                <div>
                    Buscar: <input type="text" onChange={(event) => { Cambio(event); }}/>
                </div>

                <button type="submit" onClick={(event) => { Buscar(event); }}>🔎 Buscar</button>
            </form>

            <div>
            {
                (cargando && filtro == null)
                ? <></>
                : filtro
            }
            </div>
            
        </section>
    );
}