import {useNavigate} from "react-router-dom";
import {supabase} from "../../supabaseClient";

import useApi from "../../hooks/useApi";

export default function RecetasAdmin() {
    const {data, cargando, recargar} = useApi();
    const navegar = useNavigate();

    async function EliminarReceta(id) {
        const confirmar = window.confirm("¿Seguro de eliminar la receta?")
        if(!confirmar) return;

        const {error} = await supabase.from("recipes").delete().eq("id", id);

        if(error) {
            console.log(error);
            alert("Error al eliminar la receta especificada")            
        } else {
            recargar()
        }
    }

    function RenderLista() {
        return data.map(
            (receta) => (
                <tr key={receta.id}>
                    <td>
                        <img
                            src={receta.image_url}
                            alt={receta.title}
                            width="60"
                        />
                    </td>
                    <td>{receta.title}</td>
                    <td>{receta.summary}</td>
                    <td>
                        <button className="Boton_ver_mas" onClick={() => navegar(`/admin/editar/${receta.id}`)}>
                            🛠 Editar
                        </button>
                        
                        <button className="Boton_ver_mas" onClick={() => EliminarReceta(receta.id)}>
                            ❌ Eliminar
                        </button>
                    </td>
                </tr>
            )
        )
    }

    return(
        <section className="AdminSeccionRecetas">
                {cargando ? (<p>Cargando...</p>) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Imagen</th>
                                <th>Título</th>
                                <th>Resumen</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {RenderLista()}
                        </tbody>
                    </table>
                )}
            </section>
    );
}