import api from "@/services/api";

export const baseAPI = import.meta.env.VITE_BASE_URL;

export const authHeaders = () => {
  const token = localStorage.getItem("accessToken");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export { api };
