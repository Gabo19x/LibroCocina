import { useNavigate } from 'react-router-dom';

export default function Header({principal}) {
    const navegar = useNavigate();

    if(principal) {
        return (
            <header className="Header_principal">
                <h1>Super blog de MI libro de cocina</h1>
            </header>
        );
    } else {
        return(
            <header className="Header_secundario">
                <h2>Mi libro de cocina</h2>
                <button onClick={() => { navegar("/") }}>Inicio</button>
            </header>
        );
    }
    
}