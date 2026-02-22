import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
<<<<<<< HEAD
    user: User["user"];
    token?: string;
    id_token?: string;
=======
    token?: any;
    user?: any;
>>>>>>> 1e86fee6e54e7c9896be09c10b9a9e5efc542b3e
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    token?: any;
    user?: any;
  }
}