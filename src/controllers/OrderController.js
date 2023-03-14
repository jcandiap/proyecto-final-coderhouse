import jwt from 'jsonwebtoken';

import { errorLogger, logger } from "../config/logger.js";
import CarDAO from "../dao/CarDAO.js";
import OrderDAO from '../dao/OrderDAO.js';
import UserDAO from '../dao/UserDAO.js';
import { OrderDTO } from '../dto/OrderDTO.js';
import { ProductOrderDetailDTO } from '../dto/ProductDTO.js';
import { sendConfirmationEmail } from '../notifications/mailer.js';

const carContainer = new CarDAO();
const orderContainer = new OrderDAO();
const userContainer = new UserDAO();

export async function generateOrder(req, res) {
    try {
        logger.info('start method [generate order]');
        const { authorization } = req.headers;
        const { carId } = req.body;
        const { userId } = jwt.verify(authorization.split(' ')[2], process.env.SECRET);
        let car = await carContainer.getByUser(carId, userId);
        if( !car ) {
            res.status(400).send({ status: 'error', message: 'Car not found' });
            return;
        }
        if( car.products.length < 1 ) {
            res.status(400).send({ status: 'error', message: 'Car without elements to buy' });
            return;
        }
        let order = {
            status: 'generated',
            paymentId: '',
            userId,
            createdAt: new Date().getTime(),
            orderDetail: car.products.map(product => {
                return new ProductOrderDetailDTO({
                    ...product,
                    total: product.price * product.amount
                })
            })
        };
        Object.assign(order, { total: order.orderDetail.reduce((acumulator, current) => acumulator + current.total, 0 ) });
        order = await orderContainer.save(order);
        car.products = [];
        await carContainer.update(car);
        res.status(200).send({ status: 'ok', message: 'Order saved successfully', data: order });
    } catch ({ message }) {
        errorLogger.error(message);
        res.status(400).send({ status: 'error', message });
    }
}

export async function getOrderDetail(req, res) {
    try {
        logger.info('start method [get order detail]');
        const { authorization } = req.headers;
        const { id } = req.params;
        const { userId } = jwt.verify(authorization.split(' ')[2], process.env.SECRET);
        const order = await orderContainer.getByUser(id, userId);
        if( !order ) {
            res.status(400).send({ status: 'error', message: 'Order not found' });
            return;
        }
        res.status(200).send({ status: 'ok', message: 'Order getted successfully', data: new OrderDTO(order) });
    } catch ({ message }) {
        errorLogger.error(message);
        res.status(400).send({ status: 'error', message });
    }
}

export async function confirmOrder(req, res) {
    try {
        logger.info('start method [confirm order]');
        const { authorization } = req.headers;
        const { orderId, paymentId } = req.body;
        const { userId } = jwt.verify(authorization.split(' ')[2], process.env.SECRET);
        const order = await orderContainer.getUnpaidOrder(orderId, userId);
        if( !order ) {
            res.status(400).send({ status: 'error', message: 'Order not found' });
            return;
        }
        const { name, email } = userContainer.getById(userId);
        order.paymentId = paymentId;
        order.status = 'paied';
        await orderContainer.update(order);
        sendConfirmationEmail(order.orderDetail, name, email);
        res.status(200).send({ status: 'ok', message: 'Order paied successfully' });
    } catch ({ message }) {
        errorLogger.error(message);
        res.status(400).send({ status: 'error', message })
    }
}

export async function getOrders(req, res) {
    try {
        logger.info('start method [get orders]');
        const { authorization } = req.headers;
        const { userId } = jwt.verify(authorization.split(' ')[2], process.env.SECRET);
        const orders = await orderContainer.getAllByUser(userId);
        if( !orders ) {
            res.status(400).send({ status: 'error', message: 'Orders not found' });
            return;
        }
        const returnedOrders = orders.map(order => new OrderDTO(order));
        res.status(200).send({ status: 'ok', message: 'Orders getted successfully', data: returnedOrders });
    } catch ({ message }) {
        errorLogger.error(message);
        res.status(400).send({ status: 'error', message })
    }
}