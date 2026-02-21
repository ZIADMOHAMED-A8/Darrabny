declare type SuccessResponse<T> = {
  message: string;
} & T;

declare interface ErrorResponse {
  error: string;
}
declare type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;
