import express from 'express';
import UsuarioDaoMongoDB from '../dao/usuario/UsuarioDaoMongoDB.js';
import { userRegister } from '../middleware/userMiddleware.js';

const userRouters = express.Router();
const userManager = new UsuarioDaoMongoDB();

userRouters.post('/login', async (req, res) => {
    const { email, password } = req.body;
    !Boolean(email) && res.status(400).send({ error: 'Debe ingresar un email' });
    !Boolean(password) && res.status(400).send({ error: 'Debe ingresar una contraseña' });
    try {
        const result = await userManager.login(email, password
        );
        result ? res.status(200).send(result) : res.status(400).send({ error: 'Usuario o contraseña incorrectos' });
    } catch (error) {
        res.status(400).send({ error: 'Error en la ejecución del servicio' });
    }
});

userRouters.post('/register', userRegister, async (req, res) => {
    const user = req.body;
    try {
        res.status(200).send(await userManager.register(user));
        // const result = await userManager.register(email, password);
        // result ? res.status(200).send(result) : res.status(400).send({ error: 'Usuario o contraseña incorrectos' });
    } catch (error) {
        // res.status(400).send({ error: 'Error en la ejecución del servicio' });
    }
});

export default userRouters;