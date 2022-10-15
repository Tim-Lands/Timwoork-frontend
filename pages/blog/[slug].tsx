import React, { ReactElement, useEffect } from "react";
import Layout from "@/components/Layout/HomeLayout";
import { MetaTags } from "@/components/SEO/MetaTags";
import axios from "axios";
import PropTypes from "prop-types";
import Loading from "@/components/Loading";
import Post from "@/components/Post/blogPost";
import { Divider } from "antd";
import { Image } from "antd";
import { LanguageContext } from "../../contexts/languageContext/context";
import { useContext } from "react";
import { BlogActions } from "../../store/blog/blogActions";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
const Blog = ({ query }) => {
  const dispatch = useAppDispatch();
  const blog = useAppSelector((state) => state.blog.blog);
  const ads = useAppSelector((state) => state.blog.ads);

  useEffect(() => {
    if (blog.loaded && blog.id === query.slug) return;
    dispatch(BlogActions.loadBlog());
    dispatch(BlogActions.getBlogData({ slug: query.slug }));
  }, [blog.loaded, query.slug]);
  const { data: blogData, loaded } = blog;
  const { relatedBlogs } = blog;
  const { getSectionLanguage } = useContext(LanguageContext);
  const getAll = getSectionLanguage("all");
  useEffect(() => {
    if (blogData.categories.length > 0)
      dispatch(
        BlogActions.getSimilarBlogs({
          per_page: 3,
          categories: blogData.categories[0],
        })
      );
  }, [blogData]);
  useEffect(() => {
    if (ads.loaded) return;
    dispatch(BlogActions.getAds());
  }, [ads.loaded]);
  const {
    data: relatedBlogsData,
    isLoading: relatedBlogsLoading,
    dataImages: relatedBlogsImages,
  } = relatedBlogs;
  return (
    <>
      {blog.isLoading && <Loading />}
      <MetaTags
        title={loaded && blogData.title.rendered}
        metaDescription={loaded && blogData.excerpt.rendered}
        ogDescription={loaded && blogData.excerpt.rendered}
        ogImage={loaded && blogData.jetpack_featured_media_url}
        ogUrl={`https://timwoork.com/blog/${loaded && blogData.slug}`}
      />
      {loaded && !blog.isLoading && (
        <>
          <article className="py-5">
            <div className="container">
              <header>
                <div className="row" style={{ alignItems: "center" }}>
                  <div className="col-lg-10 col-md-8">
                    <h1 className="mb-0 blogHeaderTitle">
                      {blogData.title.rendered}
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
                      {rtlDateFormatted(blogData.modified)}
                    </span>
                  </div>
                </div>
              </header>
              <Divider />
              <div className="row">
                <div className="col-md-8">
                  <Image src={relatedBlogsImages[blogData.featured_media]} />
                  <div
                    className="blog-single-content mt-3"
                    style={{ lineHeight: 2, fontSize: 20 }}
                    dangerouslySetInnerHTML={{
                      __html: blogData.content.rendered,
                    }}
                  ></div>
                  <Divider />
                  <h3>{getAll("Relating_articles")}</h3>
                  {relatedBlogsLoading && <Loading />}
                  <div className="row">
                    {relatedBlogsData.map((item: any) => (
                      <div className="col-md-4" key={item.id}>
                        <Post
                          title={
                            item.title.rendered.length > 22
                              ? item.title.rendered.substring(0, 22) + "..."
                              : item.title.rendered
                          }
                          thumbnail={relatedBlogsImages[item.featured_media]}
                          size={"small"}
                          slug={item.slug}
                          excerpt={
                            item.excerpt.rendered.substring(0, 100) + "..."
                          }
                        />
                      </div>
                    ))}
                  </div>
                  {!relatedBlogsLoading && relatedBlogsData.length == 0 && (
                    <p>{getAll("There_is_no")}</p>
                  )}
                </div>

                <div className="col-md-4">
                  {ads.isLoading && <Loading />}
                  {ads.data.map((item: any) => (
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

export default Blog;
Blog.getLayout = function getLayout(page: any): ReactElement {
  return <Layout>{page}</Layout>;
};
export async function getServerSideProps({ query }) {
  const uriString = encodeURI(
    `https://timwoork.net/wp-json/wp/v2/posts/?slug=${query.slug}`
  );
  // Fetch data from external API
  const res = await axios.get(uriString);

  // Pass data to the page via props
  return { props: { stars: res.data, query } };
}
Blog.propTypes = {
  query: PropTypes.any,
  stars: PropTypes.any,
};
