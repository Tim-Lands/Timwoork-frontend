import React, { ReactElement } from "react";
import PropTypes from "prop-types";
import { Alert } from "./Alert/Alert";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { useAppSelector } from "@/store/hooks";
import "swiper/css";
import "swiper/css/navigation";
import PostInner from "./Post/PostInner";
import Post from "./Post/Post";
function PostsAside({ PostData, title, isError, linkURL, more }): ReactElement {
  const { getAll } = useAppSelector((state) => state.languages);
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
    <div className="container">
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
      {PostData.length !== 0 && (
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
              {PostData.map(
                (element: {
                  title: string;
                  id: string;
                  price: string;
                  full_path_thumbnail: string;
                  count_buying: number;
                  ratings_avg_rating: number;
                  profile_seller: {
                    level: { name: string };
                    profile: {
                      avatar_path: string;
                      first_name: string;
                      last_name: string;
                      user: { username: string };
                    };
                  };
                }) => {
                  const {
                    title,
                    id,
                    price,
                    full_path_thumbnail,
                    count_buying,
                    ratings_avg_rating,
                    profile_seller: {
                      level: { name },
                      profile: {
                        avatar_path,
                        first_name,
                        last_name,
                        user: { username },
                      },
                    },
                  } = element;
                  return (
                    <SwiperSlide key={id}>
                      <div className="post-resposive-with-desktop">
                        <PostInner
                          title={title}
                          avatar={avatar_path}
                          author={first_name + " " + last_name}
                          rate={ratings_avg_rating}
                          username={username}
                          price={price}
                          slug={id}
                          thumbnail={full_path_thumbnail}
                          buyers={count_buying}
                        />
                      </div>
                      <div className="post-resposive-with-smart">
                        <Post
                          size="small"
                          avatar={avatar_path}
                          title={title}
                          level={name}
                          author={first_name + " " + last_name}
                          rate={ratings_avg_rating}
                          username={username}
                          price={price}
                          slug={id}
                          thumbnail={full_path_thumbnail}
                          buyers={count_buying}
                        />
                      </div>
                    </SwiperSlide>
                  );
                }
              )}
            </Swiper>
          </div>
        </div>
      )}
    </div>
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
