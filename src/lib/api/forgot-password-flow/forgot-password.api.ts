// "use server";

// // import { EmailValue } from "@/lib/schemas/auth/forgot-password-schema";
// import { forgetPasswordErrorResponse } from "@/lib/types/forgot-password";


// export const forgotPassword = async (
//   // email: EmailValue,
// ): Promise<forgetPasswordErrorResponse> => {
//   try {
//     const response = await fetch(
//       "https://flower.elevateegy.com/api/v1/auth/forgotPassword",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         },

//         body: JSON.stringify(email),
//       },
//     );

//     const payload: forgetPasswordErrorResponse = await response.json();

//     return payload;
//   } catch (error) {
//     return {
//       error: "error",
//       info: `Something went wrong: ${error}`,
//     } as forgetPasswordErrorResponse;
//   }
// };
