export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  status: number;
}

export function SuccessResponse<T = any>(
  message: string,
  data?: T,
  status = 200
): ApiResponse<T> {
  return {
    success: true,
    message,
    data,
    status,
  };
}

export function ErrorResponse(
  message: string,
  status = 500,
  details?: any
): ApiResponse {
  return {
    success: false,
    message,
    status,
    data: details,
  };
}
