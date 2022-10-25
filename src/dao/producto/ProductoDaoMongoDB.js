import ContenedorMongoDB from "../../containers/ContenedorMongoDB.js";

class ProductoDaoMongoDB extends ContenedorMongoDB{
    
    constructor(){
        super('productos');
    }

}

export default ProductoDaoMongoDB;