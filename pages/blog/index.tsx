import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import Navbar from "@/components/Header/Navbar";
import Footer from "@/components/Footer/Footer";
import Loading from "@/components/Loading";
import { Menu, Result } from "antd";
import Post from "@/components/Post/blogPost";
import { MetaTags } from "@/components/SEO/MetaTags";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { BlogActions } from "../../store/blog/blogActions";

function Category(): JSX.Element {
  const dispatch = useAppDispatch();
  const { getAll } = useAppSelector((state) => state.languages);

  const category = useAppSelector((state) => state.blog.categories);
  useEffect(() => {
    if (!category.loaded) dispatch(BlogActions.getCategories());
  }, [category.loaded]);
  const blogs = useAppSelector((state) => state.blog.blogs);
  const [categories, setCategories] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  useEffect(() => {
    if (blogs.loaded && pageNumber === 1 && categories === undefined) return;
    dispatch(
      BlogActions.getBlogsData({ per_page: 9, categories, page: pageNumber })
    );
  }, [pageNumber, categories]);
  return (
    <div className="pt-5 mainHomeIndex">
      <Navbar
        MoreNav={
          <span
            className="d-flex align-items-center w-100 justify-content-center"
            style={{ backgroundColor: "white", maxWidth: 1400 }}
          >
            <Menu mode="horizontal" className="blog_navbar">
              {category.data?.map((item: any) => (
                <Menu.Item
                  style={{ color: "#777", fontSize: 13, fontWeight: "bold" }}
                  key={item.id}
                  onClick={() => setCategories(item.id)}
                >
                  {item.name}
                </Menu.Item>
              ))}
            </Menu>
          </span>
        }
      />
      <div>
        <MetaTags
          title={getAll("Blog")}
          metaDescription={getAll("Blog")}
          ogDescription={getAll("Blog")}
        />
        <span
          className="d-flex align-items-center w-100 justify-content-center"
          style={{ backgroundColor: "white", marginTop: "1rem" }}
        >
          <Menu className="blog_navbar" mode="horizontal">
            {category.data?.map((item: any) => (
              <Menu.Item
                style={{ color: "#777", fontWeight: "bold" }}
                key={item.id}
                onClick={() => setCategories(item.id)}
              >
                {item.name}
              </Menu.Item>
            ))}
          </Menu>
        </span>
        {blogs.isLoading && <Loading />}

        <div className="container py-4">
          <div className="row">
            {!blogs.isLoading &&
              blogs.data.map((item: any) => {
                return (
                  <div
                    className={innerWidth < 992 ? `col-md-6` : `col-md-4`}
                    key={item.id}
                  >
                    <Post
                      title={item.title.rendered}
                      thumbnail={blogs.dataImages[item.featured_media]}
                      more={getAll("Read_more")}
                      size={""}
                      slug={item.slug}
                      excerpt={
                        item.excerpt.rendered.substring(
                          0,
                          innerWidth < 1500
                            ? Math.floor(innerWidth / 5.5)
                            : Math.floor(innerWidth / 12)
                        ) + "..."
                      }
                    />
                  </div>
                );
              })}
          </div>
          {blogs.data.length == 0 && !blogs.isLoading && (
            <Result
              status="404"
              title={getAll("No_article")}
              subTitle={getAll("There_is_no")}
            />
          )}
          <Pagination
            itemClass="page-item"
            linkClass="page-link"
            activePage={pageNumber}
            itemsCountPerPage={9}
            totalItemsCount={20}
            hideFirstLastPages={true}
            pageRangeDisplayed={3}
            onChange={(number) => {
              setPageNumber(number);
            }}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

// Category.getLayout = function getLayout(page: any): ReactElement {

//   return <Layout>{page}</Layout>;
// };
export default Category;
