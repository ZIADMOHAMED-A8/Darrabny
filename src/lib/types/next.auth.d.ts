import { User } from "next-auth";

declare module "next-auth" {
  interface User {
    user: {
      _id: string;
      firstName: string;
      lastName: string;
      email: string;
      gender: string;
      phone: string;
      photo: string;
      role: string;
      wishlist: string[];
      addresses: {
        street: string;
        phone: string;
        city: string;
        lat: string;
        long: string;
        username: string;
        _id: string;
      }[];
      createdAt: string;
    };
    token: string;
  }

  interface Session {
    user: User["user"];
    token?: string;
    id_token?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: User["user"];
    token: string;
    id_token?: string;
  }
}
