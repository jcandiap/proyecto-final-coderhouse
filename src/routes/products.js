import express from 'express';
import ProductManager from '../manager/ProductManager.js';
import Product from '../model/Product.js';

const productRoutes = express.Router();

const isAdmin = false;

const validarProducto = (req, res, next) => {
    const producto = new Product(req.body);
    if(!producto.validarDatos()) {
        res.send({ error: 'Debe ingresar todos los datos para insertar un producto' });
    } else {
        next();
    }
}

const validarAdministrador = (req, res, next) => {
    if( isAdmin ) {
        next();
    } else {
        res.send({ error: `ruta ${ req.baseUrl } método ${ req.method } no autorizada` })
    }
}

productRoutes.get('/', (req, res) => {
    const productManager = new ProductManager('productos.json');
    productManager.getAll().then((value) => {
        value.length > 0 ? res.send(value) : res.send({ error: 'Productos no encontrados' });
    }).catch(error => {
        console.log(error);
        res.send({ error: 'Error en la ejecución del servicio' });
    })
});

productRoutes.get('/:id', (req, res) => {
    const productManager = new ProductManager('productos.json');
    const id = req.params.id;
    !Boolean(id) && res.send({ error: 'Debe ingresar un id de producto' });
    productManager.getById(id).then((value) => {
        !!value ? res.send(value) : res.send({ error: 'Producto no encontrado '});
    }).catch(error => {
        res.send({ error: 'Error en la ejecución del servicio' });
    });
});

productRoutes.post('/', [validarAdministrador, validarProducto], (req, res) => {
    const productManager = new ProductManager('productos.json');
    const producto = new Product(req.body);
    productManager.save(producto).then((value) => {
        !!value ? res.send(value) : res.send({ error: 'Error al insertar producto' });
    }).catch(error => {
        res.send({ error: 'Error en la ejecución del servicio' });
    })
});

productRoutes.put('/:id', [validarAdministrador, validarProducto], (req, res) => {
    const productManager = new ProductManager('productos.json');
    let id = req.params.id;
    !Boolean(id) && res.send({ error: 'Debe ingresar un id de producto' });
    id = Number(id);
    productManager.updateById({ ...req.body, id }).then((value) => {
        !!value ? res.send(value) : res.send({ error: 'Error al editar producto' });
    }).catch(error => {
        res.send({ error: 'Error en la ejecución del servicio' });
    });
});

productRoutes.delete('/:id', validarAdministrador, (req, res) => {
    const productManager = new ProductManager('productos.json');
    let id = req.params.id;
    !Boolean(id) && res.send({ error: 'Debe ingresar un id de producto' });
    id = Number(id);
    const response = productManager.deleteById(id);
    response ? res.send({ message: 'Elemento eliminado con exito!' }) : res.send({ error: 'Producto no encontrado' });
});

export default productRoutes;