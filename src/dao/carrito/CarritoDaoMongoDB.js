import mongoose from "mongoose";
import { optionsMongoDB } from "../../config/mongodb";
import ContenedorMongoDB from "../../containers/ContenedorMongoDB";

class CarritoDaoMongoDB extends ContenedorMongoDB{
    
    constructor(){
        super(this.connect(), 'carrito');
    }

    async connect() {
        try {
            mongoose.connect(`mongodb+srv://${ optionsMongoDB.connection.user }:${ optionsMongoDB.connection.password }@${ optionsMongoDB.connection.database }.7aqz8cq.mongodb.net/?retryWrites=true&w=majority`, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            console.log('Conectado a MongoDB');
            return mongoose;
        } catch (error) {
            console.log('Error al conectar a MongoDB: ', error);
            return null;
        }
    }

    async disconnect(){
        mongoose.disconnect();
    }

}

export default CarritoDaoMongoDB;