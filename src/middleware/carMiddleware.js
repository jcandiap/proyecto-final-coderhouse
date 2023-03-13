export function validateId(req, res, next) {
    const id = req.params.id;
    if( !!id && id.length < 23 ) {
        res.status(400).send({ error: -1, description: 'You must enter a valid id' });
    }
    next();
}

export function validateGettingCar(req, res, next) {
    const { authorization } = req.headers;
    const { id } = req.params;
    if( !authorization || !authorization.split(' ')[2] ) {
        res.status(400).send({ error: -1, description: 'You must enter an api key' });
        return;
    }
    if( !id || id.length < 23 ) {
        res.status(400).send({ error: -1, description: 'You must enter a valid car id' });
        return;
    }
    next();
}

export function validateAddingProduct(req, res, next) {
    const { authorization } = req.headers;
    const { carId, productId, amount } = req.body;
    if( !authorization || !authorization.split(' ')[2] ) {
        res.status(400).send({ error: -1, description: 'You must enter an api key' });
        return;
    }
    if( !carId || carId.length < 23 ) {
        res.status(400).send({ error: -1, description: 'You must enter an valid car ID' });
        return;
    }
    if( !productId || productId.length < 23 ) {
        res.status(400).send({ error: -1, description: 'You must enter an valid product ID' });
        return;
    }
    if( !amount || amount < 0 ) {
        res.status(400).send({ error: -1, description: 'You must enter an valid product amount' });
        return;
    }
    next();
}

export function validateDeleteProduct() {
    const { authorization } = req.headers;
    const { carId, productId } = req.body;
    if( !authorization || !authorization.split(' ')[2] ) {
        res.status(400).send({ error: -1, description: 'You must enter an api key' });
        return;
    }
    if( !carId || carId.length < 23 ) {
        res.status(400).send({ error: -1, description: 'You must enter an valid car ID' });
        return;
    }
    if( !productId || productId.length < 23 ) {
        res.status(400).send({ error: -1, description: 'You must enter an valid product ID' });
        return;
    }
    next();
}

export function validateGetUser() {

}