'use client';


import { forgotPassword } from '@/lib/api/forgot-password-flow/forgot-password.api';
import { EmailValue } from '@/lib/schemas/auth/forgot-password-schema';
import { useMutation } from '@tanstack/react-query';

export const useEmail = () => {
  const { mutate, isPending, data, error } = useMutation({
    mutationFn: async (values: EmailValue) => {
      const res = await forgotPassword(values);
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
