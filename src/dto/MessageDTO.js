export class InsertMessageDTO {
    constructor(data) {
        this.email = data?.email || '';
        this.type = data?.type || '';
        this.timestamp = new Date().getTime();
        this.message = data?.message || '';
    }
}