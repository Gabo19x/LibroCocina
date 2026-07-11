import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import { useAuth } from '../../context/Autenticar';

import FormatearTexto from './formatearTexto';
import "../../styles/comida/comida.css";

// El tipo es, si es la presentacion en el Home una card.
// O, si es toda la informacion completa
export default function Comida({tipo, comida}) {
    const navegar = useNavigate();
    const { user:usuario } = useAuth();

    const [esFavorito, setEsFavorito] = useState(false);
    const [cargando, setCargando] = useState(false);

    const esPublica = comida.tags?.includes("Publica")

    /* USEEFFECT
        Verifica con la DB si ya esta en favoritos.
     */
    useEffect(() => {
        if(!usuario || tipo) return

        async function Verificar() {
            const {data} = await supabase
                .from("favorites").select("id").eq("user_id", usuario.id).eq("recipe_id", comida.id).maybeSingle()

            setEsFavorito(!!data)
        }

        Verificar()
    }, [usuario, comida.id])

    /* FUNCION asincrona
        Quita de favoritos si ya estaba en favoritos.
        O agrega a favoritos.
    */
    async function Favorito() {
        if(!usuario) return
        setCargando(true)

        if(esFavorito) { // Quitar de favoritos
            await supabase.from("favorites").delete().eq("user_id", usuario.id).eq("recipe_id", comida.id)
            setEsFavorito(false)
        } else { // Agregar a favoritos
            await supabase.from("favorites")
                .insert({
                    user_id: usuario.id,
                    recipe_id: comida.id
                })

            setEsFavorito(true)
        }

        setCargando(false)
    }

    function VerComida(id) {
        navegar(`/comida/${id}`);
    }

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

                {usuario ? (
                    <button className='Boton_ver_mas'
                        onClick={Favorito}
                        disabled={cargando}
                    >
                        {cargando
                            ? "..."
                            : esFavorito
                                ? "🤍 Quitar de favoritos"
                                : "❤️ Mi favorito!"
                        }
                    </button>
                ) : (
                    <p>
                        <a href="/login">Inicia sesión</a> para guardar esta receta
                    </p>
                )}

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