import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_URL,
});


api.interceptors.response.use(
  (res) => {
    const data = res.data;
    if (data?.success === false) {
      return Promise.reject(data.message || "Request failed");
    }
    if (data?.success === true && "data" in data) {
      return data.data;
    }
    return data;
  },
  (err) => {
    const msg =
      err.response?.data?.message ||
      err.message ||
      "Something went wrong";
    if (process.env.NODE_ENV === "development") {
      console.error("[API ERROR]", msg);
    }
    return Promise.reject(msg);
  }
);

export function setAxiosToken(token?: string) {
  if (token) {
    console.log("Setting axios token:", token);
    
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
}

export default api;