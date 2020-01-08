export class CustomError extends Error {

    constructor(public message: string, public status?: number) {
        super(message);
        this.name = "http client custom error"; 
        this.status = status ? status : 0;
    }
}