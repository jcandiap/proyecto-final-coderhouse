import express from 'express';
import UsuarioDaoMongoDB from '../dao/usuario/UsuarioDaoMongoDB.js';
import { userLogin, userRegister } from '../middleware/userMiddleware.js';

const userRouters = express.Router();
const userManager = new UsuarioDaoMongoDB();

userRouters.post('/login', userLogin, async (req, res) => {
    const user = req.body;
    try {
        const result = await userManager.login(user);
        if(Boolean(result)) delete result.password;
        result ? res.status(200).send({ "message": "Usuario logueado de forma exitosa", user: result }) : res.status(400).send({ error: 'Usuario o contraseña incorrectos' });
    } catch (error) {
        res.status(400).send({ error: 'Error en la ejecución del servicio' });
    }
});

userRouters.post('/register', userRegister, async (req, res) => {
    const user = req.body;
    try {
        const result = await userManager.register(user);
        result ? res.status(200).send({ "message": "Usuario registrado con exito!"}) : res.status(400).send({ error: 'Error al registrar usuario' });
    } catch (error) {
        res.status(400).send({ error: 'Error en la ejecución del servicio' });
    }
});

export default userRouters;