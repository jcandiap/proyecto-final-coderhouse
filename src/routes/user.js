import express from 'express';
import CarritoDaoMongoDB from '../dao/carrito/CarritoDaoMongoDB.js';
import UsuarioDaoMongoDB from '../dao/usuario/UsuarioDaoMongoDB.js';
import { userLogin, userRegister } from '../middleware/userMiddleware.js';
import { sendConfirmationEmail, sendNewRegister } from '../notifications/mailer.js';
import { sendMessageSms } from '../notifications/sms.js';
import { sendMessageWhatsapp } from '../notifications/whatsapp.js';

const userRouters = express.Router();
const userManager = new UsuarioDaoMongoDB();
const carManager = new CarritoDaoMongoDB();

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
        const { carId, userId } = req.body;
        if(!Boolean(carId)) {
            res.status(400).send({ error: 'Debe ingresar un id de carrito' });
            return;
        }
        let car = await carManager.getById(carId);
        if( !Boolean(car) ) {
            res.status(400).send({ error: 'No se encontro el carrito' });
            return;
        }
        if( car.products === undefined || car.products.length === 0 ) {
            res.status(400).send({ error: 'El carrito no tiene productos' });
            return;
        }
        if( car.userId !== userId || car.status !== 'pending' ) {
            res.status(400).send({ error: 'No se puede confirmar la compra' });
            return;
        }
        const { numeroTelefono, nombre, email } = await userManager.getById(userId);
        car.status = 'confirmed';
        await carManager.updateById(car);
        await sendConfirmationEmail(car.products, nombre, email);
        await sendMessageWhatsapp(car.products, nombre, email);
        await sendMessageSms(numeroTelefono);
        res.status(200).send({ message: 'Email enviado con exito '});
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
})

export default userRouters;