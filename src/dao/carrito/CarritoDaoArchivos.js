import ContenedorArchivos from "../../containers/ContenedorArchivos.js";

class CarritoDaoArchivos extends ContenedorArchivos{
    
    constructor(){
        super('./src/db/file/carrito.json');
    }

    async desconectar(){
    }

}

export default CarritoDaoArchivos;