export class RegisterUserDTO {
    constructor(data) {
        this.email = data?.email || '';
        this.name = data?.name || '';
        this.lastName = data?.lastName || '';
        this.avatar = data?.avatar || '';
        this.phoneNumber = data?.phoneNumber || '';
        this.country = data?.country || '';
        this.password = data?.password || '';
        this.confirmPasword = data?.confirmPasword || '';
        this.createdAt = new Date().getTime();
    }
}

export class ReturnUserDTO {
    constructor(data) {
        this.email = data?.email || '';
        this.name = data?.name || '';
        this.lastName = data?.lastName || '';
        this.avatar = data?.avatar || '';
        this.phoneNumber = data?.phoneNumber || '';
        this.country = data?.country || '';
        this.createdAt = new Date().getTime();
    }
}