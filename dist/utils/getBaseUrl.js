"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBaseUrl = void 0;
const getBaseUrl = (req) => {
    return `${req.protocol}://${req.get("host")}`;
};
exports.getBaseUrl = getBaseUrl;
