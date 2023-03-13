import express from 'express';

const orderRoutes = express.Router();

orderRoutes.post('/create-order');
orderRoutes.post('/get-order-detail');
orderRoutes.post('/confirm-order');