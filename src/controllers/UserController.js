import jwt from 'jsonwebtoken';
import { errorLogger, logger } from '../config/logger.js';
import UserDAO from '../dao/UserDAO.js';
import { RegisterUserDTO, ReturnUserDTO } from '../dto/UserDTO.js';

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
    logger.info('start method [save product]');
}

export async function logout(req, res) {
    logger.info('start method [logout]');
}