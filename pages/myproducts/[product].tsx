import Link from "next/link";
import Layout from "@/components/Layout/HomeLayout";
import { ReactElement, useEffect, useState, useContext } from "react";
import { LanguageContext } from "contexts/languageContext/context";
import Comments from "../../components/Comments";
import API from "../../config";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
//import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import router from "next/router";
import useSWR from "swr";
import { Alert } from "@/components/Alert/Alert";
import { MetaTags } from "@/components/SEO/MetaTags";
import { notification, Spin } from "antd";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

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
let token = Cookies.get("token");
if (!token && typeof window !== "undefined")
  token = localStorage.getItem("token");
function Single({ query, stars }) {
  const { getSectionLanguage } = useContext(LanguageContext);
  const getAll = getSectionLanguage("all");
  const getLogin = getSectionLanguage("login");
  const getWallet = getSectionLanguage("my_wallet");
  const getNew = getSectionLanguage("add_new");
  const { language } = useContext(LanguageContext);
  const { data: ProductData }: any = useSWR(`api/my_products/${query.product}`);

  const { data: userInfo }: any = useSWR("api/me");
  const veriedEmail = userInfo && userInfo.user_details.email_verified_at;
  const disactiveProductHandle = async (id: any) => {
    const MySwal = withReactContent(Swal);

    const swalWithBootstrapButtons = MySwal.mixin({
      customClass: {
        confirmButton: "btn butt-red butt-sm me-1",
        cancelButton: "btn butt-green butt-sm",
      },
      buttonsStyling: false,
    });
    try {
      const res = await API.post(
        `api/my_products/${id}/disactive_product`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        swalWithBootstrapButtons.fire(
          getLogin("Disabled1"),
          getLogin("The_service_has_2"),
          "success"
        );
        router.reload();
      }
    } catch (error) {
      notification["error"]({
        message: getLogin("Error_message"),
        description: getLogin("Unfortunately_this_service"),
      });
    }
  };
  const deleteHandle = (id: any) => {
    const MySwal = withReactContent(Swal);

    const swalWithBootstrapButtons = MySwal.mixin({
      customClass: {
        confirmButton: "btn butt-red butt-sm me-1",
        cancelButton: "btn butt-green butt-sm",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: getLogin("Are_you_sure1"),
        text: getLogin("Are_you_sure"),
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: getLogin("Yes"),
        cancelButtonText: "لا",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            const res = await API.post(
              `api/product/${id}/deleteProduct`,
              null,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            if (res.status === 200) {
              swalWithBootstrapButtons.fire(
                getLogin("Deleted"),
                getLogin("The_service_has"),
                "success"
              );
            }
          } catch (error) {
            () => {};
          }
        }
      });
  };
  const [isProductActive, setIsProductActive] = useState(false);
  const activeProductHandle = async (id: any) => {
    const MySwal = withReactContent(Swal);

    const swalWithBootstrapButtons = MySwal.mixin({
      customClass: {
        confirmButton: "btn butt-red butt-sm me-1",
        cancelButton: "btn butt-green butt-sm",
      },
      buttonsStyling: false,
    });
    try {
      setIsProductActive(true);
      const res = await API.post(`api/my_products/${id}/active_product`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        setIsProductActive(false);
        swalWithBootstrapButtons.fire(
          getLogin("Abled1"),
          getLogin("This_service_has"),
          "success"
        );
        router.reload();
      }
    } catch (error) {
      setIsProductActive(false);
      notification["error"]({
        message: getLogin("Error_message"),
        description: getLogin("Unfortunately_this_service_2"),
      });
    }
  };
  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
    //getProductData()
  }, []);
  const showStars = () => {
    const rate =
      Number(ProductData.data.ratings_avg_rating).toPrecision(1) || 0;
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

  const routeToCurrentStep = () => {
    let page_name = "";
    switch (ProductData.data.current_step) {
      case 1:
        page_name = "overview";
        break;
      case 2:
        page_name = "prices";
        break;
      case 3:
        page_name = "description";
        break;
      case 4:
        page_name = "medias";
        break;
    }
    router.push(`/edit-product/${page_name}?id=${ProductData.data.id}`);
  };

  const APIURL2 =
    "https://timwoork-space.ams3.digitaloceanspaces.com/products/galaries-images/";

  return (
    <>
      <MetaTags
        title={stars.data.title + ` - ${getAll("Timwoork")}`}
        metaDescription={stars.data.content}
        ogDescription={stars.data.content}
        ogImage={stars.data.full_path_thumbnail}
        ogUrl={`https://timwoork.com/p/${stars.data.slug}`}
      />
      {ProductData && veriedEmail && (
        <div className="timwoork-single">
          {ProductData.data.is_active == null && (
            <div style={{ marginTop: 27 }}>
              <Alert type="warning">
                هذه الخدمة غير كامة تنقصها بعض التعديلات يمكنك{" "}
                <Link href={`/edit-product/overview?id=${ProductData.data.id}`}>
                  <a>{getLogin("Edit")}</a>
                </Link>
              </Alert>
            </div>
          )}
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
                        <Link
                          href={`/category/${
                            ProductData && ProductData.data.subcategory.id
                          }`}
                        >
                          <a className="category-link">
                            <span className="material-icons material-icons-outlined">
                              label
                            </span>
                            {ProductData &&
                              ProductData.data.subcategory[which(language)]}
                          </a>
                        </Link>{" "}
                        <span style={{ marginInline: 5 }}>|</span>
                        <small style={{ marginInline: 5 }}>
                          {ProductData &&
                            ProductData.data.subcategory.category[
                              which(language)
                            ]}
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
                        <span className="text-level">{getAll("Level")}</span>
                        <span className="value-level">
                          {ProductData &&
                            ProductData.data.profile_seller.level !== null &&
                            ProductData.data.profile_seller.level[
                              which(language)
                            ]}
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
                          <li className="title">{getLogin("Tags")}</li>
                          {ProductData.data.product_tag.map((e: any) => (
                            <li key={e.id}>
                              <span>{e.name}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <div className="timwoork-single-comments">
                      <div className="timwoork-single-comments-inner">
                        <div className="single-comments-header">
                          <div className="flex-center">
                            <h4 className="title">
                              <span className="material-icons material-icons-outlined">
                                question_answer
                              </span>
                              {getWallet("Customer_reviews")}
                            </h4>
                          </div>
                        </div>
                        <div className="single-comments-body">
                          <Comments
                            canReply={true}
                            comments={ProductData.data.ratings}
                          />
                          {ProductData.data.ratings.length == 0 && (
                            <Alert type="primary">
                              <p className="text">{getAll("There_is_no_2")}</p>
                            </Alert>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="single-sidebar">
                {ProductData.data.is_active == 1 && (
                  <div className="d-flex">
                    <Link
                      href={`/edit-product/overview?id=${ProductData.data.id}`}
                    >
                      <a className="btn butt-md butt-green flex-center-just mb-1 mx-1">
                        <span className="material-icons material-icons-outlined">
                          create
                        </span>{" "}
                        {getLogin("Service_editing")}
                      </a>
                    </Link>
                    <button
                      onClick={() => deleteHandle(ProductData.data.id)}
                      className="btn butt-md butt-red flex-center-just mb-1 mx-1"
                    >
                      <span className="material-icons material-icons-outlined">
                        delete
                      </span>{" "}
                      {getNew("Delete_the_service")}
                    </button>
                  </div>
                )}
                {ProductData.data.is_active == null && (
                  <div className="d-flex">
                    <button
                      className="btn butt-md butt-green flex-center-just mb-1 mx-1"
                      onClick={routeToCurrentStep}
                    >
                      <span className="material-icons material-icons-outlined">
                        create
                      </span>{" "}
                      طلب تعديل الخدمة
                    </button>
                    <button className="btn butt-md butt-red flex-center-just mb-1 mx-1">
                      <span className="material-icons material-icons-outlined">
                        delete
                      </span>{" "}
                      طلب حذف الخدمة
                    </button>
                  </div>
                )}
                <div className="single-panel-aside">
                  <div className="panel-aside-header">
                    <ul className="nav top-aside-nav">
                      <li className="delevr-time me-auto">
                        <span className="material-icons material-icons-outlined">
                          timer
                        </span>{" "}
                        {getNew("Delivery_terme")}
                        {durationFunc()}
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
                  {ProductData.data.status !== null && (
                    <Spin spinning={isProductActive}>
                      {ProductData.data.is_active == 0 &&
                      ProductData.data.is_completed == 1 ? (
                        <button
                          disabled={isProductActive}
                          onClick={() =>
                            activeProductHandle(ProductData.data.id)
                          }
                          className="btn butt-sm butt-green"
                        >
                          تفعيل
                        </button>
                      ) : (
                        <button
                          disabled={isProductActive}
                          style={{ width: "100%", marginTop: 5 }}
                          onClick={() =>
                            disactiveProductHandle(ProductData.data.id)
                          }
                          className="btn butt-sm butt-red"
                        >
                          {getLogin("Disable_this_service")}
                        </button>
                      )}
                    </Spin>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
Single.getLayout = function getLayout(page: any): ReactElement {
  return <Layout>{page}</Layout>;
};
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
export default Single;
export async function getServerSideProps({ query }) {
  const uriString = encodeURI(`api/product/${query.product}`);
  // Fetch data from external API
  const res = await API.get(uriString);

  // Pass data to the page via props
  return { props: { stars: res.data, query } };
}
Single.propTypes = {
  query: PropTypes.any,
  stars: PropTypes.any,
};
