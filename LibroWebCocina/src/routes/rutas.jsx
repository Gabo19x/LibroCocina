import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "../pages/home";
import ComidaPagina from "../pages/comidapage";
import BusquedaAvanzada from "../pages/busqueda"

const rutas = createBrowserRouter([
    {
        path: "/",
        element: <Home></Home>,
        errorElement: <div>Error 404</div>
    },
    {
        path: "/comida",
        children: [
            {
                path: ":id",
                element: <ComidaPagina/>
            }
        ]
    },
    {
        path:"/busqueda-avanzada",
        element: <BusquedaAvanzada/>,
        errorElement: <div>Error 404</div>
    }
    
]);

function MisRutas() {
    return(
        <RouterProvider router={rutas} />
    );
}

export default MisRutas;