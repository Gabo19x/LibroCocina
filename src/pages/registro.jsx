import { useState } from 'react'
import { useAuth } from '../context/Autenticar'
import { useNavigate, Link } from 'react-router-dom'

import "../styles/usuario/usuario.css"

export default function Registro() {
    const { signUp } = useAuth()
    const navegar = useNavigate()

    const [usuario, setUsuario] = useState('')
    const [email, setEmail] = useState('')
    const [clave, setClave] = useState('')
    const [error, setError] = useState(null)
    const [cargando, setCargando] = useState(false)

    /* FUNCION asincrona
        Se encarga de crear una cuenta, lo que hace es:
        Guardar los datos.
        Llama al provider para usar una funcion de supabase para crear una cuenta (que esta en el archivo context/Autenticar)
        Verifica si hay error para notificar al usuario o seguir el proceso.
    */
    async function handleSubmit(event) {
        event.preventDefault()
        setCargando(true)
        setError(null)

        const {error} = await signUp(email, clave, usuario) // Aqui es donde se crea la cuenta

        if (error) {
            setError("❌ No se pudo crear una cuenta 😫")
            setCargando(false)
            console.log(error)
        } else {
            navegar("/Login")
            console.log(`Cuenta creada: ${usuario}`)
        }
    }

    return (
        <main className="Usuario">
            <header>
            </header>

            <section >
                <h2>Crear cuenta</h2>

                <form onSubmit={handleSubmit}> 
                    <input
                        type="text"
                        placeholder="Tu nombre de chef"
                        value={usuario}
                        onChange={(e) => {setUsuario(e.target.value)} }
                        required
                    >
                    </input>

                    <input
                        type="email"
                        placeholder="Ejemplo@Correo.com"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                        required
                    >
                    </input>

                    <input
                        type="password"
                        placeholder="Tu contraseña"
                        value={clave}
                        onChange={(e) => setClave(e.target.value) }
                        minLength={8}
                        required
                    >
                    </input>

                    {(error === null) ? "(.-.)" : error }

                    <button className="Boton_form" type="submit" disabled={cargando}>
                        {cargando ? "Creando cuenta...": "Crear"}
                    </button>
                </form>

                <p>
                    ¿Iniciar sesion? <Link to="/login">Iniciar sesion</Link>
                </p>

                <button className="Boton_form" onClick={() => { navegar("/") }}>Volver al inicio</button>
            </section>
        </main>
        
    )
}