import express from 'express';
import { generateOrder } from '../controllers/OrderController.js';

const orderRoutes = express.Router();

orderRoutes.post('/generate-order', generateOrder);
orderRoutes.post('/get-order-detail');
orderRoutes.post('/confirm-order');

export default orderRoutes;