import API from "../../config";
async function getAll(params?: any) {
  const res = await API.get("api/new/me/products", { params });
  return res.data.data;
}
async function getOne(id: number) {
  const res = await API.get("api/my_products/product/" + id);
  return res.data.data;
}
async function updateOne(id: number, is_active: boolean) {
  const res = await API.put(`api/new/me/products/${id}/is_active`, {
    is_active,
  });
  return res.data.data;
}
async function deleteOne(id: number) {
  const res = await API.delete(`/api/new/me/products/${id}`);
  return res.data.data;
}
export const MyProductsService = { getAll, getOne, updateOne, deleteOne };
