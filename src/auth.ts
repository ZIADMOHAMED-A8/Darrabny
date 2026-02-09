import { NextAuthOptions, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
// NextAuth configuration options
export const authOptions: NextAuthOptions = {
  pages: {
    // Redirect users to custom login page instead of default NextAuth UI
    signIn: "/login",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      // Authorize callback handles user authentication via custom backend API
      authorize: async (credentials) => {
        // Send credentials to backend for verification
        const response = await fetch(
          `${process.env.NEXTAUTH_URL}/auth/login`,
          {
            method: "POST",
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        const payload: ApiResponse<User> = await response.json();
        // If API returns an error, throw to fail authentication
        if ("error" in payload) {
          throw new Error(payload.error);
        }
        // Return user and token data to NextAuth
        return {
          id: payload.user._id,
          user: payload.user,
          token: payload.token,
        };
      },
    }),
  ],
  callbacks: {
    // Attach token and user data to the JWT
    jwt: ({ token, user }) => {
      if (user) {
        token.token = user.token;
        token.user = user.user;
      }
      return token;
    },
    // Make token data available in client-side session
    session: ({ session, token }) => {
      session.user = token.user;
      return session;
    },
  },
};
