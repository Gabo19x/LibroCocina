import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "../pages/home";
import ComidaPagina from "../pages/comidapage";
import BusquedaAvanzada from "../pages/busqueda"
import Login from "../pages/login"
import Registro from "../pages/registro"
import {RutaPrivada, RutaAdmin} from "./rutaProtegida"

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
    },
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/registro",
        element: <Registro />
    },
  // {
  //   path: "/favoritos",
  //   element: <RutaPrivada><Favoritos /></RutaPrivada>
  // },
  // {
  //   path: "/admin",
  //   element: <RutaAdmin><AdminPanel /></RutaAdmin>
  // }
    
]);

function MisRutas() {
    return(
        <RouterProvider router={rutas} />
    );
}

export default MisRutas;