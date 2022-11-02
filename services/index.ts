import API from "../config";
async function getTags(tag: string) {
  const res = await API.get(`api/tags/filter?tag=${tag}`);
  return res?.data?.data?.data;
}
async function getProfile(id, lang?: string) {
  const res = await API.get(`api/profiles/${id}`, {
    headers: { "X-localization": lang },
  });
  return res.data.data;
}
export const Services = { getTags, getProfile };
