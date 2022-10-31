import Link from "next/link";
import Layout from "@/components/Layout/HomeLayout";
import { ReactElement, useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import Loading from "components/Loading";
import Comments from "../../components/Comments";
import PropTypes from "prop-types";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import router from "next/router";
import { Alert } from "@/components/Alert/Alert";
import { MetaTags } from "@/components/SEO/MetaTags";
import { notification, Spin } from "antd";
import { MyProductsActions } from "store/myProducts/myProductsActions";
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
function Single({ query }) {
  const dispatch = useAppDispatch();

  const { getAll, language } = useAppSelector((state) => state.languages);
  const product = useAppSelector((state) => state.myProducts.product);
  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    if (!query.id) return;
    if (product.loaded && product.id === query.id) return;
    dispatch(MyProductsActions.getProduct({ id: query.id }))
      .unwrap()
      .then(() => {})
      .catch(() => {
        router.push("/myproducts");
      });
  }, [query.id]);

  const veriedEmail = user.email_verified;
  const disactiveProductHandle = async () => {
    const MySwal = withReactContent(Swal);

    const swalWithBootstrapButtons = MySwal.mixin({
      customClass: {
        confirmButton: "btn butt-red butt-sm me-1",
        cancelButton: "btn butt-green butt-sm",
      },
      buttonsStyling: false,
    });
    try {
      await dispatch(
        MyProductsActions.updateProduct({
          is_active: false,
          id: query.product,
          updateProduct: true,
        })
      ).unwrap();
      swalWithBootstrapButtons.fire(
        getAll("Disabled1"),
        getAll("The_service_has_2"),
        "success"
      );
    } catch (error) {
      notification["error"]({
        message: getAll("Error_message"),
        description: getAll("Unfortunately_this_service"),
      });
    }
  };
  const deleteHandle = () => {
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
        title: getAll("Are_you_sure1"),
        text: getAll("Are_you_sure"),
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: getAll("Yes"),
        cancelButtonText: "لا",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            await dispatch(
              MyProductsActions.deleteProduct({ id: query.product })
            ).unwrap();
            swalWithBootstrapButtons.fire(
              getAll("Deleted"),
              getAll("The_service_has"),
              "success"
            );
          } catch (error) {
            () => {};
          }
        }
      });
  };
  const [isProductActive, setIsProductActive] = useState(false);
  const activeProductHandle = async () => {
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
      await dispatch(
        MyProductsActions.updateProduct({
          is_active: true,
          id: query.product,
          updateProduct: true,
        })
      ).unwrap();
      setIsProductActive(false);
      swalWithBootstrapButtons.fire(
        getAll("Abled1"),
        getAll("This_service_has"),
        "success"
      );
    } catch (error) {
      setIsProductActive(false);
      notification["error"]({
        message: getAll("Error_message"),
        description: getAll("Unfortunately_this_service_2"),
      });
    }
  };
  useEffect(() => {
    if (!user.isLogged && !user.loading) {
      router.push("/login");
      return;
    }
  }, [user]);
  const showStars = () => {
    const rate = Number(product.ratings_avg_rating).toPrecision(1) || 0;
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
    if (product.duration == 1) {
      return getAll("One_day");
    }
    if (product.duration == 2) {
      return getAll("2_days");
    }
    if (product.duration > 2 && product.duration < 11) {
      return product.duration + getAll("Days");
    }
    if (product.duration >= 11) {
      return product.duration + getAll("Day");
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
    switch (product.current_step) {
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
    router.push(`/edit-product/${page_name}?id=${product.id}`);
  };

  const APIURL2 =
    "https://timwoork-space.ams3.digitaloceanspaces.com/products/galaries-images/";
  if (product.loading) return <Loading />;
  return (
    <>
      <MetaTags
        title={product.title + ` - ${getAll("Timwoork")}`}
        metaDescription={product.content}
        ogDescription={product.content}
        ogImage={product.full_path_thumbnail}
        ogUrl={`https://timwoork.com/p/${product.slug}`}
      />
      {product && veriedEmail && (
        <div className="timwoork-single">
          {product.is_active == null && (
            <div style={{ marginTop: 27 }}>
              <Alert type="warning">
                {getAll("This_service_is")}{" "}
                <Link href={`/edit-product/overview?id=${product.id}`}>
                  <a>{getAll("Edit")}</a>
                </Link>
              </Alert>
            </div>
          )}
          <div className="row">
            <div className="col-lg-8">
              <div className="timwoork-single-post">
                <div className="timwoork-single-header">
                  <h1 className="title">{product.title}</h1>
                  <div className="timwoork-single-header-meta d-flex">
                    <ul className="single-header-meta nav me-auto">
                      <li className="user-item">
                        <Link
                          href={`/u/${product.profile_seller?.profile?.user?.username}`}
                        >
                          <a className="user-link">
                            <span className="pe-2">
                              {product.profile_seller?.profile?.full_name}
                            </span>
                          </a>
                        </Link>
                      </li>
                      <li className="category-item">
                        <Link
                          href={`/category/${
                            product && product.subcategory.id
                          }`}
                        >
                          <a className="category-link">
                            <span className="material-icons material-icons-outlined">
                              label
                            </span>
                            {product && product.subcategory[which(language)]}
                          </a>
                        </Link>{" "}
                        <span style={{ marginInline: 5 }}>|</span>
                        <small style={{ marginInline: 5 }}>
                          {product &&
                            product.subcategory.category[which(language)]}
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
                          ({product.ratings_count})
                        </span>
                      </li>
                      <li className="level-item">
                        <span className="text-level">{getAll("Level")}</span>
                        <span className="value-level">
                          {product &&
                            product.profile_seller.level !== null &&
                            product.profile_seller.level[which(language)]}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="timwoork-single-content">
                  <div className="timwoork-single-content-body">
                    <Slide {...properties}>
                      {product &&
                        product.galleries.map((each: any, index) => {
                          return each.url_video == null ? (
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
                          );
                        })}
                    </Slide>
                    <div
                      className="timwoork-single-product-detailts"
                      dangerouslySetInnerHTML={{
                        __html: product.content,
                      }}
                    />
                    {product.product_tag && (
                      <div className="timwoork-single-tags">
                        <ul className="single-tags-list">
                          <li className="title">{getAll("Tags")}</li>
                          {product.product_tag.map((e: any) => (
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
                              {getAll("Customer_reviews")}
                            </h4>
                          </div>
                        </div>
                        <div className="single-comments-body">
                          <Comments
                            canReply={true}
                            comments={product.ratings}
                          />
                          {product.ratings.length == 0 && (
                            <Alert type="primary">
                              <span className="text">
                                {getAll("There_is_no_2")}
                              </span>
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
                {product.is_active == 1 && (
                  <div className="d-flex">
                    <Link href={`/edit-product/overview?id=${product.id}`}>
                      <a className="btn butt-md butt-green flex-center-just mb-1 mx-1">
                        <span className="material-icons material-icons-outlined">
                          create
                        </span>{" "}
                        {getAll("Service_editing")}
                      </a>
                    </Link>
                    <button
                      onClick={() => deleteHandle()}
                      className="btn butt-md butt-red flex-center-just mb-1 mx-1"
                    >
                      <span className="material-icons material-icons-outlined">
                        delete
                      </span>{" "}
                      {getAll("Delete_the_service")}
                    </button>
                  </div>
                )}
                {product.is_active == null && (
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
                        {getAll("Delivery_terme")}
                        {durationFunc()}
                      </li>
                    </ul>
                  </div>
                  {product.developments && (
                    <div className="panel-aside-body">
                      <div className="add-devloppers-header">
                        <h4 className="title">
                          {getAll("Available_developments")}
                        </h4>
                      </div>
                      {product.developments.length == 0 && (
                        <div className="nothing-note">
                          <p className="text">
                            {getAll("This_service_contains")}
                          </p>
                        </div>
                      )}
                      <ul className="add-devloppers-nav">
                        {product.developments.map((e: any) => {
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
                        <strong>{getAll("Service_price")}</strong>{" "}
                        {product && product.price}$
                      </h4>
                      <div className="bayers-count">
                        <p className="num">
                          <span className="count">
                            {product && product.count_buying}{" "}
                          </span>
                          <span className="text">
                            {" "}
                            {getAll("Have_bought_this")}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  {product.status !== null && (
                    <Spin spinning={isProductActive}>
                      {product.is_active == 0 && product.is_completed == 1 ? (
                        <button
                          disabled={isProductActive}
                          onClick={() => activeProductHandle()}
                          className="btn butt-sm butt-green"
                        >
                          تفعيل
                        </button>
                      ) : (
                        <button
                          disabled={isProductActive}
                          style={{ width: "100%", marginTop: 5 }}
                          onClick={() => disactiveProductHandle()}
                          className="btn butt-sm butt-red"
                        >
                          {getAll("Disable_this_service")}
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
export async function getServerSideProps({ query }) {
  return { props: { query } };
}
Single.propTypes = {
  query: PropTypes.any,
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
