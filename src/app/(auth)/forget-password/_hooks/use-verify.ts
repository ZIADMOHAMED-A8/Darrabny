'use client';

import { verifyOtpApi } from '@/lib/api/forgot-password-flow/verify.api';
import { OtpValues } from '@/lib/schemas/auth/forgot-password-schema';
import { useMutation } from '@tanstack/react-query';

export const useVerifyOtp = () => {
  const { mutate, isPending, data, error } = useMutation({
    mutationFn: async (data: OtpValues) => {
      const res = await verifyOtpApi(data);
      if (res.error) {
        throw new Error(res.error || 'Something went wrong');
      }
      return res;
    },
    onSuccess: (data) => {
      return data;
    },
    onError: (err) => {
      return err;
    },
  });

  return { mutate, isPending, data, error };
};
