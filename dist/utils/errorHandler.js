"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const library_1 = require("@prisma/client/runtime/library");
function handleDuplicateError(error) {
    var _a;
    if (error instanceof library_1.PrismaClientKnownRequestError) {
        switch (error.code) {
            case "P2002": {
                let target = "field";
                const metaTarget = (_a = error.meta) === null || _a === void 0 ? void 0 : _a.target;
                if (Array.isArray(metaTarget) && metaTarget.length > 0) {
                    target = metaTarget[0];
                }
                else if (typeof metaTarget === "string") {
                    const match = metaTarget.match(/User_(.+)_key/);
                    target = match ? match[1] : metaTarget;
                }
                return {
                    statusCode: 400,
                    message: `Duplicate ${target}`,
                    error: {
                        field: target,
                        message: `${target} already exists`,
                    },
                };
            }
        }
    }
    return {
        statusCode: 500,
        message: "Internal Server Error",
        error,
    };
}
exports.default = handleDuplicateError;
