import { api, authHeaders } from "./adminApi";

export const fetchPost = async (searchKey = "") => {
  const res = await api.get(`/posts${searchKey}`);
  return res.data;
};

export const getPostById = async (id) => {
  const res = await api.get(`/posts/${id}`);
  return res.data;
};

export const updatePostStatus = async (postId, newStatus) => {
  const res = await api.patch(
    `/posts/${postId}/status`,
    { status: newStatus },
    { headers: authHeaders() }
  );
  return res.data;
};

export const getVariations = async () => {
  const res = await api.get("/variations");
  return res.data;
};

export const getVariationValues = async () => {
  const res = await api.get("/VariationValues");
  return res.data;
};
