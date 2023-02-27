import express from 'express';
import { saveProduct } from '../controllers/ProductController.js';

const productRoutes = express.Router();

productRoutes.post('/', [validarAdministrador, validarProducto], saveProduct);

export default productRoutes;