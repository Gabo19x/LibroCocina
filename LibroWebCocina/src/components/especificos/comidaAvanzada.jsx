import { useNavigate } from 'react-router-dom';

export default function ComidaAvanzada({comida}) {
    const navegar = useNavigate();

    function VerComida(id) {
        navegar(`/comida/${id}`);
    }

    console.log(comida);
    

    return(
        <section className='Card_comida_menu Avanzado' key={`food-${comida.Id}`}>
                
            <h3>{comida.Titulo}</h3>
            
            <div className='Contenedor_imagen'>
                <img src={comida.Imagen == undefined ? "_" : comida.Imagen[0].url} alt={comida.Titulo} />
                <p className={ (comida.Receta == "Receta publica") ? "Receta_publica": "Receta_propia" }> {comida.Receta} </p>
            </div>

            <div className='Contenedor_etiquetas'>
                {
                    comida.Etiquetas.map((etiq) => (<span>{` ▪ ${etiq} `}</span>))
                }
            </div>

            <button className='Boton_ver_mas' onClick={() => { VerComida(comida.Id); }}>Visitar</button>
        
        </section>
    )
}