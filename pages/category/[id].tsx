import React, { ReactElement, useEffect, useState } from "react";
import Layout from "@/components/Layout/HomeLayout";
import PropTypes from "prop-types";
import { Result } from "antd";
import { useAppSelector } from "@/store/hooks";
import { CategoriesService } from "@/services/categories";
import Loading from "@/components/Loading";
import Post from "@/components/Post/Post";
import { MetaTags } from "@/components/SEO/MetaTags";

function index({ query }) {
  const [subCategories, setSubCategories]: any = useState(false);
  const [popularProducts, setPopularProducts]: any = useState(false);
  const [loading, setLoading] = useState(true);
  const { getAll } = useAppSelector((state) => state.languages);

  useEffect(() => {
    CategoriesService.getProductsSub(query.id)
      .then((res) => setPopularProducts(res))
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
    CategoriesService.getOne(query.id)
      .then((res) => setSubCategories(res))
      .catch(() => {});
  }, []);

  return (
    <div className="row py-4 justify-content-center">
      <MetaTags
        title={subCategories && subCategories.name}
        metaDescription={subCategories && subCategories.name}
        ogDescription={subCategories && subCategories.name}
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
                  {subCategories.icon}
                </span>
                <span style={{ fontWeight: 200 }}> {getAll("Services")}</span>{" "}
                <strong> {subCategories.name} </strong>
              </h3>
            </div>
          )}
          <div className="app-bill-content">
            {loading && <Loading />}
            {!popularProducts && !loading && (
              <Result
                status="404"
                title={getAll("No_services")}
                subTitle={getAll("No_services_to")}
              />
            )}
            <div className="row">
              {popularProducts?.length !== 0 &&
                popularProducts?.products?.map((e: any) => {
                  return (
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
                        avatar={"/avatar.png"}
                        slug={e.slug}
                        username={e.profile_seller.profile.user.username}
                        thumbnail={e.full_path_thumbnail}
                        buyers={e.count_buying}
                      />
                    </div>
                  );
                })}
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

index.propTypes = {
  query: PropTypes.any,
};
index.getInitialProps = ({ query }) => {
  return { query };
};
