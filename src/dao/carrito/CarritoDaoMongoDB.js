import ContenedorMongoDB from "../../containers/ContenedorMongoDB.js";

class CarritoDaoMongoDB extends ContenedorMongoDB{
    
    constructor(){
        super('carrito');
    }

}

export default CarritoDaoMongoDB;