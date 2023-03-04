import express from 'express';
import { getProduct, getProducts, saveProduct } from '../controllers/ProductController.js';
import { validateAdministrator, validateGetProduct, validateProduct } from '../middleware/productMiddleware.js';

const productRoutes = express.Router();

productRoutes.post('/', [validateAdministrator, validateProduct], saveProduct);
productRoutes.get('/:id', [validateGetProduct], getProduct);
productRoutes.get('/', getProducts);

export default productRoutes;