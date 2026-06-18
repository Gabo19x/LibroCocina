import { useNavigate } from 'react-router-dom';

export default function ComidaAvanzada({comida}) {
    const navegar = useNavigate();

    function VerComida(id) {
        navegar(`/comida/${id}`);
    }
    
    console.log(comida.title);
    const esPublica = comida.tags?.includes("Publica")

    return(
        <section className='Card_comida_menu Avanzado' key={`food-${comida.id}`}>
                
            <h3>{comida.title}</h3>
            
            <div className='Contenedor_imagen'>
                <img src={comida.image_url || "_"} alt={comida.title} />
                <p className={ (esPublica) ? "Receta_publica": "Receta_propia" }> {(esPublica) ? "Receta publica": "Receta propia"} </p>
            </div>

            <div className='Contenedor_etiquetas'>
                {
                    comida.tags?.map((tag, i) => (
                        <span key={i}>• {tag}</span>
                    ))
                }
            </div>

            <button className='Boton_ver_mas' onClick={() => { VerComida(comida.id); }}>Visitar</button>
        
        </section>
    )
}