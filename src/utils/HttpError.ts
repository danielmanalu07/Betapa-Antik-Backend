export class HttpError extends Error {
  public statusCode: number;
  public error?: any;

  constructor(message: string, statusCode = 500, error?: any) {
    super(message);
    this.statusCode = statusCode;
    this.error = error;
  }
}
