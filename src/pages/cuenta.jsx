import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useAuth } from '../context/Autenticar';
import { useNavigate } from 'react-router-dom';

import Header from '../components/generales/header';
import Footer from '../components/generales/footer';

import "../styles/cuenta/cuenta.css"

export default function Cuenta() {
    const { user, profile, isAdmin } = useAuth();
    const navegar = useNavigate();

    const [favoritos, setFavoritos] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        async function CargarFavoritos() {
            setCargando(true)

            const {data, error} = await supabase
                .from("favorites").select(`
                    id,
                    recipe_id,
                    recipes (
                        id,
                        title,
                        image_url,
                        summary
                    )
                `).eq("user_id", user.id)

            if(error) {
                console.log("Error la cargar: ", error)
            } else {
                setFavoritos(data)
            }

            setCargando(false)
        }

        CargarFavoritos()
    }, [user])

    async function QuitarFavorito(recetaId) {
        const {error} = await supabase
            .from("favorites").delete().eq("user_id", user.id).eq("recipe_id", recetaId)

        if (error) {
            console.error(error)
            return
        }

        setFavoritos(favoritos.filter(f => f.recipe_id !== recetaId))
    }

    function RenderFavoritos() {
        
        return favoritos.map(
            (favId) => (
                <tr key={favId.id}>
                    <td>
                        <img
                            src={favId.recipes.image_url}
                            alt={favId.recipes.title}
                            width="80"
                        />
                    </td>
                    <td>{favId.recipes.title}</td>
                    <td>{favId.recipes.summary}</td>
                    <td>
                        <button className="Boton_ver_mas" onClick={() => navegar(`/comida/${favId.recipes.id}`)}>
                            🍘 Ver receta
                        </button>
                        
                        <button className="Boton_ver_mas" onClick={() => QuitarFavorito(favId.recipe_id)}>
                            ❌ Quitar
                        </button>
                    </td>
                </tr>
            )
        )
        
    }

    return(
        <>
            <Header principal={false} />

            <section className="SeccionCuenta">
                <h2>Informacion de mi cuenta</h2>
                <div>
                    <p><strong>Usuario:</strong> {profile?.username}</p>
                    <p><strong>Email:</strong> {user?.email}</p>
                    <p><strong>Rol:</strong> {profile?.role}</p>
                </div>

                {isAdmin && (
                    <button className='Boton_ver_mas' onClick={() => navegar('/admin/dashboard')}>
                        ⚙️ Panel de administración
                    </button>
                )}
                
            </section>

            <section className="SeccionFavoritos">
                <h2>💖 Mis favoritos</h2>

                {cargando ? <h3 className="Mensaje_cargando">🥪 Cargando comida...</h3> : (
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
                            {RenderFavoritos()}
                        </tbody>
                    </table>
                )}

            </section>
            <Footer />
        </>
    ); 
}