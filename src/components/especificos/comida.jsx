import { useNavigate } from 'react-router-dom';

import FormatearTexto from './formatearTexto';
import "../../styles/comida/comida.css";

// El tipo es, si es la presentacion en el Home una card.
// O, si es toda la informacion completa
export default function Comida({tipo, comida}) {
    const navegar = useNavigate();

    function VerComida(id) {
        navegar(`/comida/${id}`);
    }

    if(tipo) {
        return(
            <section className='Card_comida_menu' key={`food-${comida.get("Id")}`}>
                
                <h3>{comida.get("Titulo")}</h3>
                
                <div className='Contenedor_imagen'>
                    <img src={comida.get("Imagen") == undefined ? "_" : comida.get("Imagen")[0].url} alt={comida.get("Titulo")} />
                    <p className={ (comida.get("Receta") == "Receta publica") ? "Receta_publica": "Receta_propia" }> {comida.get("Receta")} </p>
                </div>

                <button className='Boton_ver_mas' onClick={() => { VerComida(comida.get("Id")); }}>Ver más</button>
            
            </section>
        );
    } else {
        return(
            <main className='Card_comida'>
                <h2>{comida.get("Titulo")}</h2>

                <div className='Contenedor_imagen'>
                    <img src={comida.get("Imagen") == undefined ? "_" : comida.get("Imagen")[0].url} alt={comida.get("Titulo")} />
                    <p className={ (comida.get("Receta") == "Receta publica") ? "Receta_publica": "Receta_propia" } > {comida.get("Receta")} </p>
                </div>

                <h3>🏆 Resumen 🏆</h3>
                <p className='Card_comida_parrafoResumen'>{comida.get("Resumen")}</p>

                <h3>🥗 Ingredientes 🥗</h3> 
                <FormatearTexto texto={comida.get("Ingredientes")}/>

                <h3>🛠 Metodo de elaboración 🛠</h3>
                <FormatearTexto texto={comida.get("Elaboracion")}/>
                <br />

                <h3>💬 Etiquetas</h3>
                {
                    comida.get("Etiquetas").map((etiq) => (<span>{etiq}</span>))
                }
            </main>
        );
    }
    
}