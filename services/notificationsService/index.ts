import API from "../../config";
async function getAll(pageNumber: number) {
  const res = await API.get(`api/notifications?page=${pageNumber}`);
  return res.data.data;
}
export const NotificationsService = { getAll };
