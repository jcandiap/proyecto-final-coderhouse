import express from 'express';
import { addProductToCar, deleteProduct, deleteSingleProduct, getCarInfo } from '../controllers/CarController.js';
import { validateAddingProduct, validateDeleteProduct, validateGettingCar } from '../middleware/carMiddleware.js';

const carRoutes = express.Router();

carRoutes.get('/:id', [validateGettingCar], getCarInfo);
carRoutes.post('/add-product', [validateAddingProduct], addProductToCar);
carRoutes.post('/delete-product', [validateDeleteProduct], deleteSingleProduct);
carRoutes.post('/delete-products', [validateDeleteProduct], deleteProduct);

export default carRoutes;