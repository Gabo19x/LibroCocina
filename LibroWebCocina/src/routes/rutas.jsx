import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "../pages/home";
import ComidaPagina from "../pages/comidapage";

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
    }
    
]);

function MisRutas() {
    return(
        <RouterProvider router={rutas} />
    );
}

export default MisRutas;