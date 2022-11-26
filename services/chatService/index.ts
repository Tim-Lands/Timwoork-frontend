import API from "../../config";
async function getAll(pageNumber: number) {
  const res = await API.get(`api/conversations?paginate=6&page=${pageNumber}`);
  return res.data.data;
}
async function unreaded() {
  const res = await API.get("/api/new/me/unread_conversations_count");
  return res.data;
}
async function getOne(id: number) {
  const res = await API.get(`api/conversations/${id}`);
  return res.data.data;
}
async function message(id: number, body: any, headers: any) {
  const res = await API.post(
    `api/conversations/${id}/sendMessage`,
    body,
    headers
  );
  return res.data.data;
}
export const ChatService = { getAll, unreaded, getOne, message };
