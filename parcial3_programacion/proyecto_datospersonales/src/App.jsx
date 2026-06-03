import DatosPersonales from "./componentes/DatosPersonales";
import Contacto from "./componentes/Contacto";
import Estudios from "./componentes/Estudios";

function App() {
    return (
        <div>
            <h1>Mi Perfil Personal</h1>

            <DatosPersonales />
            <Contacto />
            <Estudios />
        </div>
    );
}

export default App;