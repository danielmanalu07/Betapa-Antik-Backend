"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpError = void 0;
class HttpError extends Error {
    constructor(message, statusCode = 500, error) {
        super(message);
        this.statusCode = statusCode;
        this.error = error;
    }
}
exports.HttpError = HttpError;
