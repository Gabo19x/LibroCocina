import { useState } from "react";
import { useNavigate } from 'react-router-dom';

import UseApi from "../../hooks/useApi";

import "../../styles/buscador/buscador.css";

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
                <p className="Mensaje_cargando">❕ Busqueda poco especifica ❕</p>
            );
        } else if(busqueda.length == 0) {
            setFiltro(
                <p className="Mensaje_error ">❌ No se han encontrado recetas similares ❌</p>
            );
        } else if(busqueda.length >= 6) {
            setFiltro(
                <p className="Mensaje_cargando">❕ Demasiados resultados, por favor sea más especifico ❕</p>
            );
        } else {
            setFiltro(
                busqueda.map((record) => (
                    <article className="Buscador_resultado" key={`Food-mini-${record.get("Id")}`}>
                        <p>🥪 {record.get("Titulo")}</p>
                        <button className="Boton_ver_mas_reducido" onClick={() => { VerComida(record.get("Id")); }}>➕</button>
                    </article>
                ))
            );
        }
        
    }

    return(
        <section className="Buscador">
            <form >
                <div>
                    <h3>Buscar: </h3> 
                    <input type="text" onChange={(event) => { Cambio(event); }}/>
                </div>

                <button className="Boton_form" type="submit" onClick={(event) => { Buscar(event); }}>🔎 Buscar</button>
                <hr />
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