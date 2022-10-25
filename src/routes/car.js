import express from 'express';
import CarritoDaoArchivos from '../dao/carrito/CarritoDaoArchivos.js';
import CarritoDaoFirebase from '../dao/carrito/CarritoDaoFirebase.js';
import CarritoDaoMongoDB from '../dao/carrito/CarritoDaoMongoDB.js';
import CarritoDaoSqlite from '../dao/carrito/CarritoDaoSqlite.js';
import Car from '../model/Car.js';

const carRoutes = express.Router();

const carManager = new CarritoDaoFirebase();

carRoutes.post('/', async (req, res) => {
    const car = new Car({});
    try {
        const newCar = await carManager.save(car);
        !!newCar ? res.status(200).send(newCar) : res.status(400).send({ error: 'Error al ingresar nuevo carrito' });
    } catch (error) {
        res.send({ error: 'Error en la ejecución del servicio' });
    }
});

carRoutes.get('/', async (req, res) => {
    try {
        const result = await carManager.getAll();
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send({ error: 'Error en la ejecución del servicio' });
    }
});

carRoutes.get('/:id', async (req, res) => {
    const id = req.params.id;
    !Boolean(id) && res.status(400).send({ error: 'Debe ingresar un id de carrito' });
    try {
        const result = await carManager.getById(id);
        if( !!result ) {
            res.status(200).send(result);
        } else {
            res.status(400).send({ error: 'Carrito no encontrado' });
        }
    } catch (error) {
        res.status(400).send({ error: 'Error en la ejecución del servicio' });
    }
});

carRoutes.delete('/:id', async (req, res) => {
    let id = req.params.id;
    !Boolean(id) && res.send({ error: 'Debe ingresar un id de un carrito' });
    id = Number(id);
    const response = await carManager.deleteById(id);
    response ? res.status(200).send({ message: 'Elemento eliminado con exito!' }) : res.status(400).send({ error: 'Carrito no encontrado' });
});

carRoutes.post('/addProductToCar', async (req, res) => {
    const { id, product } = req.body;
    !Boolean(id) && res.status(400).send({ error: 'Debe ingresar un id de carrito' });
    !Boolean(product) && res.status(400).send({ error: 'Debe ingresar un producto' });
    try {
        const result = await carManager.addProductToCar(id, product);
        result ? res.status(200).send({ message: 'Producto agregado con exito!' }) : res.status(400).send({ error: 'Carrito o producto no encontrado' });
    } catch (error) {
        res.status(400).send({ error: 'Error en la ejecución del servicio' });
    }
})

carRoutes.put('/', async (req, res) => {
    const updatedRegister = await carManager.updateById(req.body);
    if( !!updatedRegister ) {
        res.status(200).send(updatedRegister);
    } else {
        res.status(400).send({ error: 'Error al modificar el carrito' });
    }
});

export default carRoutes;