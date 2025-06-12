"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomResponse {
    static success(res, statusCode, message, data = null) {
        return res.status(statusCode).json({
            success: true,
            status_code: statusCode,
            message: message,
            data: data,
        });
    }
    static error(res, statusCode, message, error = null) {
        return res.status(statusCode).json({
            success: false,
            status_code: statusCode,
            message: message,
            error: error,
        });
    }
}
exports.default = CustomResponse;
