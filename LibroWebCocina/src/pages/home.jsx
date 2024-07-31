import Header from "../components/generales/header";
import Footer from "../components/generales/footer";

export default function Home() {
    return(

        <>
            <Header principal={true} />
        
            <main>
                <p>
                    Mi libro de cocina, es un lugar para compartir mis recetas, pero principalmente, para yo tener a la mano un libro
                    de recetas. Para ser actualizado o consultado en diferentes ocasiones.
                </p>


            </main>
            
            <Footer/>
        </>
        
    );
}