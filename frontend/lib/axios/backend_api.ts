import axios from "axios";

const backendApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_HOST + "/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default backendApi;
