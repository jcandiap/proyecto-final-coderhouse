import { mongo } from "mongoose";
import BaseDAO from "./config/BaseDAO.js";

class ProductsDAO extends BaseDAO {

    constructor() {
        super();
        this.collection = 'products';
    }

    async save(newRegister) {
        try {
            const collection = await this.connect();
            await collection.insertOne(newRegister);
            await this.disconnect();
            return newRegister;
        } catch (error) {
            throw new Error(`Error saving the product [${ error?.message }]`);
        }
    }

    async get(object) {
        try {
            const collection = await this.connect();
            const o_id = new mongo.ObjectId(object);
            const product = await collection.findOne({ _id: o_id, status: 'active' });
            return product;
        } catch (error) {
            throw new Error(`Error getting product [${ error?.message }]`)
        }
    }

    async getAll() {
        try {
            const collection = await this.connect();
            const products = await collection.find({}).toArray();
            return products;
        } catch (error) {
            throw new Error(`Error getting products [${ error?.message }]`)
        }
    }

}

export default ProductsDAO;