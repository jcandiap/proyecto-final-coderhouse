import BaseDAO from "./config/BaseDAO.js";

class UserDAO extends BaseDAO {

    constructor() {
        super();
        this.collection = 'users';
    }

    async save(object) {
        try {
            const collection = await this.connect();
            await collection.insertOne(object);
            await this.disconnect();
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

}

export default UserDAO;