import knex from "knex";

class ContenedorSqlite {

    constructor(options, table) {
        this.db = knex(options);
        this.table = table;
    }

    async save(newRegister) {
        let newObject;
        try {
            newRegister.timestamp = this._getTimestamp();
            newObject = await this.db(this.table).insert(newRegister);
            newObject = await this.getById(newObject[0]);
            newObject = newObject[0];
        } catch (error) {
            throw new Error(`Error al guardar el registro`);
        }
        return newObject;
    }

    async getById(id) {
        let object;
        try {
            object = await this.db(this.table).select('*').where('id', id);
        } catch (error) {
            throw new Error(`Error al obtener id ${ id }`);
        }
        return object;
    }

    async getAll() {
        let object;
        try {
            object = await this.db(this.table).select('*');
        } catch (error) {
            throw new Error(`Error al obtener los registros`);
        }
        return object;
    }

    async updateById(registerUpdate) {
        let newObject;
        try {
            registerUpdate.timestamp = this._getTimestamp();
            if( Boolean(registerUpdate?.products) ) {
                registerUpdate.products = JSON.stringify(registerUpdate.products);
            }
            newObject = await this.db(this.table).where('id', registerUpdate.id).update(registerUpdate);
            newObject = await this.getById(registerUpdate.id);
            newObject = newObject[0];
        } catch (error) {
            throw new Error('Error al modificar registro');
        }
        return newObject;
    }

    async deleteById(registerDelete) {
        try {
            
            await this.checkTable();
            await this.db(this.table).where('id', registerDelete).del();
            return true;
        } catch (error) {
            return false;
        }
    }

    _getTimestamp() {
        return Date.now();
    }

}

export default ContenedorSqlite;