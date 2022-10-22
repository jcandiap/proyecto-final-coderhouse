import ContenedorArchivos from "../../containers/ContenedorArchivo.js";

class CarritoDaoArchivos extends ContenedorArchivos{
    
    constructor(){
        super('db/file/carrito.json');
    }

    async desconectar(){
    }

}

export default CarritoDaoArchivos;