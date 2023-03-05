import express from 'express';
import { login, register } from '../controllers/UserController.js';
import { userLogin, userRegister } from '../middleware/userMiddleware.js';

const userRouters = express.Router();

userRouters.post('/login', userLogin, login);
userRouters.post('/register', userRegister, register);
userRouters.post('/logout');

export default userRouters;