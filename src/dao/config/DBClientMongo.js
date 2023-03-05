import mongoose from "mongoose";
import { MongoClient } from 'mongodb';
import { errorLogger } from "../../config/logger.js";

class DBClientMongo {

    async connect() {
        try {
            const uri = `mongodb+srv://${ process.env.MONGO_USER || '' }:${ process.env.MONGO_PASS || '' }@${ process.env.MONGO_DB }.7aqz8cq.mongodb.net/?retryWrites=true&w=majority`;
            const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
            await client.connect();
            const database = client.db(process.env.MONGO_DB);
            const collection = database.collection(this.collection);
            return collection;
        } catch ({ message }) {
            errorLogger.error(`Error connecting database [${ message }]`);
            return null;
        }
    }

    async disconnect(){
        mongoose.disconnect();
    }

}

export default DBClientMongo;