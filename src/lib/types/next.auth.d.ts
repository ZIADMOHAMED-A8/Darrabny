// الفايل اللي هعمل فيه ديكلريشن للتايب اسكريبت بتاع ال next-auth عشان اقدر اتعامل مع الداتا اللي مش موجودة فيها زي first name , last name
import { User } from "next-auth"

declare module "next-auth" {

    interface User {
            /** The user's postal address. */
            "_id":string;
            "username": string;
            "firstName": string;
            "lastName": string;
            "email": string;
            "phone": string;
            "role": string;
            "isVerified": boolean;
            "createdAt": string;
            "accessToken":string; 
          }
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session extends Omit <User , "accessToken"> {}
}

import { JWT } from "next-auth/jwt"

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT extends User {

  }
}