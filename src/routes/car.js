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
        res.send({ error: 'Error en la ejecución del servicio' });
    })
});

carRoutes.delete('/:id', (req, res) => {
    const carManager = new CarManager('carrito.json');
    let id = req.params.id;
    !Boolean(id) && res.send({ error: 'Debe ingresar un id de un carrito' });
    id = Number(id);
    const response = carManager.deleteById(id);
    response ? res.send({ message: 'Elemento eliminado con exito!' }) : res.send({ error: 'Carrito no encontrado' });
});

carRoutes.get('/:id', (req, res) => {
    const carManager = new CarManager('carrito.json');
    const id = req.params.id;
    !Boolean(id) && res.send({ error: 'Debe ingresar un id de carrito' });
    carManager.getById(id).then((value) => {
        !!value ? res.send(value) : res.send({ error: 'Carrito no encontrado '});
    }).catch(error => {
        console.log(error);
        res.send({ error: 'Error en la ejecución del servicio' });
    });
});

export default carRoutes;