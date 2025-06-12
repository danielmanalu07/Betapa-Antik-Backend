import fs from "fs";
import path from "path";

/**
 * Rename an uploaded image file to a safe format and return the new filename.
 */
export const renameImageFile = (
  oldFilename: string,
  newName: string,
  id: number,
  directory: string = "uploads",
  suffix: string = ""
): string => {
  const oldPath = path.join(directory, oldFilename);
  const ext = path.extname(oldFilename);
  const safeName = newName.replace(/\s+/g, "_");
  const uniqueSuffix = suffix || Date.now().toString(); // fallback kalau tidak dikirim suffix
  const newFilename = `image-${safeName}-${id}-${uniqueSuffix}${ext}`;
  const newPath = path.join(directory, newFilename);

  if (!fs.existsSync(oldPath)) {
    throw new Error(`File not found: ${oldPath}`);
  }

  fs.promises.rename(oldPath, newPath);
  return newFilename;
};

/**
 * Delete image file from the uploads directory.
 */
export const deleteImageFile = (
  filename: string,
  directory: string = "uploads"
): void => {
  const filePath = path.join(directory, filename);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};

/**
 * Replace the old image file with a new uploaded file.
 */
export const replaceImageFile = (
  oldFilename: string,
  newUploadedFilename: string,
  newName: string,
  id: number,
  directory: string = "uploads",
  suffix: string = ""
): string => {
  deleteImageFile(oldFilename, directory);
  return renameImageFile(newUploadedFilename, newName, id, directory, suffix);
};
