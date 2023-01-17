import express from 'express';
import ProductoDaoMongoDB from '../dao/producto/ProductoDaoMongoDB.js';
import Product from '../model/Product.js';
import log4js from 'log4js';

const productRoutes = express.Router();

const productManager = new ProductoDaoMongoDB();

const isAdmin = true;

const logger = log4js.getLogger();
const warnLogger = log4js.getLogger('warn');
const errorLogger = log4js.getLogger('error');

const validarProducto = (req, res, next) => {
    const producto = new Product(req.body);
    if(!producto.validarDatos()) {
        warnLogger.warn('Datos no completados al ingresar producto');
        res.status(400).send({ error: 'Debe ingresar todos los datos para insertar un producto' });
    } else {
        next();
    }
}

const validarAdministrador = (req, res, next) => {
    if( isAdmin ) {
        next();
    } else {
        warnLogger.warn(`ruta ${ req.baseUrl } método ${ req.method } no autorizada`);
        res.send({ error: -1, descripcion: `ruta ${ req.baseUrl } método ${ req.method } no autorizada` })
    }
}

productRoutes.get('/', async (req, res) => {
    logger.info('[inicia metodo] obtener productos')
    try {
        const result = await productManager.getAll();
        res.status(200).send(result);
    } catch (error) {
        errorLogger.error(error.message);
        res.status(400).send({ error: 'Error en la ejecución del servicio' });
    }
});

productRoutes.get('/:id', async (req, res) => {
    logger.info('[inicia metodo] obtener producto por id')
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
        errorLogger.error(error.message);
        res.status(400).send({ error: 'Error en la ejecución del servicio' });
    }
});

productRoutes.post('/', [validarAdministrador, validarProducto], async (req, res) => {
    logger.info('[inicia metodo] ingresar producto')
    const producto = new Product(req.body);
    try {
        const newProduct = await productManager.save(producto);
        !!newProduct ? res.status(200).send(newProduct) : res.status(400).send({ error: 'Error al ingresar nuevo producto' });
    } catch (error) {
        errorLogger.error(error.message);
        res.status(400).send({ error: 'Error en la ejecución del servicio' });
    }
});

productRoutes.put('/:id', [validarAdministrador, validarProducto], async (req, res) => {
    logger.info('[inicia metodo] editar producto')
    let id = req.params.id;
    !Boolean(id) && res.send({ error: 'Debe ingresar un id de producto' });
    try {
        const response = await productManager.updateById({ ...req.body, id });
        !!response ? res.status(200).send(response) : res.status(400).send({ error: 'Error al editar producto' });
    } catch(error) {
        errorLogger.error(error.message);
        res.status(400).send({ error: 'Error en la ejecución del servicio' });
    }
});

productRoutes.delete('/:id', validarAdministrador, async (req, res) => {
    logger.info('[inicia metodo] eliminar por id')
    let id = req.params.id;
    !Boolean(id) && res.send({ error: 'Debe ingresar un id de producto' });
    try {
        const response = await productManager.deleteById(id);
        !!response ? res.status(200).send({ message: 'Elemento eliminado con exito!' }) : res.status(400).send({ error: 'Error al eliminar producto' });
    } catch(error) {
        errorLogger.error(error.message);
        res.status(400).send({ error: 'Error en la ejecución del servicio' });
    }
});

export default productRoutes;