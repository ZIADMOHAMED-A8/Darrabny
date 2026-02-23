import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
<<<<<<< HEAD
    token?: any;
    user?: any;
=======
<<<<<<< HEAD
    user: User["user"];
    token?: string;
    id_token?: string;
=======
    token?: any;
    user?: any;
>>>>>>> 1e86fee6e54e7c9896be09c10b9a9e5efc542b3e
>>>>>>> f3a4a8f59029fdc0155b005ce4c3baff2da80947
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    token?: any;
    user?: any;
  }
}