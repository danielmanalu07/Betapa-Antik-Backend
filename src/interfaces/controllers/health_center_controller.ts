import { Request, Response } from "express";
import healthCenterService from "../../infrastructure/services/health_center_service";
import CustomResponse from "../../utils/response";
import { HttpError } from "../../utils/HttpError";
import path from "path";
import fs from "fs";
import { getBaseUrl } from "../../utils/getBaseUrl";
import {
  deleteImageFile,
  renameImageFile,
  replaceImageFile,
} from "../../utils/imageHelper";

const getAllHealthCenter = async (req: Request, res: Response) => {
  try {
    const healthCenters = await healthCenterService.getAll();
    const baseUrl = getBaseUrl(req);
    const updatedData = healthCenters.map((item: any) => ({
      ...item,
      image: item.image
        ? `${baseUrl}/uploads/healthCenter/${item.image}`
        : null,
    }));
    return CustomResponse.success(
      res,
      200,
      "Get All Health Center Successfully",
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

const getByIdHealthCenter = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const healthCenter = await healthCenterService.getById(id);
    const baseUrl = getBaseUrl(req);
    const updatedData = {
      ...healthCenter,
      image: healthCenter.image
        ? `${baseUrl}/uploads/healthCenter/${healthCenter.image}`
        : null,
    };
    return CustomResponse.success(
      res,
      200,
      "Get Health Center Successfully",
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

const createHealthCenter = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const image = req.file?.filename;
    const healthCenter = await healthCenterService.create({
      name: name,
      image: image as string,
    });

    let finalImage = null;
    if (image) {
      finalImage = renameImageFile(
        image,
        name,
        healthCenter.id,
        "uploads/healthCenter"
      );
      await healthCenterService.updateImage(healthCenter.id, await finalImage);
    }

    const baseUrl = getBaseUrl(req);

    return CustomResponse.success(
      res,
      201,
      "Health Center Created Successfully",
      {
        ...healthCenter,
        image: finalImage
          ? `${baseUrl}/uploads/healthCenter/${finalImage}`
          : null,
      }
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

const updateHealthCenter = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { name } = req.body;
    const image = req.file?.filename;
    const existing = await healthCenterService.getById(id);
    const healthCenter = await healthCenterService.update(id, { name, image });

    const finalImage = existing.image;
    if (image) {
      const finalImage = await replaceImageFile(
        existing.image,
        image,
        name,
        id,
        "uploads/healthCenter"
      );
      await healthCenterService.updateImage(id, finalImage);
    }

    const baseUrl = getBaseUrl(req);

    return CustomResponse.success(
      res,
      200,
      "Health Center Updated Successfully",
      {
        ...healthCenter,
        image: finalImage
          ? `${baseUrl}/uploads/healthCenter/${finalImage}`
          : null,
      }
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

const deleteHealthCenter = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const existing = await healthCenterService.getById(id);
    if (existing.image) {
      deleteImageFile(existing.image, "uploads/healthCenter");
    }
    await healthCenterService.delete(id);
    return CustomResponse.success(
      res,
      200,
      "Health Center Deleted Successfully"
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

export {
  getAllHealthCenter,
  getByIdHealthCenter,
  createHealthCenter,
  updateHealthCenter,
  deleteHealthCenter,
};
