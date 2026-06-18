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

    const esPublica = comida.tags?.includes("Publica")

    if(tipo) {
        return(
            <section className='Card_comida_menu' key={`food-${comida.id}`}>
                
                <h3>{comida.title}</h3>
                
                <div className='Contenedor_imagen'>
                    <img src={comida.image_url || "_"} alt={comida.title} />
                    <p className={ (esPublica) ? "Receta_publica": "Receta_propia" }> {(esPublica) ? "Receta publica": "Receta propia"} </p>
                </div>

                <button className='Boton_ver_mas' onClick={() => { VerComida(comida.id); }}>Ver más</button>
            
            </section>
        );
    } else {
        return(
            <main className='Card_comida'>
                <h2>{comida.title}</h2>

                <div className='Contenedor_imagen'>
                    <img src={comida.image_url || "_"} alt={comida.title} />
                    <p className={ (esPublica) ? "Receta_publica": "Receta_propia" }> {(esPublica) ? "Receta publica": "Receta propia"} </p>
                </div>

                <h3>🏆 Resumen</h3>
                <p className='Card_comida_parrafoResumen'>{comida.summary}</p>

                <h3>🥗 Ingredientes</h3> 
                <FormatearTexto texto={comida.ingredients}/>

                <h3>🛠 Metodo de elaboración</h3>
                <FormatearTexto texto={comida.steps}/>
                <br />

                <h3>💬 Etiquetas</h3>
                {
                    comida.tags?.map((tag, i) => (
                        <span key={i}>{tag}</span>
                    ))
                }
            </main>
        );
    }
    
}