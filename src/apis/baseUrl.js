export const BASE_URL =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_LOCAL_SERVER_URL
    : import.meta.env.SECRET_SERVER_URL;
