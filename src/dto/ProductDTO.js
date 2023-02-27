export class InsertProductDTO {
    constructor(data) {
        this.title = data?.title || '';
        this.description = data?.title || '';
        this.code = data?.code || '';
        this.price = data?.price || 0;
        this.thumbnail = data?.thumbnail || '';
        this.stock = data?.stock || 1;
        this.timestamp = new Date().getTime();
    }
}

export class ReturnInsertedProductDTO {
    constructor(data) {
        this.id = data?._id;
        this.title = data?.title;
        this.price = data?.price;
        this.thumbnail = data?.thumbnail;
    }
}