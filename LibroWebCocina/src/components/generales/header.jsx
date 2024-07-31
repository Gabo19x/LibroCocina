export default function Header({principal}) {
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
            </header>
        );
    }
    
}