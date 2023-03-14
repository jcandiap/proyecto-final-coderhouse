import express from 'express';
import { generateOrder, getOrderDetail } from '../controllers/OrderController.js';
import { validateGenerateOrder, validateGetOrder } from '../middleware/orderMiddleware.js';

const orderRoutes = express.Router();

orderRoutes.post('/generate-order', [validateGenerateOrder], generateOrder);
orderRoutes.get('/get-order-detail/:id', [validateGetOrder], getOrderDetail);
orderRoutes.post('/confirm-order');

export default orderRoutes;