import ContenedorMongoDB from "../../containers/ContenedorMongoDB.js";
import bcrypt from 'bcrypt';

class UsuarioDaoMongoDB extends ContenedorMongoDB {

    constructor() {
        super("usuario");
    }

    async register(user) {
        try {
            const collection = await this.connect();
            const userFound = await collection.findOne({ email: user.email });
            if( userFound ) {
                return { error: 'Usuario ya se encuentra registrado' };
            }
            user.password = await bcrypt.hash(user.password, 10);
            const insertedUser = collection.insertOne(user);
            await this.disconnect();
            return insertedUser;
        } catch (error) {
            console.log('Error al registrar usuario', error);
            throw new Error('Error al registrar usuario');
        }
    }

    async login(user) {
        try {
            const collection = await this.connect();
            const userFound = await collection.findOne({ email: user.email });
            await this.disconnect();
            if (!userFound) return null;
            const passwordMatch = await bcrypt.compare(user.password, userFound.password);
            if (!passwordMatch) return null;
            return userFound;
        } catch (error) {
            console.log('Error al iniciar sesión', error);
            throw new Error('Error al iniciar sesión');
        }
    }
}

export default UsuarioDaoMongoDB;