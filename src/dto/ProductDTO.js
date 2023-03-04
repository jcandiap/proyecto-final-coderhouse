export class InsertProductDTO {
    constructor(data) {
        this.title = data?.title || '';
        this.description = data?.description || '';
        this.code = data?.code || '';
        this.price = data?.price || 0;
        this.thumbnail = data?.thumbnail || '';
        this.stock = data?.stock || 1;
        this.timestamp = new Date().getTime();
        this.status = 'active';
    }

    validateData() {
        if( !this.title ) return false;
        if( !this.description ) return false;
        if( !this.code ) return false;
        if( !this.thumbnail ) return false;
        return true;
    }
}

export class ReturnInsertedProductDTO {
    constructor(data) {
        this.id = data?._id || '';
        this.title = data?.title || '';
        this.price = data?.price || '';
        this.thumbnail = data?.thumbnail || '';
    }
}

export class ReturnProductDTO {
    constructor(data) {
        this.title = data?.title || '';
        this.description = data?.description || '';
        this.code = data?.code || '';
        this.price = data?.price || 0;
        this.thumbnail = data?.thumbnail || '';
        this.stock = data?.stock || 1;
        this.timestamp = data?.timestamp || 0;
        this.status = data?.status || '';
    }
}

export class UpdateProductDTO {
    constructor(data, productFound) {
        this.id = data?.id || productFound?._id;
        this.title = data?.title || productFound?.title || '';
        this.description = data?.description || productFound?.description || '';
        this.code = data?.code || productFound?.code || '';
        this.price = data?.price || productFound?.price || 0;
        this.thumbnail = data?.thumbnail || productFound?.thumbnail || '';
        this.stock = data?.stock || productFound?.stock || 1;
    }
}