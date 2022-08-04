import React, { ReactElement, useContext } from "react";
import { LanguageContext } from "../../contexts/languageContext/context";
import Layout from "@/components/Layout/HomeLayout";
import PropTypes from "prop-types";
import useSWR from "swr";
import { Result } from "antd";
import Loading from "@/components/Loading";
import Post from "@/components/Post/Post";
import { MetaTags } from "@/components/SEO/MetaTags";

function index({ query }) {
  const { getSectionLanguage } = useContext(LanguageContext);
  const getAll = getSectionLanguage();
  const { language } = useContext(LanguageContext);
  const { data: popularProducts }: any = useSWR(
    `api/get_products_subcategory/${query.id}`
  );
  const { data: subCategories }: any = useSWR(`api/get_categories/${query.id}`);
  return (
    <div className="row py-4 justify-content-center">
      <MetaTags
        title={subCategories && subCategories.data[which(language)]}
        metaDescription={subCategories && subCategories.data[which(language)]}
        ogDescription={subCategories && subCategories.data[which(language)]}
      />
      <div className="col-md-10 ">
        <div
          className="app-bill mt-4"
          style={{ maxWidth: 1300, marginInline: "auto" }}
        >
          {subCategories && (
            <div className="app-bill-header">
              <h3 className="title">
                <span className={"material-icons material-icons-outlined"}>
                  {subCategories.data.icon}
                </span>
                <span style={{ fontWeight: 200 }}> {getAll("Services")}</span>{" "}
                <strong> {subCategories.data[which(language)]} </strong>
              </h3>
            </div>
          )}
          <div className="app-bill-content">
            {!popularProducts && <Loading />}
            {popularProducts && popularProducts.data.products.length == 0 && (
              <Result
                status="404"
                title={getAll("No_services")}
                subTitle={getAll("No_services_to")}
              />
            )}
            <div className="row">
              {popularProducts &&
                popularProducts.data.length !== 0 &&
                popularProducts.data.products.map((e: any) => (
                  <div key={e.id} className={"col-md-3"}>
                    <Post
                      size="small"
                      title={e.title}
                      author={
                        e.profile_seller &&
                        e.profile_seller.profile.first_name +
                          " " +
                          e.profile_seller.profile.last_name
                      }
                      rate={e.ratings_avg_rating}
                      price={e.price}
                      slug={e.slug}
                      username={e.profile_seller.profile.user.username}
                      thumbnail={e.full_path_thumbnail}
                      buyers={e.count_buying}
                    />
                  </div>
                ))}
            </div>
          </div>
          {/*popularProducts && popularProducts.data.length !== 0 &&
                        <div className="load-more-div">
                            <button className='btn butt-lg butt-primary'>
                                <span className="text">تحميل المزيد...</span>
                            </button>
                        </div>*/}
        </div>
      </div>
    </div>
  );
}
index.getLayout = function getLayout(page: any): ReactElement {
  return <Layout>{page}</Layout>;
};
export default index;
const which = (language) => {
  switch (language) {
    default:
      return "name_en";
    case "ar":
      return "name_ar";
    case "en":
      return "name_en";
  }
};
index.propTypes = {
  query: PropTypes.any,
};
index.getInitialProps = ({ query }) => {
  return { query };
};
