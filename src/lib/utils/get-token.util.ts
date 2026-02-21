import { decode } from 'next-auth/jwt';
import { cookies } from 'next/headers';

export async function getToken() {
  const tokenCookies = cookies().get('next-auth.session-token')?.value;

  if (!tokenCookies) return null;

  try {
    const jwt = await decode({
      token: tokenCookies,
      secret: process.env.NEXTAUTH_SECRET!,
    });
    return jwt?.token;
  } catch (error) {
    return null;
  }
}
