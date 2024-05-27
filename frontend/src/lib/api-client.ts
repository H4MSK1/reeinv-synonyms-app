import { VITE_APP_BACKEND_URL } from "@/constants";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

export const apiClient = axios.create({
  baseURL: VITE_APP_BACKEND_URL,
  headers: { "Content-Type": "application/json; charset=utf-8" },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const message: string =
      (error?.response?.data as { message?: string })?.message ||
      error?.message ||
      "Unknown error occured, try again later.";

    toast.error(message);
    return Promise.reject(error);
  }
);
