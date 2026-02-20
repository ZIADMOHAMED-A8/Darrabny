import type { NextAuthOptions, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  pages: { signIn: "/login" },

  providers: [
    Credentials({
      name: "Credentials",
      credentials: { email: {}, password: {} },

      authorize: async (credentials) => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5000";

        const response = await fetch(`${apiUrl}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });

        const payload: ApiResponse<User> = await response.json().catch(() => ({} as any));

        if (!response.ok) {
          // لو الباك بيرجع رسالة مختلفة
          const msg = (payload as any)?.error || (payload as any)?.message || "Login failed";
          throw new Error(msg);
        }

        if ("error" in (payload as any)) throw new Error((payload as any).error);

        return {
          id: (payload as any).user._id,
          user: (payload as any).user,
          token: (payload as any).token,
        };
      },
    }),

    GoogleProvider({
      clientId: process.env.CLIENT_ID!,
      clientSecret: process.env.CLIENT_SECRET!,
    }),
  ],

  session: { strategy: "jwt" },

  callbacks: {
    async jwt({ token, user, account }) {
      // ✅ Credentials login
      if (user && !account) {
        (token as any).token = (user as any).token;
        (token as any).user = (user as any).user;
        (token as any).backendError = null;
        return token;
      }

      // ✅ Google login
      if (account?.provider === "google") {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5000";
        const idToken = account.id_token;

        console.log("✅ Google id_token exists?", !!idToken);
        console.log("✅ Backend URL:", apiUrl);

        try {
          const res = await fetch(`${apiUrl}/auth/loginWithGmail`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ idToken }),
          });

          console.log("✅ Backend /auth/loginWithGmail status:", res.status);

          const data = await res.json().catch(() => ({}));
          console.log("✅ Backend response:", data);

          if (res.ok && data?.accessToken) {
            (token as any).token = data.accessToken;
            (token as any).backendError = null;
            console.log("✅ Saved backend accessToken?", true);
          } else {
            (token as any).token = null;
            (token as any).backendError =
              data?.message || data?.error || "Backend login failed";
            console.log("❌ Backend error:", (token as any).backendError);
          }
        } catch (e: any) {
          (token as any).token = null;
          (token as any).backendError = "Backend unreachable";
          console.log("❌ Backend fetch error:", e?.message || e);
        }
      }

      return token;
    },

    async session({ session, token }) {
      (session as any).user = (token as any).user;
      (session as any).backendError = (token as any).backendError;
      return session;
    },
  },
};
