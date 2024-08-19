import { useNavigate } from 'react-router-dom';

// El tipo es, si es la presentacion en el Home una card.
// O, si es toda la informacion completa
export default function Comida({tipo, comida}) {
    const navegar = useNavigate();

    function VerComida(id) {
        navegar(`/comida/${id}`);
    }

    if(tipo) {
        return(
            <section key={`food-${comida.get("Id")}`}>
                
                <h3>{comida.get("Titulo")}</h3>
                <div>
                    <img src={comida.get("Imagen") == undefined ? "_" : comida.get("Imagen")[0].url} alt="Imagen de comida" />
                    <p>{comida.get("Receta")}</p>
                </div>

                <button onClick={() => { VerComida(comida.get("Id")); }}>Ver más</button>
                <br />
            
            </section>
        );
    } else {
        return(
            <main>
                <h2>{comida.get("Titulo")}</h2>

                <div>
                    <img src={comida.get("Imagen") == undefined ? "_" : comida.get("Imagen")[0].url} alt="Imagen de comida" />
                    <p>{comida.get("Receta")}</p>
                </div>

                <h3>Resumen</h3>
                <p>{comida.get("Resumen")}</p>

                <h3>Ingredientes</h3>
                <p>{comida.get("Ingredientes")}</p>

                <h3>Metodo de elaboración</h3>
                <p>{comida.get("Elaboracion")}</p>
                
                <br />
                {
                    (comida.get("Recursos") == null || comida.get("Elaboracion") == "...")
                    ? <div></div>
                    : <p>{comida.get("Recursos")}</p>
                }
            </main>
        );
    }
    
}