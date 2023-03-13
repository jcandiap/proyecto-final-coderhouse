import { mongo } from "mongoose";

export class InsertCarDTO {
    constructor(data) {
        this.userId = new mongo.ObjectId(data?.userId.toString().trim()) || '';
        this.products = [];
        this.createdAt = new Date().getTime();
        this.status = 'pending';
    }
}

export class GettingCarDTO {
    constructor(data) {
        this.products = data?.products || []
        this.createdAt = data?.createdAt || 0;
        this.status = data?.status || '';
    }
}