import { api, authHeaders } from "./adminApi";

export const getFullPackage = async () => {
  const res = await api.get("/packages");
  return res.data;
};

export const createPackage = async (packageData) => {
  const res = await api.post("/packages/create", packageData, {
    headers: authHeaders(),
  });
  return res.data;
};

export const deletePackage = async (packageId) => {
  const res = await api.patch(`/packages/${packageId}/delete`, {}, {
    headers: authHeaders(),
  });
  return res.data;
};

export const getCategory = async () => {
  const res = await api.get("/categories");
  return res.data;
};

export const updateCategory = async (categoryId, rate) => {
  const res = await api.put(
    `/categories/${categoryId}/rate`,
    { rate },
    { headers: authHeaders() }
  );
  return res.data;
};
