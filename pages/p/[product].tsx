import Link from "next/link";
import Layout from "@/components/Layout/HomeLayout";
import Comments from "../../components/Comments";

import { ReactElement, useEffect, useState } from "react";
import API from "../../config";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import useSWR from "swr";
import { CartActions } from "../../store/cart/cartActions";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import Loading from "@/components/Loading";
import {
  Dropdown,
  message,
  Spin,
  Menu,
  notification,
  Modal,
  Badge,
  Typography,
  Popover,
} from "antd";
import { MetaTags } from "@/components/SEO/MetaTags";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import router from "next/router";
import NotFound from "@/components/NotFound";
import Image from "next/image";
import { Alert } from "@/components/Alert/Alert";
import ReactPlayer from "react-player";

const { Text } = Typography;
const properties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  prevArrow: (
    <div className="arrow-navigations right" style={{ width: "30px" }}>
      <span className="material-icons-outlined">chevron_left</span>
    </div>
  ),
  nextArrow: (
    <div className="arrow-navigations left" style={{ width: "30px" }}>
      <span className="material-icons-outlined">chevron_right</span>
    </div>
  ),
};
function Single({ query, stars, errorFetch }) {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const isLoading = useAppSelector((state) => state.cart.isLoading);
  let token = Cookies.get("token");
  const { getAll, language } = useAppSelector((state) => state.languages);

  if (!token && typeof window !== "undefined")
    token = localStorage.getItem("token");
  const { data: ProductData, errorLoad }: any = useSWR(
    `api/product/${query.product}`
  );
  const { value, symbol_native } = useAppSelector((state) => state.currency.my);

  const { data: userInfo }: any = useSWR("api/me");

  const [quantutyCount, setQuantutyCount] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [createConversationLoading, setCreateConversationLoading] =
    useState(false);

  useEffect(() => {
    if (errorFetch) {
      router.push("/404");
    }
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
  const [messageConv, setMessageConv] = useState("");
  const [hasConversation, setHasConversation] = useState(false);
  // Start Conversation
  async function startConversation(message: string) {
    setCreateConversationLoading(true);
    try {
      const res = await API.post(
        `api/product/${
          ProductData && ProductData.data.id
        }/conversations/create`,
        {
          initial_message: message,
          receiver_id:
            ProductData && ProductData.data.profile_seller.profile.user_id,
          title: ProductData && ProductData.data.title,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        setIsModalVisible(false);
        router.push("/conversations");
        setHasConversation(true);
      }
    } catch (error) {
      setCreateConversationLoading(false);
    }
  }
  const addToCart = async () => {
    const veriedEmail = user.email_verified;
    if (!veriedEmail) {
      router.push("/email/verification");
      return;
    }
    if (token) {
      try {
        await dispatch(
          CartActions.addProduct({
            quantity: Number(quantutyCount),
            product_id: ProductData.data.id,
            developments: theIDs,
          })
        ).unwrap();
        const key = `open${Date.now()}`;
        const btn = (
          <button
            onClick={() => {
              notification.close(key);
              router.push("/cart");
            }}
            className="btn butt-sm butt-primary"
          >
            {getAll("Go_to_cart")}
          </button>
        );

        notification.open({
          message: getAll("Notification"),
          description: getAll("This_service_was"),
          placement: "topLeft",
          btn,
          key,
        });
      } catch (error: any) {
        if (error.msg) {
          notification.warning({
            message: getAll("Alert"),
            description: error.msg,
            placement: "topLeft",
          });
        } else {
          message.error(getAll("An_unexpected_error"));
        }
      }
    } else {
      router.push("/login");
    }
  };
  function durationFunc() {
    if (ProductData.data.duration == 1) {
      return getAll("One_day");
    }
    if (ProductData.data.duration == 2) {
      return getAll("Two_days");
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
      return getAll("Two_days");
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
  const [theIDs, settheIDs] = useState([]);
  const [checkedDevelopments, setcheckedDevelopments] = useState([]);

  const handleOnChangeAddID = (event) => {
    let newArray = [...theIDs, event.target.value];
    if (theIDs.includes(event.target.value)) {
      newArray = newArray.filter((day) => day !== event.target.value);
    }
    settheIDs(newArray);
    setcheckedDevelopments(newArray);
  };
  /***** get the total price when any of  developments checkboxes or quantutyCount changed *****/
  function _totalPrice() {
    let __checkedDevelopments_sum = 0;
    const b = [],
      c = checkedDevelopments,
      a = ProductData && ProductData.data.developments.map((e) => e.id);

    for (let i = 0; i < a.length; i++) {
      for (let j = 0; j < c.length; j++) {
        if (a[i] == c[j]) {
          b.push(i);
        }
      }
    }
    for (let i = 0; i < b.length; i++) {
      __checkedDevelopments_sum =
        __checkedDevelopments_sum +
        parseInt(ProductData && ProductData.data.developments[b[i]].price);
    }
    const total_price =
      (parseInt(ProductData.data.price) + __checkedDevelopments_sum) *
      quantutyCount;
    return Math.abs(total_price);
  }
  const noteContent = (
    <div>
      <ul>
        <li>{getAll("From_5_100_Dollars")}</li>
        <li>{getAll("From_101_500_Dollars")} </li>
        <li>{getAll("From_501_1000_Can")}</li>
      </ul>
      <Text type="danger">
        {getAll("Buyers_single_service")}
        {getAll("Service")}
      </Text>
    </div>
  );

  return (
    <>
      {!ProductData && <Loading />}
      {errorLoad && <NotFound />}
      {!errorFetch && (
        <MetaTags
          title={stars.data.title}
          keywords={stars.data.product_tag}
          metaDescription={stars.data.content}
          ogDescription={stars.data.content}
          ogImage={stars.data.full_path_thumbnail}
          ogUrl={`https://timwoork.com/p/${stars.data.slug}`}
        />
      )}
      {ProductData && (
        <div className="timwoork-single">
          <Modal
            title={getAll("Create_a_conversation")}
            visible={isModalVisible}
            confirmLoading={createConversationLoading}
            onOk={() => startConversation(messageConv)}
            cancelText={getAll("Cancel")}
            okText={getAll("Start_conversation")}
            onCancel={() => setIsModalVisible(false)}
          >
            <textarea
              name="messageConv"
              className="timlands-inputs"
              placeholder={getAll("Write_an_initial")}
              style={{ height: 180 }}
              disabled={createConversationLoading}
              value={messageConv}
              onChange={(e: any) => setMessageConv(e.target.value)}
            ></textarea>
          </Modal>
          <div
            className="row"
            style={{ maxWidth: 1300, marginInline: "auto", marginTop: 10 }}
          >
            <div className="col-lg-8">
              <div className="timwoork-single-post">
                <div className="timwoork-single-header">
                  <h1 className="title">
                    {ProductData.data[whichTitle(language)]}
                  </h1>

                  <div className="timwoork-single-header-meta d-flex">
                    <ul className="single-header-meta nav ">
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
                          ProductData.data.subcategory.category[
                            which(language)
                          ]}
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
                                ProductData.data.subcategory[which(language)]}
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
                      <div
                        key={ProductData?.data.galaries.length}
                        className="each-slide"
                      >
                        <div
                          className="images-slider"
                          style={{
                            backgroundImage: `url(${APIURL2}${ProductData.data.full_path_thumbnail})`,
                          }}
                        ></div>
                      </div>
                    </Slide>
                    <div
                      className="timwoork-single-product-detailts p"
                      dangerouslySetInnerHTML={{
                        __html: ProductData.data[whichContent(language)],
                      }}
                    />
                    {ProductData.data.product_tag && (
                      <div className="timwoork-single-tags">
                        <ul className="single-tags-list">
                          <li className="title">{getAll("Key_words")}:</li>
                          {ProductData.data.product_tag.map((e: any) => (
                            <li key={e.id}>
                              <span>{e.name}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {ProductData.data.video && (
                      <div className="py-3">
                        <ReactPlayer
                          style={{
                            borderRadius: 6,
                            overflow: "hidden",
                            marginTop: 6,
                          }}
                          width="100%"
                          url={ProductData.data.video.url_video}
                        />
                      </div>
                    )}
                    {ProductData.data.profile_seller && (
                      <div className="timwoork-single-seller-info">
                        <div className="seller-info-header">
                          <h4 className="title">{getAll("About_Seller")}</h4>
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
                                    ProductData.data.profile_seller.level[
                                      which(language)
                                    ]}
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
                                {!hasConversation && (
                                  <button
                                    className="btn butt-green butt-sm flex-center"
                                    disabled={createConversationLoading}
                                    onClick={() =>
                                      user.isLogged
                                        ? setIsModalVisible(true)
                                        : router.push("/login")
                                    }
                                  >
                                    <i className="material-icons material-icons-outlined">
                                      email
                                    </i>{" "}
                                    {getAll("Contact_seller_one")}
                                    {createConversationLoading && (
                                      <span
                                        className="spinner-border spinner-border-sm"
                                        role="status"
                                        aria-hidden="true"
                                      ></span>
                                    )}
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
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
                            canReply={
                              userInfo &&
                              userInfo.user_details.profile.id ==
                                ProductData.data.profile_seller.id
                            }
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
                <Spin spinning={isLoading}>
                  <div className="single-panel-aside">
                    <div className="panel-aside-header">
                      <ul className="nav top-aside-nav">
                        <li className="delevr-time me-auto">
                          <span className="material-icons material-icons-outlined">
                            timer
                          </span>{" "}
                          {getAll("Delivery_term")}: {durationFunc()}
                        </li>
                        <li className="cat-post ml-auto">
                          <Dropdown overlay={menu}>
                            <span>
                              <span className="material-icons material-icons-outlined">
                                share
                              </span>{" "}
                              {getAll("Share_service")}
                            </span>
                          </Dropdown>
                        </li>
                      </ul>
                    </div>
                    <div className="row mx-auto py-2">
                      <div className="col-7">
                        <p className="text-quatity">
                          {" "}
                          {getAll("Number_of_purchases")}:
                          <span className="me-auto">
                            <Popover
                              content={noteContent}
                              trigger="hover"
                              placement="bottom"
                            >
                              <Badge
                                style={{ color: "#52c41a " }}
                                count={
                                  <span
                                    style={{ color: "#52c41a", fontSize: 16 }}
                                    className="material-icons"
                                  >
                                    info
                                  </span>
                                }
                              />
                            </Popover>
                          </span>
                        </p>
                      </div>
                      <div className="col-5">
                        {/* <input
                          type="text"
                          maxLength={2}
                          onInput={allowOnlyNumericsOrDigits}
                          pattern="[0-9]*"
                          value={quantutyCount}
                          name="quantity_count"
                          className="timlands-inputs sm"
                        //onChange={(e: any) => setQuantutyCount(e.target.value)}
                        /> */}
                        <select
                          name="quantity_count"
                          id="quantity_count"
                          value={quantutyCount}
                          className="timlands-inputs sm"
                          onChange={(e: any) =>
                            setQuantutyCount(e.target.value)
                          }
                        >
                          <option value={1}>1</option>
                          <option value={2}>2</option>
                          <option value={3}>3</option>
                          <option value={4}>4</option>
                          <option value={5}>5</option>
                          <option value={6}>6</option>
                          <option value={7}>7</option>
                          <option value={8}>8</option>
                          <option value={9}>9</option>
                          <option value={10}>10</option>
                        </select>
                      </div>
                    </div>
                    {ProductData.data.developments && (
                      <div className="panel-aside-body">
                        <div className="add-devloppers-header">
                          <h4 className="title">
                            {getAll("Available_upgrades")}
                          </h4>
                        </div>
                        {ProductData.data.developments.length == 0 && (
                          <div className="nothing-note">
                            <p className="text">{getAll("No_upgrades_in")}</p>
                          </div>
                        )}
                        <ul className="add-devloppers-nav">
                          {ProductData.data.developments.map((e: any) => {
                            return (
                              <li key={e.id} className="devloppers-item">
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id={"flexCheckDefault-id" + e.id}
                                    value={e.id}
                                    onChange={handleOnChangeAddID}
                                    // {..._totalPrice()}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor={"flexCheckDefault-id" + e.id}
                                  >
                                    {e[whichTitle(language)]}
                                    <p className="price-duration">
                                      {getAll("The_duration_will_cost")}
                                      {DevdurationFunc(e.duration)}{" "}
                                      {Math.round(e?.price * value) +
                                        symbol_native}
                                    </p>
                                  </label>
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )}
                    <div className="panel-aside-footer ">
                      <div className="aside-footer-total-price">
                        <h4 className="price-total me-auto">
                          <strong>{getAll("Total")} </strong>{" "}
                          {Math.round(_totalPrice() * value) + symbol_native}
                        </h4>
                        <div className="bayers-count">
                          <p className="num">
                            <span className="count">
                              {ProductData && ProductData.data.count_buying}{" "}
                            </span>

                            <span className="text">
                              {" "}
                              {getAll("boght_this")}
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="aside-footer-addtocart mt-3">
                        <button
                          onClick={addToCart}
                          className="btn butt-primary butt-lg"
                        >
                          <span className="material-icons material-icons-outlined">
                            add_shopping_cart
                          </span>
                          {getAll("Add_to_cart")}
                        </button>
                      </div>
                    </div>
                  </div>
                </Spin>
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
Single.getLayout = function getLayout(page: any): ReactElement {
  return <Layout>{page}</Layout>;
};
export default Single;
export async function getServerSideProps({ query }) {
  try {
    const uriString = encodeURI(`api/product/${query.product}`);
    // Fetch data from external API
    const res = await API.get(uriString);

    // Pass data to the page via props
    return { props: { stars: res.data, query, errorFetch: false } };
  } catch (error) {
    return { props: { stars: null, query, errorFetch: true } };
  }
}
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
const whichTitle = (language) => {
  switch (language) {
    default:
      return "title_en";
    case "ar":
      return "title_ar";
    case "en":
      return "title_en";
    case "fr":
      return "title_fr";
  }
};
function whichContent(language) {
  switch (language) {
    default:
      return "content_en";
    case "ar":
      return "content_ar";
    case "en":
      return "content_en";
    case "fr":
      return "content_fr";
  }
}
Single.propTypes = {
  query: PropTypes.any,
  stars: PropTypes.any,
  errorFetch: PropTypes.bool,
};
