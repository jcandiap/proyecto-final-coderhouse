import express from 'express';
import UsuarioDaoMongoDB from '../dao/usuario/UsuarioDaoMongoDB.js';
import { userLogin, userRegister } from '../middleware/userMiddleware.js';
import { sendConfirmationEmail, sendNewRegister } from '../notifications/mailer.js';

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
        if( Boolean(result?.error) ) {
            res.status(400).send(result);
            return;
        }
        sendNewRegister(result.nombre, result.email);
        result ? res.status(200).send({ message: "Usuario registrado con exito!"}) : res.status(400).send({ error: 'Error al registrar usuario' });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

userRouters.post('/confirmar-compra', async (req, res) => {
    try {
        await sendConfirmationEmail('josecandiap@gmail.com', null);
        res.status(200).send({ message: 'Email enviado con exito '});
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
})

export default userRouters;