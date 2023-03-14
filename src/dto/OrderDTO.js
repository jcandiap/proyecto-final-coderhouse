export class OrderDTO {
    constructor(data) {
        this.id = data?._id || '';
        this.paymentId = data?.paymentId || '';
        this.createdAt = data?.createdAt || 0;
        this.total = data?.total || 0;
        this.orderDetail = data?.orderDetail || [];
        this.status = data?.status || '';
    }
}