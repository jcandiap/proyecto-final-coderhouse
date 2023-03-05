import express from 'express';
import { login, register } from '../controllers/UserController.js';
import { encryptPassword, userLogin, userRegister, validateConfirmPassword } from '../middleware/userMiddleware.js';

const userRouters = express.Router();

userRouters.post('/login', userLogin, login);
userRouters.post('/register', [userRegister, validateConfirmPassword, encryptPassword], register);
userRouters.post('/logout');

export default userRouters;