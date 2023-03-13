import { errorLogger } from "../config/logger.js";
import CarDAO from "../dao/CarDAO.js";
import { GettingCarDTO } from "../dto/CarDTO.js";
import jwt from 'jsonwebtoken';
import ProductsDAO from "../dao/ProductDAO.js";
import { ReturnProductToCar } from "../dto/ProductDTO.js";

const carContainer = new CarDAO();
const productContainer = new ProductsDAO();

export async function getCarInfo(req, res) {
    try {
        const { authorization } = req.headers;
        const { id } = req.params;
        const token = jwt.verify(authorization.split(' ')[2], process.env.SECRET);
        const car = await carContainer.getByUser(id, token.userId);
        if( !car ) {
            res.status(400).send({ status: 'error', message: 'Car not found' });
            return;
        }
        res.status(200).send({ status: 'ok', message: 'Car obtained', data: new GettingCarDTO(car) });
    } catch ({ message }) {
        errorLogger.error(message);
        res.status(400).send({ status: 'error', message });
    }
}

export async function addProductToCar(req, res) {
    try {
        const { authorization } = req.headers;
        const { carId, productId, amount } = req.body;
        const token = jwt.verify(authorization.split(' ')[2], process.env.SECRET);
        const car = await carContainer.getByUser(carId, token.userId);
        if( !car ) {
            res.status(400).send({ status: 'error', message: 'Car not found' });
            return;
        }
        const product = await productContainer.get(productId);
        if( !product ) {
            res.status(400).send({ status: 'error', message: 'Product not found' });
            return;
        }
        if( product.stock == 0 || product.stock < amount ) {
            res.status(400).send({ status: 'error', message: 'There is no stock for the product' });
            return;
        }
        const productInCar = car.products.find(findProduct => findProduct.id.toString() === productId);
        if( !productInCar ) {
            car.products.push(new ReturnProductToCar(product, amount));
        } else {
            car.products.map(mapProduct => {
                if( mapProduct.id.toString() === productId ) {
                    mapProduct.amount += amount;
                }
            })
        }
        await carContainer.update(car);
        res.status(200).send({ status: 'ok', message: 'Product added to car', data: new GettingCarDTO(car) });
    } catch ({ message }) {
        errorLogger.error(message);
        res.status(400).send({ status: 'error', message });
    }
}

export async function deleteSingleProduct(req, res) {
    try {
        const { authorization } = req.headers;
        const { carId, productId } = req.body;
        const token = jwt.verify(authorization.split(' ')[2], process.env.SECRET);
        const car = await carContainer.getByUser(carId, token.userId);
        if( !car ) {
            res.status(400).send({ status: 'error', message: 'Car not found' });
            return;
        }
        car.products.map(product => {
            if( product.id.toString() === productId ) {
                if( product.amount === 1 ) {
                    car.products = car.products.filter(prod => prod !== product);
                } else {
                    product.amount -= 1;
                }
            }
        })
        await carContainer.update(car);
        res.status(200).send({ status: 'ok', message: 'Product deleted to car', data: new GettingCarDTO(car) });
    } catch ({ message }) {
        errorLogger.error(message);
        res.status(400).send({ status: 'error', message });
    }
}

export async function deleteProduct(req, res) {
    try {
        const { authorization } = req.headers;
        const { carId, productId } = req.body;
        const token = jwt.verify(authorization.split(' ')[2], process.env.SECRET);
        const car = await carContainer.getByUser(carId, token.userId);
        if( !car ) {
            res.status(400).send({ status: 'error', message: 'Car not found' });
            return;
        }
        car.products.map(product => {
            if( product.id.toString() === productId ) {
                car.products = car.products.filter(prod => prod !== product);
            }
        });
        await carContainer.update(car);
        res.status(200).send({ status: 'ok', message: 'Products deleted to car', data: new GettingCarDTO(car) });
    } catch ({ message }) {
        errorLogger.error(message);
        res.status(400).send({ status: 'error', message });
    }
}

export async function passCarToOrder(req, res) {
    try {
        const { authorization } = req.headers;
        const { carId } = req.body;
        const token = jwt.verify(authorization.split(' ')[2], process.env.SECRET);
        const car = await carContainer.getByUser(carId, token.userId);
        if( !car ) {
            res.status(400).send({ status: 'error', message: 'Car not found' });
            return;
        }
        if( car.products.length < 1 ) {
            res.status(400).send({ status: 'error', message: 'Car without elements to buy' });
            return;
        }
    } catch ({ message }) {
        errorLogger.error(message);
        res.status(400).send({ status: 'error', message });
    }
}