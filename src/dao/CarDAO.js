import { mongo } from "mongoose";
import BaseDAO from "./config/BaseDAO.js";

class CarDAO extends BaseDAO {

    constructor() {
        super();
        this.collection = 'cars';
    }

    async save(newRegister) {
        try {
            const collection = await this.connect();
            await collection.insertOne(newRegister);
            await this.disconnect();
            return newRegister;
        } catch (error) {
            throw new Error(`Error saving the car [${ error?.message }]`);
        }
    }

    async getByUser(carId, userId) {
        try {
            const collection = await this.connect();
            const register = await collection.findOne({ _id: new mongo.ObjectId(carId.trim()), userId: new mongo.ObjectId(userId.trim()) });
            await this.disconnect();
            return register;
        } catch (error) {
            throw new Error(`Error getting the car [${ error?.message }]`);
        }
    }
}

export default CarDAO;