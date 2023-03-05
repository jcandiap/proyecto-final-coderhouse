import jwt from 'jsonwebtoken';
import { errorLogger, logger } from '../config/logger.js';
import UserDAO from '../dao/UserDAO.js';
import { RegisterUserDTO, ReturnUserDTO } from '../dto/UserDTO.js';
import bcrypt from 'bcrypt';

const userContainer = new UserDAO();

export async function register(req, res) {
    try {
        logger.info('start method [save product]');
        const registerUser = new RegisterUserDTO(req.body);
        const userFound = await userContainer.getByEmail(registerUser.email);
        if( !!userFound ) {
            res.status(400).send({ status: 'error', message: 'User is already registered' });
            return;
        }
        await userContainer.save(registerUser);
        res.status(200).send({ status: 'ok', message: 'User created', data: new ReturnUserDTO(registerUser) });
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
            res.status(200).send({ status: 'ok', message: 'User logged successfully', data: new ReturnUserDTO(userFound) })
        } else {
            res.status(400).send({ status: 'error', message: 'Loging failed' });
        }
    } catch (error) {
        
    }
}

export async function logout(req, res) {
    logger.info('start method [logout]');
}