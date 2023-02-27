import Product from '../model/Product.js';

export function validarProducto(req, res, next) {
    const producto = new Product(req.body);
    if(!producto.validarDatos()) {
        warnLogger.warn('Datos no completados al ingresar producto');
        res.status(400).send({ error: 'Debe ingresar todos los datos para insertar un producto' });
    } else {
        next();
    }
}

export function validarAdministrador(req, res, next) {
    if( isAdmin ) {
        next();
    } else {
        warnLogger.warn(`ruta ${ req.baseUrl } método ${ req.method } no autorizada`);
        res.send({ error: -1, descripcion: `ruta ${ req.baseUrl } método ${ req.method } no autorizada` })
    }
}