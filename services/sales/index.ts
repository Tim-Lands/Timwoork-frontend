import API from "../../config";
async function getAll() {
  const res = await API.get("api/new/me/items/sales");
  return res?.data?.data;
}
async function getOne(id) {
  const res = await API.get("/api/new/me/items/sales/" + id);
  return res?.data?.data;
}
async function updateOne(query: string, body = {}, headers = {}) {
  const res = await API.post(query, body, headers);
  return res.data.data;
}
export const SalesService = { getAll, getOne, updateOne };
