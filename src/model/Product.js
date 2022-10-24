class Product {

    constructor(object) {
        this.title = object?.title || '';
        this.description = object?.description || '';
        this.code = object?.code || '';
        this.price = object?.price || 0;
        this.thumbnail = object?.thumbnail || '';
        this.stock = object?.stock || 1;
        this.timestamp = object?.timestamp || '';
    }

    validarDatos() {
        if( !this.title || !this.price || !this.thumbnail || !this.code ) {
            return false;
        } else {
            return true;
        }
    }
}

export default Product;