import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from '../../supabaseClient'
import { useNavigate } from 'react-router-dom'

export default function FormularioReceta() {
    const {id} = useParams()
    const esEdicion = Boolean(id)
    const navegar = useNavigate()

    const [titulo, setTitulo] = useState("")
    const [resumen, setResumen] = useState("")
    const [imagen, setImagen] = useState(null)
    const [ingredientes, setIngredientes] = useState("")
    const [pasos, setPasos] = useState("")
    const [etiquetas, setEtiquetas] = useState([])

    const [cargando, setCargando] = useState(false)
    const [error, setError] = useState(null)

    function GuardarEtiquetas(e)  {
        const valores = Array.from(
            e.target.selectedOptions,
            (option) => option.value
        );

        setEtiquetas(valores)
    }

    useEffect(() => {
        if (esEdicion) {
        // cargar datos de la receta para prellenar el formulario
        }
    }, [id])

    async function CrearReceta(e) {
        e.preventDefault()
        setCargando(true)
        setError(null)

        try {
            // 1. Subir la imagen a Storage
            const file = imagen // el archivo del input type="file"
            const fileName = `${Date.now()}-${file.name}`

            const { error: uploadError } = await supabase.storage
            .from('imagenes')
            .upload(fileName, file)

            if (uploadError) throw uploadError

            // 2. Obtener la URL pública de la imagen
            const { data: urlData } = supabase.storage
            .from('imagenes')
            .getPublicUrl(fileName)

            const imageUrl = urlData.publicUrl

            // 3. Guardar la receta en la base de datos
            const { error: insertError } = await supabase
            .from('recipes')
            .insert({
                title: titulo,
                summary: resumen,
                ingredients: ingredientes,
                steps: pasos,
                tags: etiquetas,
                image_url: imageUrl
            })

            if (insertError) throw insertError

            navegar('/admin')

        } catch (err) {
            setError('❌ Hubo un error al crear la receta')
            console.error(err)
        } finally {
            setCargando(false)
        }
    }

    return (

        <details className="DetailsAdmin">
            <summary>{esEdicion ? '⚠ Editemos la receta' : '⭐ Crea una nueva receta'}</summary>

            <form onSubmit={CrearReceta} className="FormularioReceta">
                <label htmlFor="titulo">Titulo</label>
                <input 
                    type="text"
                    id="titulo"
                    placeholder="Huevo"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    required
                />
                

                <label htmlFor="resumen">Resumen</label>
                <textarea 
                    type="text" 
                    id="resumen"
                    placeholder="El huevo viene de la gallina" 
                    value={resumen}
                    onChange={(e) => setResumen(e.target.value)}
                    required
                >
                </textarea>

                <label htmlFor="imagen">Imagen</label>
                <input 
                    type="file"
                    id="imagen"
                    accept="image/*"
                    onChange={(e) => setImagen(e.target.files[0])}
                    required 
                />

                <label htmlFor="ingredientes">Ingredientes</label>
                <textarea
                    type="text" 
                    id="ingredientes"
                    placeholder="1 huevo, sal y pimienta" 
                    value={ingredientes}
                    onChange={(e) => setIngredientes(e.target.value)}
                    required
                >
                </textarea>

                <label htmlFor="pasos">Pasos</label>
                <textarea
                    type="text"
                    id="pasos"
                    placeholder="Cocina el huevo, o no?"
                    value={pasos}
                    onChange={(e) => setPasos(e.target.value)}
                    required
                >
                </textarea>

                <label htmlFor="etiquetas">Etiquetas de la receta</label>
                <select id="etiquetas" value={etiquetas} onChange={GuardarEtiquetas} multiple defaultValue={[]}>
                    <option selected disabled>Selecciona varias</option>
                    <option value="Internacional">⭐ Internacional</option>
                    <option value="Colombiana">💖 Colombiana</option>

                    <option value="Desayuno">☕ Desayuno</option>
                    <option value="Almuerzo">🍖 Almuerzo</option>
                    <option value="Cena">🌯 Cena</option>
                    <option value="Cualquier momento">🍘 Cualquier momento</option>
                    <option value="Acompañante">🍞 Acompañante</option>

                    <option value="Reconfortante">🌭 Reconfortante</option>
                    <option value="Complicada">🥘 Complicada</option>

                    <option value="Vegetariano">🥗 Vegetariano</option>
                    <option value="Saludable">🧆 Saludable</option>

                    <option value="Propia">🏆 Propia</option>
                    <option value="Publica">🔎 Publica</option>

                </select>
                <p>Tags: {etiquetas.join(", ")}</p>
                <p className="TextoAviso">  Para seleccionar varias, mantén Ctrl mientras haces clic. 💬</p>

                <button className="Boton_form" type="submit">{esEdicion ? 'Actualizar receta' : 'Crear receta'}</button>
            </form>
        </details>
        
    )
}