import ContenedorArchivos from "../../containers/ContenedorArchivos.js";

class ProductoDaoArchivos extends ContenedorArchivos {
    
    constructor(){
        super('./src/db/file/productos.json');
    }

    async desconectar(){
    }

}

export default ProductoDaoArchivos;