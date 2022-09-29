import express from 'express';
import CarManager from '../manager/CarManager.js';
import Car from '../model/Car.js';

const carRoutes = express.Router();

carRoutes.post('/', (req, res) => {
    const carManager = new CarManager('carrito.json');
    const car = new Car({});
    carManager.save(car).then((value) => {
        !!value ? res.send(value) : res.send({ error: 'Error al ingresar nuevo carrito' });
    }).catch(error => {
        console.log(error);
        res.send({ error: 'Error en la ejecución del servicio' });
    })
});

export default carRoutes;