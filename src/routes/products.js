import express from 'express';
import Container from '../model/Container.js';
import Product from '../model/Producto.js';

const productRoutes = express.Router();


const validarProducto = (req, res, next) => {
    const producto = new Product(req.body);
    if(!producto.validarDatos()) {
        res.send({ error: 'Debe ingresar todos los datos para insertar un producto' });
    } else {
        next();
    }
}

productRoutes.get('/', (req, res) => {
    const container = new Container('productos.json');
    container.getAll().then((value) => {
        value.length > 0 ? res.send(value) : res.send({ error: 'Productos no encontrados' });
    }).catch(error => {
        console.log(error);
        res.send({ error: 'Error en la ejecución del servicio' });
    })
});

productRoutes.get('/:id', (req, res) => {
    const container = new Container('productos.json');
    const id = req.params.id;
    !Boolean(id) && res.send({ error: 'Debe ingresar un id de producto' });
    container.getById(id).then((value) => {
        !!value ? res.send(value) : res.send({ error: 'Producto no encontrado '});
    }).catch(error => {
        res.send({ error: 'Error en la ejecución del servicio' });
    });
});

productRoutes.post('/', validarProducto, (req, res) => {
    const container = new Container('productos.json');
    const producto = new Product(req.body);
    container.save(producto).then((value) => {
        !!value ? res.send(value) : res.send({ error: 'Error al insertar producto' });
    }).catch(error => {
        res.send({ error: 'Error en la ejecución del servicio' });
    })
});

productRoutes.put('/:id', validarProducto, (req, res) => {
    const container = new Container('productos.json');
    let id = req.params.id;
    !Boolean(id) && res.send({ error: 'Debe ingresar un id de producto' });
    id = Number(id);
    container.updateById({ ...req.body, id }).then((value) => {
        !!value ? res.send(value) : res.send({ error: 'Error al editar producto' });
    }).catch(error => {
        res.send({ error: 'Error en la ejecución del servicio' });
    });
});

productRoutes.delete('/:id', (req, res) => {
    const container = new Container('productos.json');
    let id = req.params.id;
    !Boolean(id) && res.send({ error: 'Debe ingresar un id de producto' });
    id = Number(id);
    const response = container.deleteById(id);
    response ? res.send({ message: 'Elemento eliminado con exito!' }) : res.send({ error: 'Producto no encontrado' });
});

export default productRoutes;