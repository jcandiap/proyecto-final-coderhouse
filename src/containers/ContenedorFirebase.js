import admin from 'firebase-admin';
import fs from 'fs';

class ContenedorFirebase {

    constructor(collection) {
        this.collection = collection;
        this.connect();
    }

    async connect() {
        const serviceAccount = JSON.parse(fs.readFileSync('./src/config/serviceAccountKey.json', 'utf-8'));
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
    }

    
    async save(newRegister) {
        try {
            const db = admin.firestore();
            newRegister.timestamp = this._getTimestamp();
            const result = await db.collection(this.collection).add({ ...newRegister });
            newRegister._id = result.id;
            return newRegister;
        } catch (error) {
            console.log(this.collection, error)
            throw new Error('Error al guardar el registro');
        }
    }

    async getById(id) {
        let objects = [];
        try {
            const db = admin.firestore();
            const result = await db.collection(this.collection).doc(id).get();
            objects = result.data();
            objects._id = result.id;
        } catch (error) {
            console.log(error);
            throw new Error('Error al obtener todos los registros');
        }
        return objects;
    }

    async getAll() {
        let objects = [];
        try {
            const db = admin.firestore();
            const collection = db.collection(this.collection);
            const result = await collection.get();
            result.forEach(doc => {
                const object = doc.data();
                object._id = doc.id;
                objects.push(object);
            });
        } catch (error) {
            console.log(error);
            throw new Error('Error al obtener todos los registros');
        }
        return objects;
    }

    async updateById(registerUpdate) {
        try {
            const db = admin.firestore();
            const result = await db.collection(this.collection).doc(registerUpdate._id).update(registerUpdate);
            return registerUpdate;
        } catch (error) {
            console.log(error)
            throw new Error('Error al actualizar el registro');
        }
    }

    async deleteById(id) {
        try {
            const db = admin.firestore();
            await db.collection(this.collection).doc(id).delete();
            return true;
        } catch (error) {
            console.log(error)
            throw new Error('Error al eliminar el registro');
        }
    }

    _getTimestamp() {
        return new Date().getTime();
    }

}

export default ContenedorFirebase;