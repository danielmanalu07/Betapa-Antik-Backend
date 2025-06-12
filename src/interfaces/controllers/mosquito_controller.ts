import e, { Request, Response } from "express";
import MosquitoService from "../../infrastructure/services/mosquito_service";
import { getBaseUrl } from "../../utils/getBaseUrl";
import CustomResponse from "../../utils/response";
import { HttpError } from "../../utils/HttpError";
import { deleteImageFile } from "../../utils/imageHelper";

const getAllMosquito = async (req: Request, res: Response) => {
  try {
    const mosquitos = await MosquitoService.getAll();
    const baseUrl = getBaseUrl(req);

    const newMosquitos = mosquitos.map((mosquito) => ({
      ...mosquito,
      images: mosquito.images?.map((img) => ({
        ...img,
        imagePath: `${baseUrl}/uploads/mosquito/${img.imagePath}`,
      })),
    }));

    return CustomResponse.success(
      res,
      200,
      "Mosquito Get Successfully",
      newMosquitos
    );
  } catch (error) {
    if (error instanceof HttpError) {
      return CustomResponse.error(
        res,
        error.statusCode,
        error.message,
        error.error
      );
    }
    return CustomResponse.error(res, 500, "Internal Server Error", error);
  }
};

const getByIdMosquito = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const mosquito = await MosquitoService.getById(id);
    const baseUrl = getBaseUrl(req);

    const newMosquito = {
      ...mosquito,
      images: mosquito.images?.map((img) => ({
        ...img,
        imagePath: `${baseUrl}/uploads/mosquito/${img.imagePath}`,
      })),
    };

    return CustomResponse.success(
      res,
      200,
      "Get Mosquito Successfully",
      newMosquito
    );
  } catch (error) {
    if (error instanceof HttpError) {
      return CustomResponse.error(
        res,
        error.statusCode,
        error.message,
        error.error
      );
    }
    return CustomResponse.error(res, 500, "Internal Server Error", error);
  }
};

const createMosquito = async (req: Request, res: Response) => {
  try {
    const { title } = req.body;
    const baseUrl = getBaseUrl(req);

    const uploadedFiles = req.files as Express.Multer.File[];
    const images = uploadedFiles.map((file) => file.filename) ?? [];

    const mosquito = await MosquitoService.create({ title }, images);

    const newMosquito = {
      ...mosquito,
      images:
        mosquito.images?.map((img) => ({
          id: img.id,
          imagePath: `${baseUrl}/uploads/mosquito/${img.imagePath}`,
          createdAt: img.createdAt,
          updatedAt: img.updatedAt,
        })) ?? [],
    };

    return CustomResponse.success(
      res,
      201,
      "Mosquito Created Successfully",
      newMosquito
    );
  } catch (error) {
    if (error instanceof HttpError) {
      return CustomResponse.error(
        res,
        error.statusCode,
        error.message,
        error.error
      );
    }
    return CustomResponse.error(res, 500, "Internal Server Error", error);
  }
};

const updateMosquito = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { title, imageIdsToUnlink } = req.body;
    const uploadedFiles = req.files as Express.Multer.File[];
    const newImages = uploadedFiles.map((file) => file.filename) ?? [];
    const parsedImageIdsToUnlink =
      imageIdsToUnlink && Array.isArray(imageIdsToUnlink)
        ? imageIdsToUnlink.map(Number)
        : imageIdsToUnlink
        ? [Number(imageIdsToUnlink)]
        : [];
    const baseUrl = getBaseUrl(req);

    const updated = await MosquitoService.update(
      id,
      { title },
      newImages,
      parsedImageIdsToUnlink
    );

    const newUpdated = {
      ...updated,
      images: updated.images?.map((img) => ({
        id: img.id,
        imagePath: `${baseUrl}/uploads/mosquito/${img.imagePath}`,
        createdAt: img.createdAt,
        updatedAt: img.updatedAt,
      })),
    };

    return CustomResponse.success(
      res,
      200,
      "Mosquito Updated Successfully",
      newUpdated
    );
  } catch (error) {
    if (error instanceof HttpError) {
      return CustomResponse.error(
        res,
        error.statusCode,
        error.message,
        error.error
      );
    }
    return CustomResponse.error(res, 500, "Internal Server Error", error);
  }
};

const deleteMosquito = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const existing = await MosquitoService.getById(id);
    if (existing.images && existing.images.length > 0) {
      existing.images.forEach((img) => {
        deleteImageFile(img.imagePath, "uploads/mosquito");
      });
    }

    await MosquitoService.delete(id);

    return CustomResponse.success(res, 200, "Mosquito Deleted Successfully");
  } catch (error) {
    if (error instanceof HttpError) {
      return CustomResponse.error(
        res,
        error.statusCode,
        error.message,
        error.error
      );
    }
    return CustomResponse.error(res, 500, "Internal Server Error", error);
  }
};

export {
  getAllMosquito,
  getByIdMosquito,
  createMosquito,
  updateMosquito,
  deleteMosquito,
};
