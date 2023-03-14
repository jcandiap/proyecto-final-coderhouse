import { mongo } from "mongoose";
import BaseDAO from "./config/BaseDAO.js";

class UserDAO extends BaseDAO {

    constructor() {
        super();
        this.collection = 'users';
    }

    async save(object) {
        try {
            const collection = await this.connect();
            const insertedId = await collection.insertOne(object);
            await this.disconnect();
            return insertedId;
        } catch ({ message }) {
            throw new Error(`Error saving the user [${ message }]`)
        }
    }

    async login(params) {
        
    }

    async getByEmail(email) {
        try {
            const collection = await this.connect();
            const user = await collection.findOne({ email });
            await this.disconnect();
            return user;
        } catch ({ message }) {
            throw new Error(`Error getting user [${ message }]`);
        }
    }

    async getById(id) {
        try {
            const collection = await this.connect();
            const user = await collection.findOne({ _id: new mongo.ObjectId(id.trim()) });
            await this.disconnect();
            return user;
        } catch ({ message }) {
            throw new Error(`Error getting user [${ message }]`);
        }
    }

}

export default UserDAO;