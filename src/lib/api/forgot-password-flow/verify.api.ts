'use server';


import { OtpValues } from '@/lib/schemas/auth/forgot-password-schema';
import { otpApiErrorResponse } from '@/lib/types/forgot-password';

export const verifyOtpApi = async (data: OtpValues): Promise<otpApiErrorResponse> => {
  try {
    const response = await fetch('https://flower.elevateegy.com/api/v1/auth/verifyResetCode', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(data),
    });

    const payload: otpApiErrorResponse = await response.json();

    return payload;
  } catch (error) {
    return {
      error: 'error',
      info: `Something went wrong: ${error}`,
    } as otpApiErrorResponse;
  }
};
