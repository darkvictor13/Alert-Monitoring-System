import axios from "axios";

const backendApi = axios.create({
  baseURL: (process.env.NEXT_PUBLIC_HOST || "http://localhost:4000") + "/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

/*
backendApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const status = error?.response?.status || 500;
    if (status === 401) {
      throw new Error("You have been logged out, please login again");
    } else if (status === 403) {
      throw new Error("You are not authorized to perform this action");
    } else if (status === 404) {
      throw new Error("Resource not found");
    } else if (status === 500) {
      throw new Error("Internal server error");
    }
  }
);
*/

export default backendApi;
