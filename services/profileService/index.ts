import API from "../../config";
async function getData() {
  const res = await API.get("api/new/me/profile");
  return res.data;
}
async function getSeller() {
  const res = await API.get("api/new/me/profile_seller");
  return res.data;
}
export const ProfileService = { getData, getSeller };
