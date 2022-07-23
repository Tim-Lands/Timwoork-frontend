import Link from "next/link";
import Layout from "@/components/Layout/HomeLayout";
import { ReactElement, useEffect } from "react";
import API from "../../../config";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
//import { useTranslation } from "react-i18next";
import Loading from "@/components/Loading";
import { Dropdown, Menu } from "antd";
import { MetaTags } from "@/components/SEO/MetaTags";
import PropTypes from "prop-types";
import router from "next/router";
import Image from "next/image";
import Cookies from "js-cookie";
import cookies from "next-cookies";
import { LanguageContext } from "../../../contexts/languageContext/context";
import { useContext } from "react";

const properties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  prevArrow: (
    <div
      className="arrow-navigations"
      style={{ width: "30px", marginRight: "-30px" }}
    >
      <span className="material-icons-outlined">chevron_left</span>
    </div>
  ),
  nextArrow: (
    <div
      className="arrow-navigations"
      style={{ width: "30px", marginLeft: "-30px" }}
    >
      <span className="material-icons-outlined">chevron_right</span>
    </div>
  ),
};
function Id({ ProductData, errorFetch }: any) {
  const token = Cookies.get("token_dash");
  useEffect(() => {
    if (errorFetch) {
      router.push("/404");
    }
  }, [token]);

  const showStars = () => {
    const rate = Number(ProductData?.data.ratings_count) || 0;
    const xAr: any = [
      {
        id: 1,
        name: <span className="material-icons-outlined">star</span>,
      },
      {
        id: 2,
        name: <span className="material-icons-outlined">star</span>,
      },
      {
        id: 3,
        name: <span className="material-icons-outlined">star</span>,
      },
      {
        id: 4,
        name: <span className="material-icons-outlined">star</span>,
      },
      {
        id: 5,
        name: <span className="material-icons-outlined">star</span>,
      },
    ];
    const yAr: any = [
      {
        id: 6,
        name: (
          <span className="material-icons-outlined outline-star">
            star_border
          </span>
        ),
      },
      {
        id: 7,
        name: (
          <span className="material-icons-outlined outline-star">
            star_border
          </span>
        ),
      },
      {
        id: 8,
        name: (
          <span className="material-icons-outlined outline-star">
            star_border
          </span>
        ),
      },
      {
        id: 9,
        name: (
          <span className="material-icons-outlined outline-star">
            star_border
          </span>
        ),
      },
      {
        id: 10,
        name: (
          <span className="material-icons-outlined outline-star">
            star_border
          </span>
        ),
      },
    ];

    const x: number = 5;
    const y: number = x - Number(rate);
    const yut: any = xAr.slice(y);
    if (rate == null) {
      return 0;
    }
    if (y == 0) {
      return yut;
    } else {
      const yut2: any = yAr.slice(-y, x);
      return yut.concat(yut2);
    }
  };
  const { getSectionLanguage } = useContext(LanguageContext);
  const getAll = getSectionLanguage("all");
  const getLogin = getSectionLanguage("login");
  const menu = (
    <Menu>
      {ProductData && (
        <Menu.Item key="1" icon={<i className="fa fa-facebook"></i>}>
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://www.facebook.com/sharer/sharer.php?kid_directed_site=0&sdk=joey&u=https://timwoork.com/p/${ProductData.data.slug}&display=popup&ref=plugin&src=share_button`}
          >
            {getAll("Share_on_Facebook")}
          </a>
        </Menu.Item>
      )}
      {ProductData && (
        <Menu.Item key="2" icon={<i className="fa fa-facebook"></i>}>
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://twitter.com/intent/tweet?url=https://timwoork.com/p/${ProductData.data.slug}&text=`}
          >
            {getAll("Share_on_Twitter")}
          </a>
        </Menu.Item>
      )}
    </Menu>
  );
  // Start Conversation

  function durationFunc() {
    if (ProductData.data.duration == 1) {
      return getAll("One_day");
    }
    if (ProductData.data.duration == 2) {
      return getAll("2_days");
    }
    if (ProductData.data.duration > 2 && ProductData.data.duration < 11) {
      return ProductData.data.duration + getAll("Days");
    }
    if (ProductData.data.duration >= 11) {
      return ProductData.data.duration + getAll("Day");
    }
  }
  function DevdurationFunc(duration) {
    if (duration == 1) {
      return getAll("One_day");
    }
    if (duration == 2) {
      return getAll("2_days");
    }
    if (duration > 2 && duration < 11) {
      return duration + getAll("Days");
    }
    if (duration >= 11) {
      return duration + getAll("Day");
    }
  }
  const APIURL2 =
    "https://timwoork-space.ams3.digitaloceanspaces.com/products/galaries-images/";
  return (
    <>
      {!ProductData && <Loading />}
      {!errorFetch && (
        <MetaTags
          title={ProductData.data.title + ` - ${getAll("Timwoork")}`}
          metaDescription={ProductData.data.content}
          ogDescription={ProductData.data.content}
          ogImage={ProductData.data.full_path_thumbnail}
          ogUrl={`https://timwoork.com/p/${ProductData.data.slug}`}
        />
      )}

      {ProductData && (
        <div className="timwoork-single">
          <div className="row">
            <div className="col-lg-8">
              <div className="timwoork-single-post">
                <div className="timwoork-single-header">
                  <h1 className="title">{ProductData.data.title}</h1>
                  <div className="timwoork-single-header-meta d-flex">
                    <ul className="single-header-meta nav me-auto">
                      <li className="user-item">
                        <Link
                          href={`/u/${ProductData.data.profile_seller.profile.user.username}`}
                        >
                          <a className="user-link">
                            <Image
                              className="circular-center tiny-size"
                              src={
                                ProductData.data.profile_seller.profile
                                  .avatar_path
                              }
                              quality={80}
                              width={32}
                              height={32}
                              alt={
                                ProductData.data.profile_seller.profile
                                  .full_name
                              }
                              placeholder="blur"
                              blurDataURL={
                                ProductData.data.profile_seller.profile
                                  .avatar_path
                              }
                            />
                            <span className="pe-2">
                              {
                                ProductData.data.profile_seller.profile
                                  .full_name
                              }
                            </span>
                          </a>
                        </Link>
                      </li>
                      <li className="category-item">
                        <span className="material-icons material-icons-outlined">
                          label
                        </span>
                        {ProductData &&
                          ProductData.data.subcategory.category.name_ar}
                        <span style={{ marginInline: 5 }}>||</span>
                        <small>
                          <Link
                            href={`/category/${
                              ProductData && ProductData.data.subcategory.id
                            }`}
                          >
                            <a
                              style={{ marginInline: 5 }}
                              className="category-link"
                            >
                              {ProductData &&
                                ProductData.data.subcategory.name_ar}
                            </a>
                          </Link>
                        </small>
                      </li>
                    </ul>
                    <ul className="single-header-meta nav ml-auto">
                      <li className="rate-stars">
                        <span className="stars-icons">
                          {showStars().map((e: any) => (
                            <span key={e.id}>{e.name}</span>
                          ))}
                        </span>
                        <span className="stars-count">
                          ({ProductData.data.ratings_count})
                        </span>
                      </li>
                      <li className="level-item">
                        <span className="text-level">{getAll("Level")}:</span>
                        <span className="value-level">
                          {ProductData &&
                            ProductData.data.profile_seller.level !== null &&
                            ProductData.data.profile_seller.level.name_ar}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="timwoork-single-content">
                  <div className="timwoork-single-content-body">
                    <Slide {...properties}>
                      {ProductData &&
                        ProductData.data.galaries.map((each: any, index) => (
                          <>
                            {each.url_video == null ? (
                              <div key={index} className="each-slide">
                                <div
                                  className="images-slider"
                                  style={{
                                    backgroundImage: `url(${APIURL2}${each.path})`,
                                  }}
                                ></div>
                              </div>
                            ) : (
                              ""
                            )}
                          </>
                        ))}
                    </Slide>
                    <div
                      className="timwoork-single-product-detailts"
                      dangerouslySetInnerHTML={{
                        __html: ProductData.data.content,
                      }}
                    />
                    {ProductData.data.product_tag && (
                      <div className="timwoork-single-tags">
                        <ul className="single-tags-list">
                          <li className="title">{getLogin("Tags")}:</li>
                          {ProductData.data.product_tag.map((e: any) => (
                            <li key={e.id}>
                              <span>{e.name}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {ProductData.data.profile_seller && (
                      <div className="timwoork-single-seller-info">
                        <div className="seller-info-header">
                          <h4 className="title">{getLogin("About_seller")}</h4>
                        </div>
                        <div className="seller-info-container">
                          <div className="d-flex">
                            <div className="seller-info-avatar">
                              <Image
                                className="circular-img huge-size"
                                src={
                                  ProductData &&
                                  ProductData.data.profile_seller.profile
                                    .avatar_path
                                }
                                quality={80}
                                width={100}
                                alt={
                                  ProductData.data.profile_seller.profile
                                    .full_name
                                }
                                placeholder="blur"
                                blurDataURL={
                                  ProductData.data.profile_seller.profile
                                    .avatar_path
                                }
                                height={100}
                              />
                            </div>
                            <div className="seller-info-content">
                              <h4 className="user-title">
                                {ProductData.data.profile_seller.profile
                                  .first_name +
                                  " " +
                                  ProductData.data.profile_seller.profile
                                    .last_name}
                              </h4>
                              <ul className="user-meta nav">
                                <li>
                                  <span className="material-icons material-icons-outlined">
                                    badge
                                  </span>{" "}
                                  {ProductData &&
                                    ProductData.data.profile_seller.level !==
                                      null &&
                                    ProductData.data.profile_seller.level
                                      .name_ar}
                                </li>
                                {ProductData.data.profile_seller.profile
                                  .country !== null && (
                                  <li>
                                    <span className="material-icons material-icons-outlined">
                                      place
                                    </span>{" "}
                                    الجزائر
                                  </li>
                                )}
                              </ul>
                              <div className="seller-info-butts d-flex">
                                <Link
                                  href={
                                    "/u/" +
                                    ProductData.data.profile_seller.profile.user
                                      .username
                                  }
                                >
                                  <a className="btn butt-primary butt-sm flex-center">
                                    <i className="material-icons material-icons-outlined">
                                      account_circle
                                    </i>{" "}
                                    {getAll("Profile")}
                                  </a>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="single-sidebar">
                <div className="single-panel-aside">
                  <div className="panel-aside-header">
                    <ul className="nav top-aside-nav">
                      <li className="delevr-time me-auto">
                        <span className="material-icons material-icons-outlined">
                          timer
                        </span>{" "}
                        {getLogin("Delivery_duration")}
                        {durationFunc()}
                      </li>
                      <li className="cat-post ml-auto">
                        <Dropdown overlay={menu}>
                          <span>
                            <span className="material-icons material-icons-outlined">
                              share
                            </span>{" "}
                            {getLogin("Share_service")}
                          </span>
                        </Dropdown>
                      </li>
                    </ul>
                  </div>
                  {ProductData.data.developments && (
                    <div className="panel-aside-body">
                      <div className="add-devloppers-header">
                        <h4 className="title">
                          {getLogin("Available_developments")}
                        </h4>
                      </div>
                      {ProductData.data.developments.length == 0 && (
                        <div className="nothing-note">
                          <p className="text">
                            {getLogin("This_service_contains")}
                          </p>
                        </div>
                      )}
                      <ul className="add-devloppers-nav">
                        {ProductData.data.developments.map((e: any) => {
                          return (
                            <li key={e.id} className="devloppers-item">
                              <div className="form-check">
                                <label
                                  className="form-check-label"
                                  htmlFor={"flexCheckDefault-id" + e.id}
                                >
                                  {e.title}
                                  <p className="price-duration">
                                    {getAll("The_duration_will_cost")}
                                    {DevdurationFunc(e.duration)} {e.price}$
                                  </p>
                                </label>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                  <div className="panel-aside-footer">
                    <div className="aside-footer-total-price">
                      <h4 className="price-total me-auto">
                        <strong>{getLogin("Service_price")}</strong>{" "}
                        {ProductData && ProductData.data.price}$
                      </h4>
                      <div className="bayers-count">
                        <p className="num">
                          <span className="count">
                            {ProductData && ProductData.data.count_buying}{" "}
                          </span>
                          <span className="text">
                            {" "}
                            {getAll("Have_bought_this")}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/*<div className="container">
        <PostsAside title="خدمات ذات صلة" PostData={testServices} />
    </div>*/}
    </>
  );
}
Id.getLayout = function getLayout(page: any): ReactElement {
  return <Layout>{page}</Layout>;
};
export default Id;
export async function getServerSideProps(ctx) {
  const { query } = ctx;
  try {
    const token = cookies(ctx).token_dash || "";
    const uriString = encodeURI(`dashboard/products/${query.id}`);
    // Fetch data from external API
    const res = await API.get(uriString, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Pass data to the page via props
    return { props: { ProductData: res.data, query, errorFetch: false } };
  } catch (error) {
    return { props: { ProductData: null, query, errorFetch: true } };
  }
}
Id.propTypes = {
  query: PropTypes.any,
  ProductData: PropTypes.any,
  errorFetch: PropTypes.bool,
};
