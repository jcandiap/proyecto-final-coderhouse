export const userRegister = async (req, res, next) => {
    const { email, password, nombre, direccion, edad, numeroTelefono, avatar } = req.body;
    if( !Boolean(email) ) {
        res.status(400).send({ error: 'Debe ingresar un email' });
        return;
    }
    if( !Boolean(password) ) {
        res.status(400).send({ error: 'Debe ingresar una contraseña' });
        return;
    }
    if( !Boolean(nombre) ) {
        res.status(400).send({ error: 'Debe ingresar un nombre' });
        return;
    }
    if( !Boolean(direccion) ) {
        res.status(400).send({ error: 'Debe ingresar una direccion' });
        return;
    }
    if( !Boolean(edad) ) {
        res.status(400).send({ error: 'Debe ingresar una edad' });
        return;
    }
    if( !Boolean(numeroTelefono) ) {
        res.status(400).send({ error: 'Debe ingresar un numero de telefono' });
        return;
    }
    if( !Boolean(avatar) ) {
        res.status(400).send({ error: 'Debe ingresar un avatar' });
        return;
    }
    next();
};

export const userLogin = async (req, res, next) => {
    const { email, password } = req.body;
    if( !Boolean(email) ) {
        res.status(400).send({ error: 'Debe ingresar un email' });
        return;
    }
    if( !Boolean(password) ) {
        res.status(400).send({ error: 'Debe ingresar una contraseña' });
        return;
    }
    next();
}