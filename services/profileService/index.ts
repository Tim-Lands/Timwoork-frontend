import API from "../../config";
async function getData() {
  const res = await API.get("api/new/me/profile");
  return res.data;
}
export const ProfileService = { getData };
