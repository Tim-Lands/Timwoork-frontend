import React, { ReactElement, useEffect, useState } from "react";
import Layout from "@/components/Layout/HomeLayout";
import { MetaTags } from "@/components/SEO/MetaTags";
import useSWR from "swr";
import API from "../../config";
import PropTypes from "prop-types";
import Loading from "@/components/Loading";
import Post from "@/components/Post/blogPost";
import { Divider } from "antd";
import { Image } from "antd";

const User = ({ query }) => {
  const [postsMediaTable, setPostsMediaTable] = useState([]);
  console.log(query.slug);
  const { data: getPosts }: any = useSWR(
    `https://timwoork.net/wp-json/wp/v2/posts/?slug=${query.slug}`
  );
  const { data: getSamePosts }: any = useSWR(
    `https://timwoork.net/wp-json/wp/v2/posts?categories=${
      getPosts && getPosts[0].categories[0]
    }&per_page=3`
  );
  const { data: getAds }: any = useSWR(
    `https://timwoork.net/wp-json/wp/v2/media?include=28,29`
  );
  const fetchImage = (img_id) => {
    return API.get(
      `https://timwoork.net/wp-json/wp/v2/media/${img_id}?_fields[]=guid&_fields[]=id`
    );
  };
  const fetch = async () => {
    const promises = [];
    const tempPostsMediaTable = [];
    getPosts?.forEach((post) => promises.push(fetchImage(post.featured_media)));
    getSamePosts?.forEach((post) =>
      promises.push(fetchImage(post.featured_media))
    );
    const media = await Promise.all(promises);
    media.forEach(
      (img) => (tempPostsMediaTable[img.data.id] = img.data.guid.rendered)
    );
    setPostsMediaTable(tempPostsMediaTable);
  };
  useEffect(() => {
    if (getPosts) fetch();
  }, [getPosts]);
  return (
    <>
      {!getPosts && <Loading />}
      <MetaTags
        title={getPosts && getPosts[0].title.rendered}
        metaDescription={getPosts && getPosts[0].excerpt.rendered}
        ogDescription={getPosts && getPosts[0].excerpt.rendered}
        ogImage={getPosts && getPosts[0].jetpack_featured_media_url}
        ogUrl={`https://timwoork.com/blog/${getPosts && getPosts[0].slug}`}
      />
      {getPosts && (
        <>
          <article className="py-5">
            <div className="container">
              <header>
                <div className="row" style={{ alignItems: "center" }}>
                  <div className="col-lg-10 col-md-8">
                    <h1 className="mb-0 blogHeaderTitle">
                      {getPosts[0].title.rendered}
                    </h1>
                  </div>
                  <div className="col-md-4 col-lg-2 col-sm-12 text-md-start text-sm-end">
                    <span>نُشرت في</span>
                    <span
                      style={{
                        display: "inline-block",
                        marginInlineStart: ".5rem",
                      }}
                    >
                      {rtlDateFormatted(getPosts[0].modified)}
                    </span>
                  </div>
                </div>
              </header>
              <Divider />
              <div className="row">
                <div className="col-md-8">
                  <Image src={postsMediaTable[getPosts[0].featured_media]} />
                  <div
                    className="blog-single-content mt-3"
                    style={{ lineHeight: 2, fontSize: 20 }}
                    dangerouslySetInnerHTML={{
                      __html: getPosts[0].content.rendered,
                    }}
                  ></div>
                  <Divider />
                  <h3>مقالات ذات صلة:</h3>
                  {!getSamePosts && <Loading />}
                  <div className="row">
                    {getSamePosts &&
                      getSamePosts.map((item: any) => (
                        <div className="col-md-4" key={item.id}>
                          <Post
                            title={
                              item.title.rendered.length > 22
                                ? item.title.rendered.substring(0, 22) + "..."
                                : item.title.rendered
                            }
                            thumbnail={postsMediaTable[item.featured_media]}
                            size={"small"}
                            slug={item.slug}
                            excerpt={
                              item.excerpt.rendered.substring(0, 100) + "..."
                            }
                          />
                        </div>
                      ))}
                  </div>
                  {getSamePosts && getSamePosts.length == 0 && (
                    <p>لا يوجد مقالات ذات صلة الآن.</p>
                  )}
                </div>

                <div className="col-md-4">
                  {!getAds && <Loading />}
                  {getAds &&
                    getAds.map((item: any) => (
                      <div key={item.id}>
                        <Image src={item.guid.rendered} />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </article>
        </>
      )}
    </>
  );
};

/*function ltrDateFormatted (theDate) {
    let date = new Date(theDate)
    return `${date.getDate() < 9 ? '0' + date.getDate() : date.getDate()}/${date.getMonth() + 1 < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1}/${date.getFullYear()}`
}*/

function rtlDateFormatted(theDate) {
  return theDate.split("T")[0];
}

export default User;
User.getLayout = function getLayout(page: any): ReactElement {
  return <Layout>{page}</Layout>;
};
export async function getServerSideProps({ query }) {
  const uriString = encodeURI(
    `https://timwoork.net/wp-json/wp/v2/posts/?slug=${query.slug}`
  );
  // Fetch data from external API
  const res = await API.get(uriString);

  // Pass data to the page via props
  return { props: { stars: res.data, query } };
}
User.propTypes = {
  query: PropTypes.any,
  stars: PropTypes.any,
};
