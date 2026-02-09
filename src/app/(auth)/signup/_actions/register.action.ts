'use server';

import { SignupValues } from '@/lib/schemas/signup.schema';

export async function signupAction(values: SignupValues) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/signup`, {
    method: 'POST',
    body: JSON.stringify(values),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.json();
}
