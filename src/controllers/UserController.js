import jwt from 'jsonwebtoken';
import { errorLogger, logger } from '../config/logger.js';
import UserDAO from '../dao/UserDAO.js';
import { RegisterUserDTO, ReturnUserDTO } from '../dto/UserDTO.js';
import bcrypt from 'bcrypt';
import { sendNewRegister } from '../notifications/mailer.js';
import CarDAO from '../dao/CarDAO.js';
import { InsertCarDTO } from '../dto/CarDTO.js';

const userContainer = new UserDAO();
const carContainer = new CarDAO();

export async function register(req, res) {
    try {
        logger.info('start method [save product]');
        const registerUser = new RegisterUserDTO(req.body);
        const userFound = await userContainer.getByEmail(registerUser.email);
        if( !!userFound ) {
            res.status(400).send({ status: 'error', message: 'User is already registered' });
            return;
        }
        const userId = await userContainer.save(registerUser);
        await carContainer.save(new InsertCarDTO({ userId: userId.insertedId }));
        await sendNewRegister(registerUser.name, registerUser.email);
        const token = jwt.sign({ userId: userId.insertedId }, process.env.SECRET);
        res.status(200).send({ status: 'ok', message: 'User created', data: new ReturnUserDTO(registerUser), token });
    } catch ({ message }) {
        errorLogger.error(message);
        res.status(400).send({ status: 'error', message });
    }
}

export async function login(req, res) {
    try {
        logger.info('start method [save product]');
        const { email, password } = req.body;
        const userFound = await userContainer.getByEmail(email);
        if( !userFound ) {
            res.status(400).send({ status: 'error', message: 'User is not registered' });
            return;
        }
        const passwordMatch = await bcrypt.compare(password, userFound.password);
        if( passwordMatch ) {
            const token = jwt.sign({ userId: userFound._id.toString() }, process.env.SECRET);
            res.status(200).send({ status: 'ok', message: 'User logged successfully', data: new ReturnUserDTO(userFound), token })
        } else {
            res.status(400).send({ status: 'error', message: 'Login failed' });
        }
    } catch (error) {
        
    }
}

export async function logout(req, res) {
    logger.info('start method [logout]');
}