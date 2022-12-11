import API from "../../config";
async function getMe() {
  const res = await API.get("api/new/me/profile");
  return res.data;
}
async function update(data: {
  first_name: string;
  last_name: string;
  username: string;
  date_of_birth: string;
  gender: number;
  country_id: number;
  phone: string;
  currency_id: number;
  code_phone: string;
}) {
  const res = await API.post("api/profiles/step_one", {
    ...data,
  });
  return res.data.data;
}
async function getSeller() {
  const res = await API.get("api/new/me/profile_seller");
  return res.data;
}
async function updateSeller(data: { bio: string; portfolio: string }) {
  const res = await API.post("api/sellers/detailsStore", data);
  return res.data.data;
}
async function getOne(id, lang?: string) {
  const res = await API.get(`api/new/profiles/${id}`, {
    headers: { "X-localization": lang },
  });
  return res.data.data;
}
export const ProfileService = {
  getMe,
  getSeller,
  update,
  getOne,
  updateSeller,
};
