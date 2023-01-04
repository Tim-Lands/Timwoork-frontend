import API from "../../config";

async function getAllUsers(current_page: number) {
  const res = await API.get(
    "api/portfolios/items?per_page=20&page=" + current_page
  );
  return res.data.data;
}
async function getAll(username: string, lang?: string, token?: string) {
  const res = await API.get("api/portfolios/" + username, {
    headers: { "X-localization": lang, Authorization: `Bearer ${token}` },
  });

  return res.data;
}
async function getOne(id: number) {
  const res = await API.get("api/portfolios/items/" + id);
  return res.data.data;
}
async function addOne(body: {
  title: string;
  content: string;
  tags: Array<any>;
  cover: any;
  images: Array<any>;
  completed_date: any;
  url: any;
  subcategory:number;
}) {
  const { title, subcategory, content, tags, cover, images, url, completed_date } = body;
  const formData = new FormData();
  formData.append("title", title);
  formData.append("content", content);
  formData.append("completed_date", completed_date);
  formData.append("cover", cover);
  formData.append("url", url);
  formData.append('subcategory', subcategory.toString())
  tags.forEach((tag) => formData.append("tags[]", JSON.stringify(tag)));
  images.forEach((image) => formData.append("images[]", image));
  const res = await API.post("api/portfolios/items", formData);
  return res.data.data;
}
async function updateOne(
  id: number,
  body: {
    title: string;
    content: string;
    tags: Array<any>;
    cover: any;
    images: Array<any>;
    completed_date: string;
    url: string;
  }
) {
  const { title, content, tags, cover, images, url, completed_date } = body;
  const formData = new FormData();
  formData.append("title", title);
  formData.append("content", content);
  formData.append("completed_date", completed_date);
  formData.append("url", url);
  tags.forEach((tag) => formData.append("tags[]", JSON.stringify(tag)));
  if (cover) formData.append("cover", cover);

  if (images) images.forEach((image) => formData.append("images[]", image));
  const res = await API.post(
    "api/portfolios/items/" + id + "/update",
    formData
  );
  return res.data.data;
}
async function deleteOne(id: number) {
  const res = await API.delete("api/portfolios/items/" + id);
  return res.data.data;
}
async function like(id: number) {
  const res = await API.post(`api/portfolios/items/${id}/like`);
  return res.data;
}

export const ProjectsServices = {
  getAllUsers,
  getAll,
  addOne,
  deleteOne,
  updateOne,
  getOne,
  like,
};
