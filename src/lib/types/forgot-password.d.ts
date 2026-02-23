export interface forgetPasswordErrorResponse {
  error: string;
}

export interface otpApiErrorResponse {
  error: string;
}
export type ResetData = {
  email: string;
  newPassword: string;
};

export type ResetPasswordResponse = {
  message: string;
  token?: string;
  code: number | string;
};
