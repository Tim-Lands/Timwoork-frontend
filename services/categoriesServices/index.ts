import API from "../../config";
async function getAll() {
  const res = await API.get("api/get_categories");
  return res?.data?.data;
}
async function getAllWithSub() {
  const res = await API.get("api/categories");
  return res?.data?.data;
}
async function getOne(id: string) {
  const res = await API.get("api/get_categories/" + id);
  return res?.data?.data;
}
async function getProductsSub(id: string) {
  const res = await API.get(`api/get_products_subcategory/${id}`);
  return res.data.data;
}
export const CategoriesService = {
  getAll,
  getOne,
  getProductsSub,
  getAllWithSub,
};
