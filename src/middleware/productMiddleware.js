import { InsertProductDTO } from '../dto/ProductDTO.js';

export function validateProduct(req, res, next) {
    const product = new InsertProductDTO(req.body);
    if(!product.validateData()) {
        warnLogger.warn('Datos no completados al ingresar producto');
        res.status(400).send({ error: 'Debe ingresar todos los datos para insertar un producto' });
    } else {
        next();
    }
}

export function validateAdministrator(req, res, next) {
    let isAdmin = true;
    if( isAdmin ) {
        next();
    } else {
        warnLogger.warn(`ruta ${ req.baseUrl } método ${ req.method } no autorizada`);
        res.send({ error: -1, description: `ruta ${ req.baseUrl } método ${ req.method } no autorizada` })
    }
}

export function validateGetProduct(req, res, next) {
    if( !req.params.id ) {
        res.send({ error: -1, description: 'ID not specificated' });
    } else {
        next();
    }
}