import e, { Request, Response } from "express";
import EducationService from "../../infrastructure/services/education_service";
import { getBaseUrl } from "../../utils/getBaseUrl";
import CustomResponse from "../../utils/response";
import { HttpError } from "../../utils/HttpError";
import { deleteImageFile, renameImageFile } from "../../utils/imageHelper";

const getAllEducations = async (req: Request, res: Response) => {
  try {
    const educations = await EducationService.getAll();
    const baseUrl = getBaseUrl(req);

    const updatedData = educations.map((education) => ({
      ...education,
      images: education.images?.map((img) => ({
        ...img,
        imagePath: `${baseUrl}/uploads/education/${img.imagePath}`,
      })),
    }));
    return CustomResponse.success(
      res,
      200,
      "Educations fetched successfully",
      updatedData
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

const getByIdEducation = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const education = await EducationService.getById(id);
    const baseUrl = getBaseUrl(req);
    const updatedData = {
      ...education,
      images: education.images?.map((img) => ({
        ...img,
        imagePath: img.imagePath
          ? `${baseUrl}/uploads/education/${img.imagePath}`
          : null,
      })),
    };
    return CustomResponse.success(
      res,
      200,
      "Get Education Successfully",
      updatedData
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

const createEducation = async (req: Request, res: Response) => {
  try {
    const { title } = req.body;
    const baseUrl = getBaseUrl(req);
    const uploadedFiles = req.files as Express.Multer.File[];
    const images = uploadedFiles?.map((file) => file.filename) ?? [];

    const education = await EducationService.create({ title }, images);

    const updatedData = {
      ...education,
      images:
        education.images?.map((img) => ({
          id: img.id,
          imagePath: `${baseUrl}/uploads/education/${img.imagePath}`,
          createdAt: img.createdAt,
          updatedAt: img.updatedAt,
        })) ?? [],
    };

    return CustomResponse.success(
      res,
      201,
      "Education Created Successfully",
      updatedData
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

const updateEducation = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { title, imageIdsToUnlink } = req.body;
    const uploadedFiles = req.files as Express.Multer.File[];
    const imagePathsToLink = uploadedFiles?.map((file) => file.filename) ?? [];
    const parsedImageIdsToUnlink =
      imageIdsToUnlink && Array.isArray(imageIdsToUnlink)
        ? imageIdsToUnlink.map(Number)
        : imageIdsToUnlink
        ? [Number(imageIdsToUnlink)]
        : [];

    const baseUrl = getBaseUrl(req);

    const updated = await EducationService.update(
      id,
      { title },
      imagePathsToLink,
      parsedImageIdsToUnlink
    );

    const updatedData = {
      ...updated,
      images:
        updated.images?.map((img) => ({
          id: img.id,
          imagePath: `${baseUrl}/uploads/education/${img.imagePath}`,
          createdAt: img.createdAt,
          updatedAt: img.updatedAt,
        })) ?? [],
    };

    return CustomResponse.success(
      res,
      200,
      "Education Updated Successfully",
      updatedData
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

const deleteEducation = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const existing = await EducationService.getById(id);
    if (existing.images && existing.images.length > 0) {
      existing.images.forEach((img) => {
        deleteImageFile(img.imagePath, "uploads/education");
      });
    }
    // Hapus data education di database
    await EducationService.delete(id);

    return CustomResponse.success(res, 200, "Education deleted successfully");
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
  getAllEducations,
  getByIdEducation,
  createEducation,
  updateEducation,
  deleteEducation,
};
