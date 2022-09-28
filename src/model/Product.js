class Product {

    constructor(object) {
        this.id = object?.id || 0;
        this.title = object?.title || '';
        this.description = object?.description || '';
        this.code = object?.code || '';
        this.price = object?.price || 0;
        this.thumbnail = object?.thumbnail || '';
        this.stock = object?.stock || 1;
    }

    validarDatos() {
        if( !this.title || !this.price || !this.thumbnail ) {
            return false;
        } else {
            return true;
        }
    }
}

export default Product;