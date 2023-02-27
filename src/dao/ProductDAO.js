import BaseDAO from "./config/BaseDAO";

class ProductsDAO extends BaseDAO {

    constructor() {
        super();
        this.collecton = 'products';
    }

    async save(newRegister) {
        try {
            const collection = await this.connect();
            await collection.insertOne(newRegister);
            await this.disconnect();
            return newRegister;
        } catch (error) {
            throw new Error(`Error al guardar el registro [${ error?.message }]`);
        }
    }

}

export default ProductsDAO;