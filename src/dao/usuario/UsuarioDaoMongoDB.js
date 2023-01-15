import ContenedorMongoDB from "../../containers/ContenedorMongoDB.js";
import bcrypt from 'bcrypt';

class UsuarioDaoMongoDB extends ContenedorMongoDB {

    constructor() {
        super("usuario");
    }

    async register(user) {
        try {
            const collection = await this.connect();
            user.password = await bcrypt.hash(user.password, 10);
            const insertedUser = collection.insertOne(user);
            await this.disconnect();
            return insertedUser;
        } catch (error) {
            console.log('Error al registrar usuario', error);
            throw new Error('Error al registrar usuario');
        }
    }

}

export default UsuarioDaoMongoDB;