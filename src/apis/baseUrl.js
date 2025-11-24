export const BASE_URL =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_LOCAL_SERVER_URL
    : import.meta.env.VITE_SECRET_SERVER_URL;

export const API_BASE_URL = import.meta.env.VITE_OPEN_API_URL;
export const OPEN_API_KEY = import.meta.env.VITE_OPEN_API_KEY;