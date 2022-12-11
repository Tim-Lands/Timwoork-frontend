import API from "../../config";
async function getAll() {
  const res = await API.get("api/new/me/items/purchases");
  return res.data.data;
}
async function getOne(id: number) {
  const res = await API.get("api/new/me/items/purchases/" + id);
  return res.data.data;
}
async function updateOne(query: string, body = {}, headers = {}) {
  const res = await API.post(query, body, headers);
  return res.data.data;
}
export const PurchasesService = { getAll, getOne, updateOne };
