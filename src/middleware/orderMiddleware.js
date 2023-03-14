export function validateGenerateOrder() {
    const { authorization } = req.headers;
    const { carId } = req.body;
    if( !authorization || !authorization.split(' ')[2] ) {
        res.status(400).send({ error: -1, description: 'You must enter an api key' });
        return;
    }
    if( !carId || carId.length < 23 ) {
        res.status(400).send({ error: -1, description: 'You must enter an valid car ID' });
        return;
    }
    next();   
}

export function validateGetOrder() {
    const { authorization } = req.headers;
    const { id } = req.params;
    if( !authorization || !authorization.split(' ')[2] ) {
        res.status(400).send({ error: -1, description: 'You must enter an api key' });
        return;
    }
    if( !id || id.length < 23 ) {
        res.status(400).send({ error: -1, description: 'You must enter an valid order ID' });
        return;
    }
    next();
    
}