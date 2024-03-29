import express from 'express';
import { deleteProduct, getByCategory, getProduct, getProducts, saveProduct, updateProduct } from '../controllers/ProductController.js';
import { validateAdministrator, validateIdProduct, validateProduct } from '../middleware/productMiddleware.js';

const productRoutes = express.Router();

productRoutes.post('/', [validateAdministrator, validateProduct], saveProduct);
productRoutes.get('/:id', [validateIdProduct], getProduct);
productRoutes.get('/', getProducts);
productRoutes.put('/:id', [validateIdProduct], updateProduct);
productRoutes.delete('/:id', [validateIdProduct], deleteProduct);
productRoutes.get('/category/:category', getByCategory); 

export default productRoutes;