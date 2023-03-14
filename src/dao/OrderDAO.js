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

    async getUnpaidOrder(orderId, userId) {
        try {
            const collection = await this.connect();
            const order = collection.findOne({ status: 'generated', userId, _id: new mongo.ObjectId(orderId.trim()) })
            await this.disconnect();
            return order;
        } catch ({ message }) {
            throw new Error(`Error getting the order [${ message }]`)
        }
    }

    async update(object) {
        try {
            const collection = await this.connect();
            const register = await collection.findOneAndUpdate({ _id: object._id }, { $set: object });
            await this.disconnect();
            return register;
        } catch ({ message }) {
            throw new Error(`Error updating the order [${ message }]`)
        }
    }

    async getAllByUser(userId) {
        try {
            const collection = await this.connect();
            const orders = await collection.find({ userId }).toArray();
            await this.disconnect();
            return orders;
        } catch ({ message }) {
            throw new Error(`Error getting the orders [${ message }]`)
        }
    }

}

export default OrderDAO;