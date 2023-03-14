import express from 'express';
import { confirmOrder, generateOrder, getOrderDetail, getOrders } from '../controllers/OrderController.js';
import { validateGenerateOrder, validateGetOrder } from '../middleware/orderMiddleware.js';

const orderRoutes = express.Router();

orderRoutes.post('/generate-order', [validateGenerateOrder], generateOrder);
orderRoutes.get('/get-order-detail/:id', [validateGetOrder], getOrderDetail);
orderRoutes.post('/confirm-order', confirmOrder);
orderRoutes.get('/orders', getOrders);

export default orderRoutes;