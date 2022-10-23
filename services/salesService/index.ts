import API from "../../config";
async function getAll() {
  const res = await API.get("api/my_sales");
  return res?.data?.data;
}
async function getOne(id) {
  const res = await API.get("api/my_sales/" + id);
  return res?.data?.data;
}
export const SalesService = { getAll, getOne };
