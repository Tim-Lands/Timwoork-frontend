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
  const res = await API.get("api/new/products?" + query, {
    params,
  });
  return res.data.data;
}
async function getOne(id: string, lang?: string) {
  const res = await API.get(`api/new/product/${id}`, {
    headers: { "X-localization": lang },
  });
  return res?.data?.data;
}
export const ProductService = { getAll, getOne };
