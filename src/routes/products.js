import express from 'express';
import ProductoDaoArchivos from '../dao/producto/ProductoDaoArchivos.js';
import Product from '../model/Product.js';

const productRoutes = express.Router();

const productManager = new ProductoDaoArchivos();

const isAdmin = true;

const validarProducto = (req, res, next) => {
    const producto = new Product(req.body);
    if(!producto.validarDatos()) {
        res.status(400).send({ error: 'Debe ingresar todos los datos para insertar un producto' });
    } else {
        next();
    }
}

const validarAdministrador = (req, res, next) => {
    if( isAdmin ) {
        next();
    } else {
        res.send({ error: -1, descripcion: `ruta ${ req.baseUrl } método ${ req.method } no autorizada` })
    }
}

productRoutes.get('/', async (req, res) => {
    try {
        const result = await productManager.getAll();
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send({ error: 'Error en la ejecución del servicio' });
    }
});

productRoutes.get('/:id', async (req, res) => {
    const id = req.params.id;
    !Boolean(id) && res.send({ error: 'Debe ingresar un id de producto' });
    try {
        const result = await productManager.getById(id);
        if( !!result ) {
            res.status(200).send(result);
        } else {
            res.status(400).send({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(400).send({ error: 'Error en la ejecución del servicio' });
    }
});

productRoutes.post('/', [validarAdministrador, validarProducto], async (req, res) => {
    const producto = new Product(req.body);
    try {
        const newProduct = await productManager.save(producto);
        !!newProduct ? res.status(200).send(newProduct) : res.status(400).send({ error: 'Error al ingresar nuevo producto' });
    } catch (error) {
        res.status(400).send({ error: 'Error en la ejecución del servicio' });
    }
});

productRoutes.put('/:id', [validarAdministrador, validarProducto], async (req, res) => {
    let id = req.params.id;
    !Boolean(id) && res.send({ error: 'Debe ingresar un id de producto' });
    id = Number(id);
    try {
        const response = await productManager.updateById({ ...req.body, id });
        !!response ? res.status(200).send(response) : res.status(400).send({ error: 'Error al editar producto' });
    } catch(error) {
        res.status(400).send({ error: 'Error en la ejecución del servicio' });
    }
});

productRoutes.delete('/:id', validarAdministrador, async (req, res) => {
    let id = req.params.id;
    !Boolean(id) && res.send({ error: 'Debe ingresar un id de producto' });
    id = Number(id);
    try {
        const response = await productManager.deleteById(id);
        !!response ? res.status(200).send(response) : res.status(400).send({ error: 'Error al eliminar producto' });
    } catch(error) {
        res.status(400).send({ error: 'Error en la ejecución del servicio' });
    }
});

export default productRoutes;