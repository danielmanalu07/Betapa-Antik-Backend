import { Request, Response } from "express";
import { HttpError } from "../../utils/HttpError";
import CustomResponse from "../../utils/response";
import surveyService from "../../infrastructure/services/survey_service";
import { getBaseUrl } from "../../utils/getBaseUrl";
import {
  deleteImageFile,
  renameImageFile,
  replaceImageFile,
} from "../../utils/imageHelper";

const getAllSurvey = async (req: Request, res: Response) => {
  try {
    const healthCenterId = Number(req.params.id);

    const surveys = await surveyService.getAll(healthCenterId);
    const baseUrl = getBaseUrl(req);
    const updatedData = surveys.map((item) => ({
      ...item,
      bukti_gambar: item.bukti_gambar
        ? `${baseUrl}/uploads/survey/${item.bukti_gambar}`
        : null,
    }));
    return CustomResponse.success(
      res,
      200,
      "Get All Surveys Successfully",
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

const getByIdSurvey = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const survey = await surveyService.getById(id);
    const baseUrl = getBaseUrl(req);
    const updatedData = {
      ...survey,
      image: survey.bukti_gambar
        ? `${baseUrl}/uploads/survey/${survey.bukti_gambar}`
        : null,
    };
    return CustomResponse.success(
      res,
      200,
      "Get Survey Successfully",
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

const createSurvey = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const {
      healthCenterId,
      nama_lengkap_responden,
      kelurahan,
      rt,
      rw,
      jumlah_anggota_keluarga,
      jumlah_penampungan_air,
      jumlah_jentik,
      jenis_penampungan_dirumah,
      jenis_penampungan_diluar,
      kuras_penampungan_air,
      terkena_dbd,
      catatan,
    } = req.body;

    const bukti_gambar = req.file?.filename || "";

    const data = {
      userId: Number(userId),
      healthCenterId: Number(healthCenterId),
      nama_lengkap_responden,
      kelurahan,
      rt,
      rw,
      jumlah_anggota_keluarga: Number(jumlah_anggota_keluarga),
      jumlah_penampungan_air: Number(jumlah_penampungan_air),
      jumlah_jentik: Number(jumlah_jentik),
      jenis_penampungan_dirumah,
      jenis_penampungan_diluar,
      kuras_penampungan_air,
      terkena_dbd,
      bukti_gambar,
      catatan,
    };

    const survey = await surveyService.create(data);

    let finalImage = null;
    if (bukti_gambar) {
      finalImage = renameImageFile(
        bukti_gambar,
        kelurahan,
        survey.id,
        "uploads/survey"
      );
      await surveyService.updateImage(survey.id, await finalImage);
    }
    const baseUrl = getBaseUrl(req);
    return CustomResponse.success(res, 201, "Survey Created Successfully", {
      ...survey,
      bukti_gambar: finalImage
        ? `${baseUrl}/uploads/survey/${finalImage}`
        : null,
    });
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

const updateSurvey = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const userId = (req as any).user.id;
    const {
      healthCenterId,
      nama_lengkap_responden,
      kelurahan,
      rt,
      rw,
      jumlah_anggota_keluarga,
      jumlah_penampungan_air,
      jumlah_jentik,
      jenis_penampungan_dirumah,
      jenis_penampungan_diluar,
      kuras_penampungan_air,
      terkena_dbd,
      catatan,
    } = req.body;

    const bukti_gambar = req.file?.filename || "";

    const data = {
      userId: Number(userId),
      healthCenterId: Number(healthCenterId),
      nama_lengkap_responden,
      kelurahan,
      rt,
      rw,
      jumlah_anggota_keluarga: Number(jumlah_anggota_keluarga),
      jumlah_penampungan_air: Number(jumlah_penampungan_air),
      jumlah_jentik: Number(jumlah_jentik),
      jenis_penampungan_dirumah,
      jenis_penampungan_diluar,
      kuras_penampungan_air,
      terkena_dbd,
      bukti_gambar,
      catatan,
    };

    const survey = await surveyService.update(id, data);

    const existing = await surveyService.getById(id);

    const finalImage = existing.bukti_gambar;
    if (bukti_gambar) {
      const finalImage = replaceImageFile(
        existing.bukti_gambar,
        bukti_gambar,
        kelurahan,
        id,
        "uploads/survey"
      );
      await surveyService.updateImage(survey.id, await finalImage);
    }
    const baseUrl = getBaseUrl(req);
    return CustomResponse.success(res, 200, "Survey Updated Successfully", {
      ...survey,
      bukti_gambar: finalImage
        ? `${baseUrl}/uploads/survey/${finalImage}`
        : null,
    });
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

const deleteSurvey = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const existing = await surveyService.getById(id);
    if (existing.bukti_gambar) {
      deleteImageFile(existing.bukti_gambar, "uploads/survey");
    }
    await surveyService.delete(id);
    return CustomResponse.success(res, 200, "Survey Deleted Successfully");
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
  getAllSurvey,
  getByIdSurvey,
  createSurvey,
  updateSurvey,
  deleteSurvey,
};
