import * as express from 'express';
import { Contenedor } from '../model/Contenedor';

const productRoutes = express.Router();

const validarProducto = (req, res, next) => {
    const producto = new Product(req.body);
    if(!producto.validarDatos()) {
        res.send({ error: 'Debe ingresar todos los datos para insertar un producto' });
    } else {
        next();
    }
}

productRoutes.get('/productos', (req, res) => {
    Contenedor.getAll().then((value) => {
        value.length > 0 ? res.send(value) : res.send({ error: 'Productos no encontrados' });
    }).catch(error => {
        res.send({ error: 'Error en la ejecución del servicio' });
    })
});

productRoutes.get('/productos/:id', (req, res) => {
    const id = req.params.id;
    !Boolean(id) && res.send({ error: 'Debe ingresar un id de producto' });
    Contenedor.getById(id).then((value) => {
        !!value ? res.send(value) : res.send({ error: 'Producto no encontrado '});
    }).catch(error => {
        res.send({ error: 'Error en la ejecución del servicio' });
    });
});

productRoutes.post('/productos', validarProducto, (req, res) => {
    const producto = new Product(req.body);
    Contenedor.save(producto).then((value) => {
        !!value ? res.send(value) : res.send({ error: 'Error al insertar producto' });
    }).catch(error => {
        res.send({ error: 'Error en la ejecución del servicio' });
    })
});

productRoutes.put('/productos/:id', validarProducto, (req, res) => {
    let id = req.params.id;
    !Boolean(id) && res.send({ error: 'Debe ingresar un id de producto' });
    id = Number(id);
    Contenedor.updateById({ ...req.body, id }).then((value) => {
        !!value ? res.send(value) : res.send({ error: 'Error al editar producto' });
    }).catch(error => {
        res.send({ error: 'Error en la ejecución del servicio' });
    });
});

productRoutes.delete('/productos/:id', (req, res) => {
    let id = req.params.id;
    !Boolean(id) && res.send({ error: 'Debe ingresar un id de producto' });
    id = Number(id);
    const response = Contenedor.deleteById(id);
    response ? res.send({ message: 'Elemento eliminado con exito!' }) : res.send({ error: 'Producto no encontrado' });
});

export default productRoutes;