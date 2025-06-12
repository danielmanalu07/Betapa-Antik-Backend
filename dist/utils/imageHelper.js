"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceImageFile = exports.deleteImageFile = exports.renameImageFile = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
/**
 * Rename an uploaded image file to a safe format and return the new filename.
 */
const renameImageFile = (oldFilename, newName, id, directory = "uploads", suffix = "") => {
    const oldPath = path_1.default.join(directory, oldFilename);
    const ext = path_1.default.extname(oldFilename);
    const safeName = newName.replace(/\s+/g, "_");
    const uniqueSuffix = suffix || Date.now().toString(); // fallback kalau tidak dikirim suffix
    const newFilename = `image-${safeName}-${id}-${uniqueSuffix}${ext}`;
    const newPath = path_1.default.join(directory, newFilename);
    if (!fs_1.default.existsSync(oldPath)) {
        throw new Error(`File not found: ${oldPath}`);
    }
    fs_1.default.promises.rename(oldPath, newPath);
    return newFilename;
};
exports.renameImageFile = renameImageFile;
/**
 * Delete image file from the uploads directory.
 */
const deleteImageFile = (filename, directory = "uploads") => {
    const filePath = path_1.default.join(directory, filename);
    if (fs_1.default.existsSync(filePath)) {
        fs_1.default.unlinkSync(filePath);
    }
};
exports.deleteImageFile = deleteImageFile;
/**
 * Replace the old image file with a new uploaded file.
 */
const replaceImageFile = (oldFilename, newUploadedFilename, newName, id, directory = "uploads", suffix = "") => {
    (0, exports.deleteImageFile)(oldFilename, directory);
    return (0, exports.renameImageFile)(newUploadedFilename, newName, id, directory, suffix);
};
exports.replaceImageFile = replaceImageFile;
