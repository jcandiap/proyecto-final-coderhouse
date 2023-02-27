import DBClientMongo from "./DBClientMongo.js";

class BaseDAO extends DBClientMongo {

    async save(object) {
        throw new Error('no se ha implementado el metodo save');
    }

    async get(object) {
        throw new Error('no se ha implementado el metodo get');
    }

    async getById(object) {
        throw new Error('no se ha implementado el metodo getById');
    }

    async getAll() {
        throw new Error('no se ha implementado el metodo getAll');
    }

    async update(object) {
        throw new Error('no se ha implementado el metodo update');
    }

    async delete(object) {
        throw new Error('no se ha implementado el metodo delete');
    }
}

export default BaseDAO;