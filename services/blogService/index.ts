import axios from "axios";
async function getMany({
  per_page,
  categories,
  page,
}: {
  per_page?: number;
  categories?: string;
  page?: number;
}) {
  const res = await axios.get("https://timwoork.net/wp-json/wp/v2/posts", {
    params: {
      per_page,
      categories,
      page,
    },
  });

  return res.data;
}
async function getOne(slug: number) {
  const res = await axios.get("https://timwoork.net/wp-json/wp/v2/posts", {
    params: { slug },
  });
  return res.data[0];
}
async function getCategories({
  page,
  per_page,
}: {
  page?: number;
  per_page?: number;
}) {
  const res = await axios.get("https://timwoork.net/wp-json/wp/v2/categories", {
    params: { page, per_page },
  });
  return res.data;
}
async function getImages(img_id: number) {
  const res = await axios.get(
    `https://timwoork.net/wp-json/wp/v2/media/${img_id}?_fields[]=guid&_fields[]=id`
  );
  return res;
}
async function getAds() {
  const res = await axios.get(
    "https://timwoork.net/wp-json/wp/v2/media?include=28,29"
  );
  return res.data;
}
export const BlogService = {
  getMany,
  getOne,
  getCategories,
  getImages,
  getAds,
};
