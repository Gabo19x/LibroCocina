import { Outlet, Link } from "react-router-dom";
import {supabase} from "../supabaseClient";
import {useNavigate} from "react-router-dom";
import useApi from "../hooks/useApi";

import Header from "../components/generales/header";
import Footer from "../components/generales/footer";

import "../styles/admin/admin.css"

export default function AdminPagina() {
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

    return (
        <>
            <Header principal={false}/>

            <section className="AdminSeccionInicial">
                <h2>Sistema de recetas</h2>
                <p>Panel de admin. Disponible: crear recetas, ver un dashboard de recetas, editarlas o eliminarlas.</p>
                
                <button className="Boton_ver_mas" onClick={() => navegar("/admin/crear")}>
                    Crear receta
                </button>
            </section>

            <section className="AdminSeccionForm">
                <Outlet/>
            </section>
            
            
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
            
            <Footer/>
        </>
    );
}