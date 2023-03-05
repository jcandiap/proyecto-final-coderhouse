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
            const product = await collection.findOne({ _id: new mongo.ObjectId(object.toString().trim()), status: 'active' });
            await this.disconnect();
            return product;
        } catch (error) {
            throw new Error(`Error getting product [${ error?.message }]`)
        }
    }

    async getAll() {
        try {
            const collection = await this.connect();
            const products = await collection.find({ status: 'active' }).toArray();
            await this.disconnect();
            return products;
        } catch (error) {
            throw new Error(`Error getting products [${ error?.message }]`)
        }
    }

    async update(id, object) {
        try {
            const collection = await this.connect();
            const product = await collection.findOneAndUpdate({ _id: new mongo.ObjectId(id.toString().trim()) }, { $set: object });
            await this.disconnect();
            return product;
        } catch (error) {
            throw new Error(`Error updating product [${ error?.message }]`)
        }
    }

    async delete(id) {
        try {
            const collection = await this.connect();
            await collection.findOneAndUpdate({ _id: new mongo.ObjectId(id.toString().trim()) }, { $set: { status: 'deleted' }});
            await this.disconnect();
            return true;
        } catch (error) {
            throw new Error(`Error deleting product [${ error?.message }]`)
        }
    }

}

export default ProductsDAO;