import API from "../../config";
async function getAll(pageNumber: number) {
  const res = await API.get(`api/notifications?page=${pageNumber}`);
  return res.data.data;
}
async function getCount() {
  const res = await API.get("api/new/me/unread_notifications_count");
  return res.data;
}
async function readAll() {
  const res = await API.post("api/notifications/markAllAsRead");
  return res.data.data;
}
export const NotificationsService = { getAll, getCount, readAll };
