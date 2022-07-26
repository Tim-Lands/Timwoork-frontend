import React, { ReactElement, useContext } from "react";
import PropTypes from "prop-types";
import { Alert } from "./Alert/Alert";
import Link from "next/link";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { LanguageContext } from "../contexts/languageContext/context";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import PostInner from "./Post/PostInner";
import Post from "./Post/Post";
// import required modules
function PostsAside({
  PostData,
  title,
  // colNumber,
  isError,
  linkURL,
  more,
}): ReactElement {
  const { getSectionLanguage } = useContext(LanguageContext);
  const getAll = getSectionLanguage("all");
  if (isError)
    return (
      <div className="posts-aside error">
        <div className="posts-aside-header">
          <h1 className="title">{getAll("An_error_occurred")}</h1>
        </div>
        <div className="posts-aside-body">
          <Alert type="error">{getAll("No_services_to")}</Alert>
        </div>
      </div>
    );
  return (
    <>
      {/* {!PostData && (
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
      )} */}
      {PostData && PostData.length !== 0 && (
        <div className="posts-aside">
          <div className="posts-aside-header">
            <h1 className="title me-auto">{title}</h1>
            <Link href={linkURL}>
              <a className="btn flex-center butt-md butt-light ml-auto">
                {more}
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
              }}
              className="mySwiper"
            >
              {PostData.map((e: any) => (
                <SwiperSlide key={e.id}>
                  <div className="post-resposive-with-desktop">
                    <PostInner
                      title={e.title}
                      avatar={
                        e.profile_seller && e.profile_seller.profile.avatar_path
                      }
                      author={
                        e.profile_seller &&
                        e.profile_seller.profile.first_name +
                          " " +
                          e.profile_seller.profile.last_name
                      }
                      rate={e.ratings_avg_rating}
                      username={
                        e.profile_seller &&
                        e.profile_seller.profile.user.username
                      }
                      price={e.price}
                      slug={e.slug}
                      thumbnail={e.full_path_thumbnail}
                      buyers={e.count_buying}
                    />
                  </div>
                  <div className="post-resposive-with-smart">
                    <Post
                      size="small"
                      avatar={
                        e.profile_seller && e.profile_seller.profile.avatar_path
                      }
                      title={e.title}
                      level={e.profile_seller && e.profile_seller.level.name_ar}
                      author={
                        e.profile_seller &&
                        e.profile_seller.profile.first_name +
                          " " +
                          e.profile_seller.profile.last_name
                      }
                      rate={e.ratings_avg_rating}
                      username={
                        e.profile_seller &&
                        e.profile_seller.profile.user.username
                      }
                      price={e.price}
                      slug={e.slug}
                      thumbnail={e.full_path_thumbnail}
                      buyers={e.count_buying}
                    />
                  </div>
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
  // colNumber: PropTypes.number,
  isError: PropTypes.any,
  more: PropTypes.string,
};
