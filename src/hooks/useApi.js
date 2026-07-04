import {useCallback, useEffect, useState} from 'react';
// import Airtable from "airtable";
import {supabase} from "../supabaseClient";

/* HOOK
    Pide los datos a la tabla en supabase y los envia para ser usados
    return: datos para usar; si esta cargando
*/
function UseApi() {
    const [data, setData] = useState([]);
    const [cargando, setCargando] = useState(true);

    const ObtenerApi = useCallback(async () => {
        setCargando(true)
        try {
            const {data, error}  = await supabase
                .from("recipes").select("*").order("created_at", {ascending: false});

            setData(data)
            
        } catch (error) {
            console.log(error);
            
        } finally {
            setCargando(false)
        }
    }, []);
    
    useEffect(() => { ObtenerApi() }, [ObtenerApi])

    return {data, cargando, recargar: ObtenerApi};
}

export default UseApi;