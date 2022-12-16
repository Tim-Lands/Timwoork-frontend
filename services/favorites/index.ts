import API from "../../config";

async function getAll() {
  const res = await API.get("api/new/me/favourites");
  return res.data;
}
async function favorite(id: number) {
  const res = await API.post(`api/portfolios/items/${id}/favourite`);
  return res.data;
}
export const FavoritesService = { getAll, favorite };
