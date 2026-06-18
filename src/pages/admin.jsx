import { Outlet } from "react-router-dom";

import Header from "../components/generales/header";
import Footer from "../components/generales/footer";

import "../styles/admin/admin.css"

export default function AdminPagina() {
    return (
        <>
            <Header principal={false}/>

            <section className="AdminSeccionForm">
                <Outlet/>
            </section>
            
            <section className="AdminSeccionRecetas">
                Dashboard
            </section>
            
            <Footer/>
        </>
    );
}