import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    token?: any;
    user?: any;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    token?: any;
    user?: any;
  }
}