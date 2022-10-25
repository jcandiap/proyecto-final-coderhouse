import mongoose from "mongoose";
import { optionsMongoDB } from "../config/mongodb.js";
import mongo, { MongoClient } from 'mongodb';

class ContenedorMongoDB {

    constructor(collection) {
        this.collection = collection;
    }

    async connect() {
        try {
            const uri = `mongodb+srv://${ optionsMongoDB.connection.user }:${ optionsMongoDB.connection.password }@${ optionsMongoDB.connection.database }.7aqz8cq.mongodb.net/?retryWrites=true&w=majority`;
            const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
            await client.connect();
            const database = client.db(optionsMongoDB.connection.database);
            const collection = database.collection(this.collection);
            return collection;
        } catch (error) {
            console.log('Error al conectar a MongoDB: ', error);
            return null;
        }
    }

    async disconnect(){
        mongoose.disconnect();
    }

    async save(newRegister) {
        try {
            const collection = await this.connect();
            newRegister.timestamp = this._getTimestamp();
            const result = await collection.insertOne(newRegister);
            newRegister._id = result.insertedId;
            await this.disconnect();
            return newRegister;
        } catch (error) {
            throw new Error('Error al guardar el registro');
        }
    }

    async getById(id) {
        let objects = [];
        try {
            const collection = await this.connect();
            const o_id = new mongo.ObjectId(id);
            objects = await collection.findOne({ _id: o_id });
            await this.disconnect();
        } catch (error) {
            console.log(error);
            throw new Error('Error al obtener todos los registros');
        }
        return objects;
    }

    async getAll() {
        let objects = [];
        try {
            const collection = await this.connect();
            objects = await collection.find({}).toArray();
            await this.disconnect();
        } catch (error) {
            console.log(error);
            throw new Error('Error al obtener todos los registros');
        }
        return objects;
    }

    async updateById(registerUpdate) {
        try {
            const collection = await this.connect();
            const o_id = new mongo.ObjectId(registerUpdate._id);
            delete registerUpdate._id;
            registerUpdate.timestamp = this._getTimestamp();
            await collection.updateOne({ _id: o_id }, { $set: registerUpdate });
            await this.disconnect();
            return registerUpdate;
        } catch (error) {
            console.log(error)
            throw new Error('Error al actualizar el registro');
        }
    }

    async deleteById(registerDelete) {
        try {
            const collection = await this.connect();
            const o_id = new mongo.ObjectId(registerDelete);
            const deleted = await collection.findOneAndDelete({ _id: o_id });
            console.log(registerDelete, deleted);
            await this.disconnect();
            return deleted;
        } catch (error) {
            throw new Error('Error al eliminar el registro');
        }
    }

    _getTimestamp() {
        return Date.now();
    }

}

export default ContenedorMongoDB;