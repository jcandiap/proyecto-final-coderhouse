import jwt from 'jsonwebtoken';

import { errorLogger, logger } from "../config/logger.js";
import ProductsDAO from "../dao/ProductDAO.js";
import UserDAO from "../dao/UserDAO.js";
import { InsertProductDTO, ReturnInsertedProductDTO, ReturnProductDTO, UpdateProductDTO } from "../dto/ProductDTO.js";

const productContainer = new ProductsDAO();
const userContainer = new UserDAO();

export async function saveProduct(req, res) {
    try {
        logger.info('start method [save product]');
        const { authorization } = req.headers;
        const { userId } = jwt.verify(authorization.split(' ')[2], process.env.SECRET);
        const user = await userContainer.getById(userId);
        if( !userId || !user.isAdmin ) {
            res.status(400).send({ status: 'error', message: 'User no authorizated for this action' });
            return;
        }
        const insertProductDTO = new InsertProductDTO(req.body);
        const insertedProduct = await productContainer.save(insertProductDTO);
        const returnedInsertedProduct = new ReturnInsertedProductDTO(insertedProduct);
        res.status(200).send({ status: 'ok', message: 'Product created', data: returnedInsertedProduct });
    } catch ({ message }) {
        errorLogger.error(message);
        res.status(400).send({ status: 'error', message })
    }
}

export async function getProduct(req, res) {
    try {
        logger.info('start method [get product]');
        const product = await productContainer.get(req.params.id);
        const returnedProduct = new ReturnProductDTO(product);
        if( !!product ) {
            res.status(200).send({ status: 'ok', message: 'Obtained product', data: returnedProduct });
        } else {
            res.status(400).send({ status: 'error', message: 'Product not found' });
        }
    } catch ({ message }) {
        errorLogger.error(message);
        res.status(400).send({ status: 'error', message });
    }
}

export async function getProducts(req, res) {
    try {
        logger.info('start method [get products]');
        const products = await productContainer.getAll();
        const returnedProducts = [];
        products.forEach(product => returnedProducts.push(new ReturnInsertedProductDTO(product)));
        res.status(200).send({ status: 'ok', message: 'Obtained products', data: returnedProducts });
    } catch ({ message }) {
        errorLogger.error(message);
        res.status(400).send({ status: 'error', message });
    }
}

export async function updateProduct(req, res) {
    try {
        logger.info('start method [update product]');
        const { authorization } = req.headers;
        const { userId } = jwt.verify(authorization.split(' ')[2], process.env.SECRET);
        const user = await userContainer.getById(userId);
        if( !userId || !user.isAdmin ) {
            res.status(400).send({ status: 'error', message: 'User no authorizated for this action' });
            return;
        }
        const productFound = await productContainer.get(req.params.id);
        if( !productFound ) {
            res.status(400).send({ status: 'error', message: 'Product not found' });
            return;
        }
        const product = new UpdateProductDTO(req.body, productFound);
        await productContainer.update(req.params.id, product);
        res.status(200).send({ status: 'ok', message: 'Product updated successfully', data: product });
    } catch ({ message }) {
        errorLogger.error(message);
        res.status(400).send({ status: 'error', message });
    }
}

export async function deleteProduct(req, res) {
    try {
        logger.info('start method [delete product]');
        const { authorization } = req.headers;
        const { userId } = jwt.verify(authorization.split(' ')[2], process.env.SECRET);
        const user = await userContainer.getById(userId);
        if( !userId || !user.isAdmin ) {
            res.status(400).send({ status: 'error', message: 'User no authorizated for this action' });
            return;
        }
        const productFound = await productContainer.get(req.params.id);
        if( !productFound ) {
            res.status(400).send({ status: 'error', message: 'Product not found' });
            return;
        }
        await productContainer.delete(req.params.id);
        res.status(200).send({ status: 'ok', message: 'Product deleted successfully' });
    } catch ({ message }) {
        errorLogger.error(message);
        res.status(400).send({ status: 'error', message });
    }
}

export async function getByCategory(req, res) {
    try {
        logger.info('start method [get products by category]');
        const products = await productContainer.getByCategory(req.params.category);
        const returnedProducts = [];
        products.forEach(product => returnedProducts.push(new ReturnInsertedProductDTO(product)));
        res.status(200).send({ status: 'ok', message: 'Obtained products', data: returnedProducts });
    } catch ({ message }) {
        errorLogger.error(message);
        res.status(400).send({ status: 'error', message });
    }
}