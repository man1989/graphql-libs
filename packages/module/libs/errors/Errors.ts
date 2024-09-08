export class JSONParseError extends Error {
    constructor(message: string, opts?: ErrorOptions) {
        super(message, opts);
    }
}