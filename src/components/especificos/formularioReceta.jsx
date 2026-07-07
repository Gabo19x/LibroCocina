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
        if (!esEdicion) return;

        async function CargarReceta() {
            const {data, error} = await supabase
                .from("recipes").select("*").eq("id", id).single();

            if(error) {
                console.log(error)
                return
            }

            setTitulo(data.title)
            setResumen(data.summary)
            setImagen(data.image_url)
            setIngredientes(data.ingredients)
            setPasos(data.steps)
            setEtiquetas(data.tags)
        }
        
        CargarReceta()
        
    }, [id])

    async function CrearReceta(e) {
        e.preventDefault()
        setCargando(true)
        setError(null)

        try {
            let imageUrl = imagen
            console.log(`1: ${imagen}; 2: ${imageUrl}`);
            
            // 1. Subir la imagen a Storage si se eligio nueva al editar
            if(imagen instanceof File) {
                const fileName = `${Date.now()}-${imagen.name}`

                const { error: uploadError } = await supabase.storage
                .from('imagenes')
                .upload(fileName, imagen)

                if (uploadError) throw uploadError
                // 1.1 Obtener la URL pública de la imagen
                const { data: urlData } = supabase.storage
                .from('imagenes')
                .getPublicUrl(fileName)

                imageUrl = urlData.publicUrl
            }
            
            // 2. Guardar la receta en la base de datos
            const datosReceta = {
                title: titulo,
                summary: resumen,
                ingredients: ingredientes,
                steps: pasos,
                tags: etiquetas,
                image_url: imageUrl
            }

            if (imageUrl) datosReceta.image_url = imageUrl
            
            // 3. Si es editar receta o es crear receta nueva
            if(esEdicion) {
                const { error } = await supabase
                .from('recipes').update(datosReceta).eq("id", id)

                if (error) throw error;
            } else {
                if (!imageUrl) throw new Error('La imagen es obligatoria')
                
                const { error: insertError } = await supabase
                    .from('recipes').insert(datosReceta)

                if (insertError) throw insertError
            }

            navegar('/admin/dashboard')

        } catch (err) {
            setError('❌ Hubo un error al crear la receta')
            console.error(err)
        } finally {
            setCargando(false)
        }
    }

    return (
        <section className="AdminSeccionForm">
        <details className="DetailsAdmin" open>
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

                <label htmlFor="imagen">Imagen {esEdicion && <span>(dejar vacío para mantener la actual)</span>}</label>
                {esEdicion && !imagen && (
                    <img
                        src={imagen}
                        alt="Imagen actual"
                        width="120"
                    />
                )}
                <input 
                    type="file"
                    id="imagen"
                    accept="image/*"
                    onChange={(e) => setImagen(e.target.files[0])}
                    required={!esEdicion} 
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
        </section>
        
        
    )
}