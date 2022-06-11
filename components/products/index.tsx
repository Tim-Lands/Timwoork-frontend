import React, { ReactElement } from "react";
import PropTypes from "prop-types";
import { message, Result } from "antd";
import PostInner from "../Post/PostInner";
import Post from "../Post/Post";

function index({ products, isError, isLoading, size }): ReactElement {
  if (isError) message.error("حدث خطأ أثناء جلب الخدمات");
  if (isLoading)
    return (
      <div className="posts-aside loading" style={{ minHeight: 1450 }}>
        <div className="posts-aside-header">
          <h1 className="title">
            <div className="loading-title"></div>
          </h1>
        </div>
        <div className="posts-aside-body">
          <div className="loading-container">
            <div className="row">
              <div className={"col-md-" + size}>
                <div className="loading-container-item">
                  <div className="container-item-img"></div>
                  <div className="container-item-title"></div>
                  <div className="container-item-title2"></div>
                  <div className="container-item-meta"></div>
                </div>
              </div>
              <div className={"col-md-" + size}>
                <div className="loading-container-item">
                  <div className="container-item-img"></div>
                  <div className="container-item-title"></div>
                  <div className="container-item-title2"></div>
                  <div className="container-item-meta"></div>
                </div>
              </div>
              <div className={"col-md-" + size}>
                <div className="loading-container-item">
                  <div className="container-item-img"></div>
                  <div className="container-item-title"></div>
                  <div className="container-item-title2"></div>
                  <div className="container-item-meta"></div>
                </div>
              </div>
              <div className={"col-md-" + size}>
                <div className="loading-container-item">
                  <div className="container-item-img"></div>
                  <div className="container-item-title"></div>
                  <div className="container-item-title2"></div>
                  <div className="container-item-meta"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  return (
    <>
      <div
        className="row"
        style={{ minHeight: products?.length > 12 ? 1450 : 0 }}
      >
        {products &&
          products.map((e: any) => (
            <div className={"col-md-" + size} key={e.id}>
              <div className="post-resposive-with-desktop">
                <PostInner
                  size="small"
                  title={e.title}
                  avatar={e.profile_seller && e.profile_seller.profile.avatar_path}
                  author={
                    e.profile_seller &&
                    e.profile_seller.profile.first_name +
                    " " +
                    e.profile_seller.profile.last_name
                  }
                  rate={e.ratings_avg_rating}
                  price={e.price}
                  slug={e.slug}
                  username={
                    e.profile_seller && e.profile_seller.profile.user.username
                  }
                  thumbnail={e.full_path_thumbnail}
                  buyers={e.count_buying}
                />
              </div>
              <div className="post-resposive-with-smart">
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
                  username={
                    e.profile_seller && e.profile_seller.profile.user.username
                  }
                  thumbnail={e.full_path_thumbnail}
                  buyers={e.count_buying}
                />
              </div>
            </div>
          ))}
      </div>
      {products && products.length == 0 && (
        <Result
          status="404"
          title="لا توجد خدمات"
          subTitle="لا توجد خدمات لعرضها"
        />
      )}
    </>
  );
}
export default index;
index.propTypes = {
  products: PropTypes.array,
  isLoading: PropTypes.any,
  isError: PropTypes.any,
  size: PropTypes.any,
};
