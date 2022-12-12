import API from "../../config";

async function getAll() {
  const res = await API.get("api/portfolios/items");
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
}) {
  const { title, content, tags, cover, images, url, completed_date } = body
  const formData = new FormData()
  formData.append('title', title)
  formData.append('content', content)
  formData.append('completed_date', completed_date)
  formData.append('cover', cover)
  formData.append('url', url)
  tags.forEach(tag => formData.append('tags[]', JSON.stringify(tag)))
  images.forEach(image => formData.append('images[]', image))
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
  }
) {
  const res = await API.put("api/portfolios/items" + id, body);
  return res.data.data;
}
async function deleteOne(id: number) {
  const res = await API.delete("api/portfolios/items/" + id);
  return res.data.data;
}
export const ProjectsServices = { getAll, addOne, deleteOne, updateOne };
