import React, { ReactElement, useState } from "react";
import Layout from "@/components/Layout/HomeLayout";
import Loading from "@/components/Loading";
import useSWR from "swr";
import { Menu, Result } from "antd";
import Post from "@/components/Post/blogPost";
import { MetaTags } from "@/components/SEO/MetaTags";

function Category(): JSX.Element {
  const [categories, setCategories] = useState("");
  const { data: getCategories }: any = useSWR(
    "https://timwoork.net/wp-json/wp/v2/categories"
  );
  const { data: getPosts }: any = useSWR(
    `https://timwoork.net/wp-json/wp/v2/posts${categories}`
  );
  const { data: getMedia }: any = useSWR(
    `https://timwoork.net/wp-json/wp/v2/media`
  );

  const postsMediaTable = {};
  getMedia &&
    getMedia.forEach(
      (media) => (postsMediaTable[media.id] = media.guid.rendered)
    );
  return (
    <div>
      <MetaTags
        title={"المدونة"}
        metaDescription={"المدونة"}
        ogDescription={"المدونة"}
      />
      <span
        className="d-flex align-items-center w-100 justify-content-center"
        style={{ backgroundColor: "white", marginTop: "1rem" }}
      >
        <Menu mode="horizontal" style={{ width: "100%", maxWidth: 1450 }}>
          {getCategories &&
            getCategories.map((item: any) => (
              <Menu.Item
                key={item.id}
                onClick={() => setCategories(`?categories=${item.id}`)}
              >
                {item.name}
              </Menu.Item>
            ))}
        </Menu>
      </span>
      {!getPosts && <Loading />}

      <div className="container py-4">
        <div className="row">
          {getPosts &&
            getPosts.map((item: any) => {
              console.log(item);
              return (
                <div className="col-md-4" key={item.id}>
                  <Post
                    title={item.title.rendered}
                    thumbnail={postsMediaTable[item.featured_media]}
                    size={""}
                    slug={item.slug}
                    excerpt={item.excerpt.rendered.substring(0, 200) + "..."}
                  />
                </div>
              );
            })}
        </div>
        {getPosts && getPosts.length == 0 && (
          <Result
            status="404"
            title="لا يوجد مقالات"
            subTitle="ليس هناك مقالات لعرضها"
          />
        )}
      </div>
    </div>
  );
}

Category.getLayout = function getLayout(page: any): ReactElement {
  return <Layout>{page}</Layout>;
};
export default Category;
