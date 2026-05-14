// import type { NextAuthOptions } from "next-auth";
// import Credentials from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";

// export const authOptions: NextAuthOptions = {
//   pages: { signIn: "/login" },

//   providers: [
//     Credentials({
//       name: "Credentials",
//       credentials: { email: {}, password: {} },

//       authorize: async (credentials) => {
//         const apiUrl =
//           process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5000";

//         const response = await fetch(`${apiUrl}/auth/login`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             email: credentials?.email,
//             password: credentials?.password,
//           }),
//         });

//         const payload: any = await response.json().catch(() => ({}));

//         if (!response.ok) {
//           const msg = payload?.error || payload?.message || "Login failed";
//           throw new Error(msg);
//         }

//         // ✅ رجّعي نفس الداتا اللي بتستخدميها
//         return {
//           id: payload?.user?._id,
//           user: payload?.user,
//           token: payload?.token,
//         };
//       },
//     }),

//     GoogleProvider({
//       clientId: process.env.CLIENT_ID!,
//       clientSecret: process.env.CLIENT_SECRET!,
//     }),
//   ],

//   session: { strategy: "jwt" },

//   callbacks: {
//     async jwt({ token, user, account }) {
//       // ✅ Credentials login (ثابت ومضمون)
//       if (account?.provider === "credentials" && user) {
//         (token as any).token = (user as any).token; // JWT بتاع الباك
//         (token as any).user = (user as any).user;   // بيانات اليوزر
//         (token as any).backendError = null;
//         return token;
//       }

//       // ✅ Google login → بنبدّل id_token بتاع جوجل بتوكن من الباك
//       if (account?.provider === "google") {
//         const apiUrl =
//           process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5000";
//         const idToken = account.id_token;

//         try {
//           const res = await fetch(`${apiUrl}/auth/loginWithGmail`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ idToken }),
//           });

//           const data: any = await res.json().catch(() => ({}));

//           // ✅ خليها تدعم الاتنين: token أو accessToken (حسب الباك)
//           const backendToken =
//             data?.token || data?.accessToken || data?.jwt || null;

//           if (res.ok && backendToken) {
//             (token as any).token = backendToken;
//             (token as any).user = data?.user || (token as any).user || null;
//             (token as any).backendError = null;
//           } else {
//             (token as any).token = null;
//             (token as any).backendError =
//               data?.message || data?.error || "Backend login failed";
//           }
//         } catch (e: any) {
//           (token as any).token = null;
//           (token as any).backendError = "Backend unreachable";
//         }
//       }

//       return token;
//     },

//     async session({ session, token }) {
//       // ✅ نفس اللي عندك + نخلي التوكن يوصل للكلينت لو محتاجاه
//       (session as any).user = (token as any).user;
//       (session as any).token = (token as any).token; // JWT بتاع الباك eyJ...
//       (session as any).backendError = (token as any).backendError;
//       return session;
//     },
//   },
// };

import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },

  providers: [
    // ==========================
    // Credentials Provider
    // ==========================
    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
        role: {
        },
      },

     authorize: async (credentials) => {
  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5000";

  console.log("=== LOGIN ATTEMPT ===");
  console.log("Incoming credentials:", credentials);
  console.log("Incoming role:", credentials?.role);

  let url = `${apiUrl}/auth/login`;

  if (credentials?.role === "company") {
    url = `${apiUrl}/company/login`;
  }

  if (credentials?.role === "college") {
    url = `${apiUrl}/college/signin`;
  }

  console.log("Final URL:", url);

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: credentials?.email,
      password: credentials?.password,
    }),
  });

  console.log("Response status:", response.status);

  const payload = await response.json().catch(() => ({}));

  console.log("Payload:", payload);

  if (!response.ok) {
    throw new Error(payload?.error || payload?.message || "Login failed");
  }

  const actualUser =
    payload?.user ||
    payload?.company ||
    payload?.college;

  const role =
    payload?.user
      ? "user"
      : payload?.company
      ? "company"
      : "college";

  console.log("Detected role from backend:", role);

  return {
    id: actualUser?._id,
    user: {
      ...actualUser,
      role,
    },
    token: payload?.token,
  };
},
    }),

    // ==========================
    // Google Provider
    // ==========================
    GoogleProvider({
      clientId: process.env.CLIENT_ID!,
      clientSecret: process.env.CLIENT_SECRET!,
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    // ==========================
    // JWT Callback
    // ==========================
    async jwt({ token, user, account }) {
      // أول مرة بس وقت تسجيل الدخول
      if (user) {
        token.user = (user as any).user;
        token.token = (user as any).token;
      }

      // Google login → تبادل id_token مع الباك
      if (account?.provider === "google" && account.id_token) {
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5000";

        try {
          const res = await fetch(`${apiUrl}/auth/loginWithGmail`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ idToken: account.id_token }),
          });

          const data = await res.json().catch(() => ({}));

          const backendToken = data?.token || data?.accessToken || data?.jwt;

          if (res.ok && backendToken) {
            token.token = backendToken;
            token.user = data?.user;
          }
        } catch {
          token.token = undefined;
        }
      }

      return token;
    },

    // ==========================
    // Session Callback
    // ==========================
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
};

// import { NextAuthOptions, User } from 'next-auth';
// import Credentials from 'next-auth/providers/credentials';
// // NextAuth configuration options
// export const authOptions: NextAuthOptions = {
//   pages: {
//     // Redirect users to custom login page instead of default NextAuth UI
//     signIn: '/login',
//   },
//   providers: [
//     Credentials({
//       name: 'Credentials',
//       credentials: {
//         email: {},
//         password: {},
//       },
//       // Authorize callback handles user authentication via custom backend API
//       authorize: async (credentials) => {
//          const apiUrl =
//           process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5000";
//         // Send credentials to backend for verification
//         const response = await fetch(`${apiUrl}/auth/login`, {
//           method: 'POST',
//           body: JSON.stringify({
//             email: credentials?.email,
//             password: credentials?.password,
//           }),
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });
//         const payload: ApiResponse<User> = await response.json();
//         // If API returns an error, throw to fail authentication
//         if ('error' in payload) {
//           throw new Error(payload.error);
//         }
//         // Return user and token data to NextAuth
//         return {
//           id: payload.user._id,
//           user: payload.user,
//           token: payload.token,
//         };
//       },
//     }),
//   ],
//   callbacks: {
//     // Attach token and user data to the JWT
//     jwt: ({ token, user }) => {
//       if (user) {
//         token.token = user.token;
//         token.user = user.user;
//       }
//       return token;
//     },
//     // Make token data available in client-side session
//     session: ({ session, token }) => {
//       session.user = token.user;
//       return session;
//     },
//   },
// };
