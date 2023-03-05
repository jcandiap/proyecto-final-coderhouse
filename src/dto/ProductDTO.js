export class InsertProductDTO {
    constructor(data) {
        this.title = data?.title || '';
        this.description = data?.description || '';
        this.code = data?.code || '';
        this.price = data?.price || 0;
        this.thumbnail = data?.thumbnail || '';
        this.stock = data?.stock || 1;
        this.timestamp = new Date().getTime();
        this.category = data?.category || 'generic';
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
        this.category = data?.category || '';
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
        this.category = data?.category || '';
    }
}

export class UpdateProductDTO {
    constructor(data, productFound) {
        this.title = !!data?.title ? data?.title : productFound?.title;
        this.description = !!data?.description ? data.description : productFound?.description;
        this.code = !!data?.code ? data.code : productFound?.code;
        this.price = !!data?.price ? data.price : productFound?.price;
        this.thumbnail = !!data?.thumbnail ? data.thumbnail : productFound?.thumbnail;
        this.stock = !!data?.stock ? data.stock : productFound?.stock;
        this.category = !!data?.category ? data.category : productFound?.category;
    }
}