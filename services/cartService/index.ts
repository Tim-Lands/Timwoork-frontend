import API from "../../config";
async function getAll() {
  const res = await API.get("api/cart");
  return res.data.data;
}
async function addOne(
  product_id: number,
  developments: Array<string>,
  quantity: number
) {
  const res = await API.put("/cart/items", {
    product_id,
    developments,
    quantity,
  });
  return res.data;
}
async function deleteOne(id: number) {
  const res = await API.delete(`/carts/items/${id}`);
  return res.data;
}
export const CartService = { getAll, addOne, deleteOne };
