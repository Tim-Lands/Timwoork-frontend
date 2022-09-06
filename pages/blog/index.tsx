import React, { useEffect, useState, useContext } from "react";
import Pagination from "react-js-pagination";
import Navbar from "@/components/NewIndex/Header/Navbar";
import Footer from "@/components/NewIndex/Footer/Footer";
import { LanguageContext } from "../../contexts/languageContext/context";
import Loading from "@/components/Loading";
import useSWR from "swr";
import { Menu, Result } from "antd";
import Post from "@/components/Post/blogPost";
import { MetaTags } from "@/components/SEO/MetaTags";
import API from "../../config";
function Category(): JSX.Element {
  const [categories, setCategories] = useState("");
  const { getSectionLanguage } = useContext(LanguageContext);
  const getAll = getSectionLanguage();
  const [postsMediaTable, setPostsMediaTable] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const { data: getCategories }: any = useSWR(
    "https://timwoork.net/wp-json/wp/v2/categories"
  );
  const { data: getPosts }: any = useSWR(
    `https://timwoork.net/wp-json/wp/v2/posts?per_page=9&page=${pageNumber}&${categories}`
  );

  const fetchImage = (img_id) => {
    return API.get(
      `https://timwoork.net/wp-json/wp/v2/media/${img_id}?_fields[]=guid&_fields[]=id`
    );
  };
  const fetch = async () => {
    const promises = [];
    const tempPostsMediaTable = [];
    getPosts.forEach((post) => promises.push(fetchImage(post.featured_media)));
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
    <div className="pt-5 mainHomeIndex">
      <Navbar
        MoreNav={
          <span
            className="d-flex align-items-center w-100 justify-content-center"
            style={{ backgroundColor: "white", maxWidth: 1400 }}
          >
            <Menu mode="horizontal" className="blog_navbar">
              {getCategories?.map((item: any) => (
                <Menu.Item
                  style={{ color: "#777", fontSize: 13, fontWeight: "bold" }}
                  key={item.id}
                  onClick={() => setCategories(`categories=${item.id}`)}
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
          <Menu mode="horizontal" style={{ width: "100%", maxWidth: 1450 }}>
            {getCategories?.map((item: any) => (
              <Menu.Item
                style={{ color: "#777", fontWeight: "bold" }}
                key={item.id}
                onClick={() => setCategories(`categories=${item.id}`)}
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
                return (
                  <div
                    className={innerWidth < 992 ? `col-md-6` : `col-md-4`}
                    key={item.id}
                  >
                    <Post
                      title={item.title.rendered}
                      thumbnail={postsMediaTable[item.featured_media]}
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
          {getPosts && getPosts.length == 0 && (
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
