import axios from "axios";

export const BASE_URL = "https://be-cafe-server.vercel.app";

export const workAxios = axios.create({
  baseURL: BASE_URL,
});
