import { mongo } from "mongoose";
import BaseDAO from "./config/BaseDAO.js";

class OrderDAO extends BaseDAO {

    constructor() {
        super();
        this.collection = 'orders';
    }

    async save(object) {
        try {
            const collection = await this.connect();
            await collection.insertOne(object);
            await this.disconnect();
            return object;
        } catch ({ message }) {
            throw new Error(`Error saving the order [${ message }]`)
        }
    }

    async getByUser(orderId, userId) {
        try {
            const collection = await this.connect();
            const order = collection.findOne({ userId, _id: new mongo.ObjectId(orderId.trim()) })
            await this.disconnect();
            return order;
        } catch ({ message }) {
            throw new Error(`Error getting the order [${ message }]`)
        }
    }

}

export default OrderDAO;