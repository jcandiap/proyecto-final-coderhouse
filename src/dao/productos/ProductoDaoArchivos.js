import ContenedorArchivos from "../../containers/ContenedorArchivo.js";

class ProductoDaoArchivos extends ContenedorArchivos{
    
    constructor(){
        super('db/file/productos.json');
    }

    async desconectar(){
    }

}

export default ProductoDaoArchivos;