import bcrypt from 'bcrypt';

export async function userRegister (req, res, next) {
    const { email, password, name, address, age, phoneNumber, avatar } = req.body;
    if( !Boolean(email) ) {
        res.status(400).send({ status: 'error', message: 'You must enter an email' });
        return;
    }
    if( !Boolean(password) ) {
        res.status(400).send({ status: 'error', message: 'You must enter a password' });
        return;
    }
    if( !Boolean(name) ) {
        res.status(400).send({ status: 'error', message: 'ou must enter a name' });
        return;
    }
    if( !Boolean(address) ) {
        res.status(400).send({ status: 'error', message: 'You must enter an address' });
        return;
    }
    if( !Boolean(age) ) {
        res.status(400).send({ status: 'error', message: 'You must enter an age' });
        return;
    }
    if( !Boolean(phoneNumber) ) {
        res.status(400).send({ status: 'error', message: 'You must enter a phone number' });
        return;
    }
    if( !Boolean(avatar) ) {
        res.status(400).send({ status: 'error', message: 'You must enter an avatar' });
        return;
    }
    if( !Boolean(age) ) {
        res.status(400).send({ status: 'error', message: 'You must enter an age' });
    }
    next();
}

export async function validateConfirmPassword(req, res, next) {
    const { password, confirmPassword } = req.body;
    if( password !== confirmPassword ) {
        res.status(400).send({ error: 'The passwords entered must be the same' });
        return;
    }
    next();
}

export async function encryptPassword(req, res, next) {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    next();
}

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