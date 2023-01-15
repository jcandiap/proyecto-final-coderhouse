import ContenedorMongoDB from "../../containers/ContenedorMongoDB.js";
import bcrypt from 'bcrypt';

class UsuarioDaoMongoDB extends ContenedorMongoDB {

    constructor() {
        super("usuario");
    }

    async register(user) {
        try {
            user.password = await bcrypt.hash(user.password, 10);
            // const result = await this.db.insert(user);
            return user;
        } catch (error) {
            console.log('Error al registrar usuario', error);
            throw new Error('Error al registrar usuario');
        }
    }

}

export default UsuarioDaoMongoDB;