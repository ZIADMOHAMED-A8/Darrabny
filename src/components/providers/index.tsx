import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ReactQueryProvider from "./_components/react-query.provider";
import NextAuthProvider from "./_components/next-auth.provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <ReactQueryDevtools />

      <NextAuthProvider>{children}</NextAuthProvider>
    </ReactQueryProvider>
  );
}
