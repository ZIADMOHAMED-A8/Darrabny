import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ReactQueryProvider from "./_components/react-query.provider";
import NextAuthProvider from "./_components/next-auth.provider";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
      <ReactQueryProvider>
        <ReactQueryDevtools />
        <NextAuthProvider>{children}</NextAuthProvider>
      </ReactQueryProvider>
    </GoogleOAuthProvider>
  );
}
