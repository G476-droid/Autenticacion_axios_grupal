import axios from "axios";

export const api = axios.create({
  baseURL: "https://rickandmortyapi.com/api",
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  config.headers.Accept = "application/json";
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);
