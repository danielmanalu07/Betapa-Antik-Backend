import { Request, Response } from "express";
import VideoService from "../../infrastructure/services/video_service";
import CustomResponse from "../../utils/response";
import { HttpError } from "../../utils/HttpError";

const getAllVideo = async (req: Request, res: Response) => {
  try {
    const videos = await VideoService.getAll();
    return CustomResponse.success(res, 200, "Get Video Successfully", videos);
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

const getByIdVideo = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const video = await VideoService.getById(id);

    return CustomResponse.success(
      res,
      200,
      "Get Video Detail Successfully",
      video
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
    return CustomResponse.error(res, 500, "Internal Server Error");
  }
};

const createVideo = async (req: Request, res: Response) => {
  try {
    const { title, url } = req.body;
    const video = await VideoService.create({ title, url });
    return CustomResponse.success(
      res,
      201,
      "Created Video Successfully",
      video
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

const updateVideo = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { title, url } = req.body;

    const updated = await VideoService.update(id, { title, url });

    return CustomResponse.success(
      res,
      200,
      "Updated Video Successfully",
      updated
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

const deleteVideo = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    await VideoService.delete(id);
    return CustomResponse.success(res, 200, "Delete Video Successfully");
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

export { getAllVideo, getByIdVideo, createVideo, updateVideo, deleteVideo };
