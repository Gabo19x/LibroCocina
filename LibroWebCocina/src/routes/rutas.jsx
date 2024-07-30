import { createBrowserRouter, RouterProvider } from "react-router-dom";

const rutas = createBrowserRouter([
    {
        path: "/",
        element: <div>Menu</div>,
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