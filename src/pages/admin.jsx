import { Outlet, Link } from "react-router-dom";
import {useNavigate} from "react-router-dom";

import Header from "../components/generales/header";
import Footer from "../components/generales/footer";

import "../styles/admin/admin.css"

export default function AdminPagina() {
    const navegar = useNavigate();

    return (
        <>
            <Header principal={false}/>

            <section className="AdminSeccionInicial">
                <h2>Sistema de recetas</h2>
                <p>Panel de recetas para admin, se permite: ver recetas, crear nuevas, editarlas y eliminarlas.</p>
                
                <button className="Boton_ver_mas" onClick={() => navegar("/admin/dashboard")}>
                    Dashboard
                </button>
                
                <button className="Boton_ver_mas" onClick={() => navegar("/admin/crear")}>
                    Crear receta
                </button>
            </section>

            <Outlet/>
            
            <Footer/>
        </>
    );
}