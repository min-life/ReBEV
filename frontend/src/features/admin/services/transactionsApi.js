import { api, authHeaders } from "./adminApi";

export const getOrders = async (type, searchKey = "") => {
  const res = await api.get(`/orders?order_type=${type}${searchKey}`, {
    headers: authHeaders(),
  });
  return res.data;
};

export const getOrdersById = async (id) => {
  const res = await api.get(`/orders/${id}`, {
    headers: authHeaders(),
  });
  return res.data;
};

export const updateOrderStatus = async (id, status) => {
  const res = await api.post(
    `/orders/${id}/status`,
    { status },
    { headers: authHeaders() }
  );
  return res.data;
};

export const updateContractFile = async (id, url) => {
  const res = await api.patch(
    `/order-details/${id}/contract`,
    { contract_file: url },
    { headers: authHeaders() }
  );
  return res.data;
};

export const getComplaints = async (searchKey = "") => {
  const res = await api.get(`/complaints${searchKey}`, {
    headers: authHeaders(),
  });
  return res.data;
};

export const changeComplaintStatus = async (id, status) => {
  const res = await api.patch(
    `/complaints/${id}/status`,
    { status },
    { headers: authHeaders() }
  );
  return res.data;
};
