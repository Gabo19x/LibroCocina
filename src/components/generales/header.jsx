import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/Autenticar';

import "../../styles/header/header.css";

export default function Header({principal}) {
    const navegar = useNavigate();
    const { user, signOut } = useAuth();

    async function CerrarSesion() {
        await signOut();
        navegar('/');
    }

    function BotonesCuenta() {
        if(user) {
            return(
                <div className="BotonesCuenta">
                    <button className='Boton_menu' onClick={() => {navegar("/cuenta")}}>👨🏽‍🍳 Mi cuenta</button>
                    <button className='Boton_menu' onClick={() => {CerrarSesion()}}>❌ Cerrar sesion</button>
                </div>
            );
        } else {
            return (
                <div className="BotonesCuenta">
                    <button className='Boton_menu' onClick={() => {navegar("/registro")}}>👨🏽‍🍳 Crear cuenta</button>
                    <button className='Boton_menu' onClick={() => {navegar("/login")}}>🍖 Iniciar sesion</button>
                </div>
            );
        }
    }

    if(principal) {
        return (
            <header className="Header_principal">
                <h3>Mi libro de cocina:</h3>
                <h1>El jardin culinario</h1>
                <hr />
                <BotonesCuenta />
                <button className='Boton_menu' onClick={() => {navegar("/busqueda-avanzada")}}>Busqueda avanzada</button>
            </header>
        );
    } else {
        return(
            <header className="Header_secundario">
                <h2>El jardin culinario</h2>
                <button className='Boton_menu' onClick={() => { navegar("/") }}>Inicio</button>
            </header>
        );
    }
    
}