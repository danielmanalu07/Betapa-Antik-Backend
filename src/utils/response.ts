class CustomResponse {
  static success(
    res: any,
    statusCode: number,
    message: string,
    data: any = null
  ) {
    return res.status(statusCode).json({
      success: true,
      status_code: statusCode,
      message: message,
      data: data,
    });
  }

  static error(
    res: any,
    statusCode: number,
    message: string,
    error: any = null
  ) {
    return res.status(statusCode).json({
      success: false,
      status_code: statusCode,
      message: message,
      error: error,
    });
  }
}

export default CustomResponse;
