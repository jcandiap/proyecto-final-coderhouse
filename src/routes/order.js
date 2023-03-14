import express from 'express';

const orderRoutes = express.Router();

orderRoutes.post('/generate-order');
orderRoutes.post('/get-order-detail');
orderRoutes.post('/confirm-order');

export default orderRoutes;