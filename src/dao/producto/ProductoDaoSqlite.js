import knex from "knex";
import ContenedorSqlite from "../../containers/ContenedorSqlite.js";
import { optionsSqlite } from '../../config/sqlite.js';

class ProductoDaoSqlite extends ContenedorSqlite{
    
    constructor(){
        super(optionsSqlite, 'productos');
        this.checkTable();
    }

    async desconectar(){
    }

    async checkTable(table) {
        try {
            const existTable = await this.db.schema.hasTable(table);
            if( !existTable ) {
                await this.db.schema.createTable(table, newTable => {
                    newTable.increments('id');
                    newTable.string('title');
                    newTable.string('thumbnail');
                    newTable.string('description');
                    newTable.string('code');
                    newTable.integer('stock');
                    newTable.timestamp('timestamp');
                    newTable.float('price');
                });
            }
        } catch(error) {
            console.log('Error al validar tabla', error);
            throw new Error('Error al validar tabla');
        }
    }

}

export default ProductoDaoSqlite;