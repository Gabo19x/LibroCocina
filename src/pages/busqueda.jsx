import { useEffect, useId, useState } from "react";

import Header from "../components/generales/header";
import UseApi from "../hooks/useApi";
import Paginacion from "../components/especificos/paginacion";
import ComidaAvanzada from "../components/especificos/comidaAvanzada";

import "../styles/busquedaAvanzada/avanzado.css"

export default function Busqueda() {
    const formId = useId()
    const {data, cargando} = UseApi();

    const [filtro, setFiltro] = useState()
    const [lista, setLista] = useState([])

    function Cambio(event) {
        setFiltro(event.target.value)
    }

    useEffect(() => {
        const objs = data.filter((record) => {
            const etiq = record.get("Etiquetas") || []
            return etiq.includes(filtro)
        }).map((record) => record.fields)
        
        setLista( objs.map((record) => (
                <ComidaAvanzada
                    comida={record}
                />
            ))
        )

    }, [filtro])

    return(
        <>
            <Header principal={false} />

            <main>
                <section className="Busqueda">
                    <div className="Busqueda_seleccion">
                        <label htmlFor={formId}>Etiqueta de busqueda: </label>
    
                        <select className="Boton_form" name={formId} id={formId} onChange={Cambio}>
                            <option selected disabled>Selecciona alguna</option>
                            <option value="Internacional">⭐ Internacional</option>
                            <option value="Colombiana">💖 Colombiana</option>

                            <option value="Desayuno">☕ Desayuno</option>
                            <option value="Almuerzo">🍖 Almuerzo</option>
                            <option value="Cena">🌯 Cena</option>
                            <option value="Cualquier momento">🍘 Cualquier momento</option>
                            <option value="Acompañante">🍞 Acompañante</option>

                            <option value="Confort food">🌭 Confort food</option>
                            <option value="Heavy food">🥘 Heavy food</option>

                            <option value="Vegetariano">🥗 Vegetariano</option>
                            <option value="Saludable">🧆 Saludable</option>

                            <option value="Propia">🏆 Propia</option>
                            <option value="Publica">🔎 Publica</option>
                        </select>
                    </div>

                    <div className="Busqueda_etiquetas">
                        <h3>💬 Etiquetas</h3>
                        <hr />

                        <article>
                            <span>⭐ Internacional:</span>
                            <p>plato que no es propio o no es colombiano.</p>
                        </article>
                        <article>
                            <span>💖 Colombiana:</span>
                            <p>plato con origen o inspiracion en Colombia.</p>
                        </article>
                        
                        <article>
                            <span>☕ Desayuno:</span>
                            <p>plato ideal para la primera comida del día.</p>
                        </article>
                        <article>
                            <span>🍖 Almuerzo:</span>
                            <p>plato ideal para la comida del medio día.</p>
                        </article>
                        <article>
                            <span>🌯 Cena:</span>
                            <p>plato ideal para la ultima comida.</p>
                        </article>
                        <article>
                            <span>🍘 Cualquier momento:</span>
                            <p>plato ideal para cualquier hora del día.</p>
                        </article>
                        <article>
                            <span>🍞 Acompañante:</span>
                            <p>opcion para acompañar un plato.</p>
                        </article>
                        
                        <article>
                            <span>🌭 Confort food:</span>
                            <p>plato reconfortable y no muy difícil de hacer.</p>
                        </article>
                        <article>
                            <span>🥘 Heavy food:</span>
                            <p>plato relativamente complejo/demorado para elaborar.</p>
                        </article>
                        
                        <article>
                            <span>🥗 Vegetariano:</span>
                            <p>plato sin ingredientes de origen animal.</p>
                        </article>
                        <article>
                            <span>🧆 Saludable:</span>
                            <p>plato para el dia a dia, que es balanceado y nutritivo.</p>
                        </article>

                        <article>
                            <span>🏆 Propia:</span>
                            <p>plato parcialmente o totalmente creación propia.</p>
                        </article>
                        <article>
                            <span>🔎 Publica:</span>
                            <p>plato que no es creacion propia.</p>
                        </article>
                    </div>
                </section>

                
                <section className="Busqueda_resultados">
                    
                    {
                        (lista.length === 0) 
                        ? <h1>Empieza buscando algo</h1>
                        : <h1>Resultados</h1>
                    }
                    <div className="Resultados">
                        {
                            ( cargando )
                            ? <h3 className="Mensaje_cargando">...Cargando comida...</h3>
                            : lista
                        }
                    </div>
                    
                </section>
            </main>
            
        </>
    )
}