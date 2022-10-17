import API from "../../config";
async function getAll({
  params,
  type,
  min_price,
  max_price,
}: {
  params?: any;
  type?: string;
  min_price?: number;
  max_price?: number;
}) {
  const query =
    min_price && max_price
      ? `${type || ""}&between=price,${min_price},${max_price}`
      : type || "";
  const res = await API.get("api/filter?" + query, {
    params,
  });
  return res.data.data;
}
export const ProductService = { getAll };
