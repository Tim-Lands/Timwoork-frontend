import API from "../config";
async function getTags(tag: string) {
  const res = await API.get(`api/tags/filter?tag=${tag}`);
  return res?.data?.data?.data;
}

export const Services = { getTags };
