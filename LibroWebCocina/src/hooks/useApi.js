import {useEffect, useState} from 'react';
import Airtable from "airtable";

/* HOOK
    Con los datos como la apikey y la tabla obtenemos todos los datos
    de manera asincrona, para ser enviados.
*/
function UseApi() {
    const [data, setData] = useState([]);
    const [cargando, setCargando] = useState(true);

    async function ObtenerApi() {
        var base = new Airtable({apiKey: 'patAtVTS3lRliYFb8.b9ce397dfc35a03d7af03452452b00fa499b91a9b53166a6a1f747804a98e07a'}).base('app2Env04v5yXb0rt')
        const tabla = base("Food");

        async function GetRecords() {
            const records = await tabla.select().firstPage();

            setData(records);
            setCargando(false);
        }

        GetRecords();
    }

    useEffect(() => {
        try {
            ObtenerApi();
        } catch (error) {
            console.log(error);
        }
    }, []);

    return data;
}

export default UseApi;