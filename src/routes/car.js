import express from 'express';
import { addProductToCar, deleteProduct, deleteSingleProduct, getCarInfo, passCarToOrder } from '../controllers/CarController.js';
import { validateAddingProduct, validateGettingCar } from '../middleware/carMiddleware.js';

const carRoutes = express.Router();

carRoutes.post('/get-car', [validateGettingCar], getCarInfo);
carRoutes.post('/add-product', [validateAddingProduct], addProductToCar);
carRoutes.post('/delete-product', deleteSingleProduct);
carRoutes.post('/delete-products', deleteProduct);
carRoutes.post('/buy-car', passCarToOrder);

export default carRoutes;