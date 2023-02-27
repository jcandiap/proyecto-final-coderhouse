import log4js from "log4js";
import ProductsDAO from "../dao/ProductDAO.js";
import { InsertProductDTO, ReturnInsertedProductDTO } from "../dto/ProductDTO.js";

const productContainer = new ProductsDAO();

const logger = log4js.getLogger();
const errorLogger = log4js.getLogger('error');

export async function saveProduct(req, res) {
    try {
        logger.info('start method [save product]');
        const insertProductDTO = new InsertProductDTO(req.body);
        const insertedProduct = await productContainer.save(insertProductDTO);
        const returnedInsertedProduct = new ReturnInsertedProductDTO(insertedProduct);
        res.sendStatus(200).send({ status: 'ok', message: 'Product created', data: returnedInsertedProduct });
    } catch ({ message }) {
        errorLogger.log(message);
        res.sendStatus(400).send({ status: 'error', message })
    }
}