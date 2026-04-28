import { api, authHeaders } from "./adminApi";

export const fetchUsers = async (searchKey = "") => {
  const glue = searchKey.includes("?") ? "&" : "?";
  const res = await api.get(`/users${searchKey}${glue}sort=DESC`);
  return res.data;
};

export const fetchUserById = async (userId) => {
  const res = await api.get(`/users/${userId}`);
  return res.data;
};

export const lockUserAccount = async (userId) => {
  const res = await api.patch(`/users/${userId}/lock-account`, {}, {
    headers: authHeaders(),
  });
  return res.data;
};

export const unLockUserAccount = async (userId) => {
  const res = await api.patch(`/users/${userId}/unlock-account`, {}, {
    headers: authHeaders(),
  });
  return res.data;
};

export const createStaffAccount = async (staff) => {
  const res = await api.post(
    "/users/register-staff",
    { email: staff.email, phone: staff.phone },
    { headers: authHeaders() }
  );
  return res.data;
};
