// "use client";

// import { useEffect } from "react";
// import { setAxiosToken } from "../lib/axios";
// import { getServerToken } from "../lib/utils/get-token";

// export default function TokenInitializer() {
//   useEffect(() => {
//     async function init() {
//       const token = await getServerToken();
//       if (token?.accessToken) {
//         console.log("TokenInitializer got token:", token);
        
//         setAxiosToken(token.accessToken);
//       }
//     }
//     init();
//   }, []);

//   return null;
// }