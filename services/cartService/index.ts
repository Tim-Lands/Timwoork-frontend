import API from "../../config";
async function getAll() {
  const res = await API.get("api/new/me/cart");
  return res.data.data;
}
async function addOne(
  product_id: number,
  developments: Array<string>,
  quantity: number
) {
  const res = await API.put("new/me/cart/items", {
    product_id,
    developments,
    quantity,
  });
  return res.data;
}
async function deleteOne(id: number) {
  const res = await API.delete(`new/me/cart/items/${id}`);
  return res.data;
}
export const CartService = { getAll, addOne, deleteOne };
