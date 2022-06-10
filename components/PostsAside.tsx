import React, { ReactElement } from "react";
import PropTypes from "prop-types";
import { Alert } from "./Alert/Alert";
import Link from "next/link";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import PostInner from "./Post/PostInner";
// import required modules
function PostsAside({
  PostData,
  title,
  colNumber,
  isError,
  linkURL,
}): ReactElement {
  if (isError)
    return (
      <div className="posts-aside error">
        <div className="posts-aside-header">
          <h1 className="title">حدث خطأ</h1>
        </div>
        <div className="posts-aside-body">
          <Alert type="error">لا توجد خدمات لعرضها</Alert>
        </div>
      </div>
    );
  return (
    <>
      {!PostData && (
        <div className="posts-aside loading">
          <div className="posts-aside-header">
            <h1 className="title">
              <div className="loading-title"></div>
            </h1>
          </div>
          <div className="posts-aside-body">
            <div className="loading-container">
              <div className="row">
                <div className={"col-sm-6 col-lg-" + (colNumber || 3)}>
                  <div className="loading-container-item">
                    <div className="container-item-img"></div>
                    <div className="container-item-title"></div>
                    <div className="container-item-title2"></div>
                    <div className="container-item-meta"></div>
                  </div>
                </div>
                <div className={"col-sm-6 col-lg-" + (colNumber || 3)}>
                  <div className="loading-container-item">
                    <div className="container-item-img"></div>
                    <div className="container-item-title"></div>
                    <div className="container-item-title2"></div>
                    <div className="container-item-meta"></div>
                  </div>
                </div>
                <div className={"col-sm-6 col-lg-" + (colNumber || 3)}>
                  <div className="loading-container-item">
                    <div className="container-item-img"></div>
                    <div className="container-item-title"></div>
                    <div className="container-item-title2"></div>
                    <div className="container-item-meta"></div>
                  </div>
                </div>
                <div className={"col-sm-6 col-lg-" + (colNumber || 3)}>
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
      )}
      {PostData && PostData.length !== 0 && (
        <div className="posts-aside">
          <div className="posts-aside-header">
            <h1 className="title me-auto">{title}</h1>
            <Link href={linkURL}>
              <a className="btn flex-center butt-md butt-light ml-auto">
                المزيد...
              </a>
            </Link>
          </div>
          <div className="posts-aside-body">
            <Swiper
              slidesPerView={1}
              spaceBetween={0}
              pagination={{
                type: "progressbar",
              }}
              navigation={true}
              modules={[Navigation]}
              breakpoints={{
                1000: {
                  slidesPerView: 4,
                  spaceBetween: 15,
                },
                770: {
                  slidesPerView: 3,
                  spaceBetween: 15,
                },
                600: {
                  slidesPerView: 2,
                  spaceBetween: 15,
                },
                100: {
                  slidesPerView: 1,
                  spaceBetween: 15,
                },
                // "@0.00": {
                //   slidesPerView: 2,
                //   spaceBetween: 30,
                // },

                // "@1.50": {
                //   slidesPerView: 4,
                //   spaceBetween: 15,
                // },
                // // "@1.00": {
                // //   slidesPerView: 3,
                // //   spaceBetween: 3,
                // // },
                // // "@1.50": {
                // //   slidesPerView: 4,
                // //   spaceBetween: 15,
                // // },
              }}
              className="mySwiper"
            >
              {PostData.map((e: any) => (
                <SwiperSlide key={e.id}>
                  <PostInner
                    title={e.title}
                    avatar={e.profile_seller && e.profile_seller.profile.avatar_path}
                    author={
                      e.profile_seller &&
                      e.profile_seller.profile.first_name +
                        " " +
                        e.profile_seller.profile.last_name
                    }
                    rate={e.ratings_avg_rating}
                    username={
                      e.profile_seller && e.profile_seller.profile.user.username
                    }
                    price={e.price}
                    slug={e.slug}
                    thumbnail={e.full_path_thumbnail}
                    buyers={e.count_buying}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </>
  );
}
export default PostsAside;
PostsAside.propTypes = {
  title: PropTypes.string,
  linkURL: PropTypes.string,
  PostData: PropTypes.array,
  colNumber: PropTypes.number,
  isError: PropTypes.any,
};
