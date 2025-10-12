

declare type ErrorResponse = {
    message:"string",
    code:"number"
}

declare type SuccesResponse<T> = {
    message:"string"
} & T

declare type ApiResponse<T> = ErrorResponse | SuccesResponse<T> 