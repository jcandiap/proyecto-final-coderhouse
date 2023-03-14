import jwt from 'jsonwebtoken';

import { errorLogger } from "../config/logger.js";
import CarDAO from "../dao/CarDAO.js";
import OrderDAO from '../dao/OrderDAO.js';
import { ProductOrderDetailDTO } from '../dto/ProductDTO.js';

const carContainer = new CarDAO();
const orderContainer = new OrderDAO();

export async function generateOrder(req, res) {
    try {
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