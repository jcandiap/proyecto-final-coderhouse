import knex from "knex";
import ContenedorSqlite from "../../containers/ContenedorSqlite.js";
import { optionsSqlite } from '../../config/sqlite.js';

class CarritoDaoSqlite extends ContenedorSqlite{
    
    constructor(){
        super(optionsSqlite, 'carrito');
        this.checkTable();
    }

    async desconectar(){
    }

    async checkTable() {
        try {
            const existTable = await this.db.schema.hasTable('carrito');
            if( !existTable ) {
                await this.db.schema.createTable(this.table, newTable => {
                    newTable.increments('id');
                    newTable.string('products');
                    newTable.timestamp('timestamp');
                });
            }
        } catch(error) {
            console.log('Error al validar tabla', error);
            throw new Error('Error al validar tabla');
        }
    }

}

export default CarritoDaoSqlite;