import ContenedorFirebase from "../../containers/ContenedorFirebase.js";

class ProductoDaoFirebase extends ContenedorFirebase{
    
    constructor(){
        super('productos');
    }

}

export default ProductoDaoFirebase;