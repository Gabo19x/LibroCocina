import { useNavigate } from 'react-router-dom';

import "../../styles/header/header.css";

export default function Header({principal}) {
    const navegar = useNavigate();

    if(principal) {
        return (
            <header className="Header_principal">
                <h3>Mi libro de cocina:</h3>
                <h1>El jardin culinario</h1>
                <hr />
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