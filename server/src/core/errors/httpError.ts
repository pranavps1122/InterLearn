
export interface HttpErrorOptions {
  status?: number;
  details?: any;
}


export class HttpError extends Error {
  public status: number;
  public details?: any;
  public isHttpError = true;

  constructor(message: string, options: HttpErrorOptions = {}) {
    super(message);
    this.name = "HttpError";
    this.status = options.status ?? 500;
    this.details = options.details;

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace?.(this, this.constructor);
  }

  static BadRequest(message = "Bad Request", details?: any) {
    return new HttpError(message, { status: 400, details });
  }
  static Unauthorized(message = "Unauthorized", details?: any) {
    return new HttpError(message, { status: 401, details });
  }
  static Forbidden(message = "Forbidden", details?: any) {
    return new HttpError(message, { status: 403, details });
  }
  static NotFound(message = "Not Found", details?: any) {
    return new HttpError(message, { status: 404, details });
  }
  static Conflict(message = "Conflict", details?: any) {
    return new HttpError(message, { status: 409, details });
  }
  static Internal(message = "Internal Server Error", details?: any) {
    return new HttpError(message, { status: 500, details });
  }
}

export function isHttpError(err: unknown): err is HttpError {
  return !!(err && typeof err === "object" && (err as any).isHttpError === true);
}
