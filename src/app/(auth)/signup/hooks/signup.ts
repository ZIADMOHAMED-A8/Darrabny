'use client';

import { RegisterValues } from '@/lib/schemas/auth';
import { useMutation } from '@tanstack/react-query';
import { createAccountAction } from '../../services/auth';

export function useCreateAccountAction() {
  return useMutation({
    mutationFn: async (values: RegisterValues) => {
      return await createAccountAction(values);
    },
  });
}
