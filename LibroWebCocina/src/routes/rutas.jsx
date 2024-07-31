import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "../pages/home";

const rutas = createBrowserRouter([
    {
        path: "/",
        element: <Home></Home>,
        errorElement: <div>Error 404</div>
    },
    {
        path: "/comida",
        element: <div>Comida</div>,
        children: [
            {
                path: ":id",
                element: <div>####</div>
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