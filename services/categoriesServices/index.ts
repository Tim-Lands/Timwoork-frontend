import API from "../../config";
async function getAll() {
  const res = await API.get("api/new/categories");
  return res?.data?.data;
}
async function getAllWithSub() {
  const res = await API.get("api/new/categories");
  return res?.data?.data;
}
async function getTop() {
  const res = await API.get("api/new/categories?sort_by=count_buying");
  return res?.data;
}
async function getMainTop() {
  const res = await API.get("api/new/categories/main?sort_by=count_buying");
  return res?.data?.data;
}
async function getOne(id: number) {
  const res = await API.get(`api/new/categories/${id}/subcategories`);
  return res?.data?.data;
}
async function getProductsSub(id: string) {
  const res = await API.get(`api/new/categories/${id}/products/`);
  return res.data.data;
}
async function getProductsCategories() {
  const res = await API.get("api/new/get_categories_for_add_product");
  return res.data.data;
}
async function getProductsSubCategories(id: number) {
  const res = await API.get("api/new/get_categories_for_add_product/" + id);
  return res.data.data;
}
export const CategoriesService = {
  getAll,
  getTop,
  getMainTop,
  getOne,
  getProductsSub,
  getProductsCategories,
  getProductsSubCategories,
  getAllWithSub,
};
