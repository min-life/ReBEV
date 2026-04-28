import { api, authHeaders } from "./adminApi";

export const getStaticPage = async (year) => {
  const res = await api.get(`/statistics?year=${year}`, {
    headers: authHeaders(),
  });
  return res.data;
};
