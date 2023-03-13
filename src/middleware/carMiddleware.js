export function validateId(req, res, next) {
    const id = req.params.id;
    if( !!id && id.length < 23 ) {
        res.status(400).send({ error: -1, description: 'You must enter a valid id' });
    }
    next();
}

export function validateGettingCar(req, res, next) {
    const { userId, carId } = req.body;
    if( !userId || userId.length < 23 ) {
        res.status(400).send({ error: -1, description: 'You must enter a valid user id' });
        return;
    }
    if( !carId || carId.length < 23 ) {
        res.status(400).send({ error: -1, description: 'You must enter a valid car id' });
        return;
    }
    next();
}

export function validateAddingProduct() {

}

export function validateGetUser() {

}