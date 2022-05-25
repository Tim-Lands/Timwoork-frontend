import PropTypes from "prop-types";
import { Menu, Dropdown, Badge, Tooltip, notification } from "antd";
import { ReactElement, useEffect, useState, useRef } from "react";
import Menus from "./Menus";
import { FiSettings } from "react-icons/fi";
import { IoIosAddCircleOutline } from "react-icons/io";
import {
  MdOutlineAccountBalanceWallet,
  MdOutlineInventory2,
  MdOutlineShoppingCart,
  MdOutlineShop2,
  MdLogout,
  MdNotificationsNone,
  MdOutlineMailOutline,
} from "react-icons/md";

import { useOutSide } from "../useOutSide";
import API from "../../config";
import { FaSignInAlt, FaGlobe, FaUserPlus } from "react-icons/fa";
import MenusMobile from "./MenusMobile";
import Link from "next/link";
import ImageLogo from "next/image";
import logoIMG from "../../public/logo.png";
import useSWR from "swr";
import Cookies from "js-cookie";
import router from "next/router";

import {
  MessageOutlined,
  InfoCircleOutlined,
  CloseCircleOutlined,
  BellOutlined,
} from "@ant-design/icons";
import Pusher from "pusher-js";
import LastSeen from "../LastSeen";
import LogoutModal from "../LogoutModal";

function Navbar(): ReactElement {
  const [size, setSize] = useState(10000);
  const [visible, setVisible] = useState(false);
  const [isShowenLangs, setIsShowenLangs] = useState(false);
  const hideList = () => {
    setTimeout(() => {
      setVisible(false);
    }, 200);
  };
  const hideLangList = () => {
    setTimeout(() => {
      setIsShowenLangs(false);
    }, 200);
  };
  let token = Cookies.get("token");
  const userList = useRef();
  const langList = useRef();
  useOutSide(userList, hideList);
  useOutSide(langList, hideLangList);

  if (!token && typeof window !== "undefined")
    token = localStorage.getItem("token");
  const { data: userInfo }: any = useSWR("api/me");
  //const [msg, setMsg] = useState();
  const countMsg = userInfo && userInfo.unread_messages_count;
  const veriedEmail = userInfo && userInfo.user_details.email_verified_at;
  const pusher = new Pusher("510f53f8ccb3058a96fc", {
    cluster: "eu",
    authEndpoint: "https://api.timwoork.com/api/broadcasting/auth",
    forceTLS: true,
    auth: token
      ? {
        headers: {
          // pass the authorization token when using private channels
          Authorization: `Bearer ${token}`,
        },
      }
      : undefined,
  });
  //myRef.current.scrollTo(0, myRef.current.scrollHeight + 80)
  const channelChat = `presence-receiver.${userInfo && userInfo.user_details.id
    }`;
  const channel = pusher.subscribe(channelChat);

  const channelNotification = `presence-notify.${userInfo && userInfo.user_details.id
    }`;
  const channelNoty = pusher.subscribe(channelNotification);
  const langsList = (
    <div
      className="menu-langs bg-white"
      style={{ top: 15, left: -5, width: "fit-content" }}
    >
      <button className="langs-item" type="button" style={{ width: "100%" }}>
        <ImageLogo width={25} height={16} src="/sa.webp" />
        <span>{size > 1050 ? "العربية" : "Ar"} </span>
      </button>
      <button
        className="langs-item"
        type="button"
        style={{ width: "max-content" }}
      >
        <ImageLogo width={25} height={16} src="/uk.webp" />{" "}
        <span>{size > 1050 ? "الأنجليزية" : "En"}</span>
      </button>
    </div>
  );
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setVisible(false);
      setIsShowenLangs(false);
    });
    window.addEventListener("resize", () => {
      setSize(window.innerWidth);
    });
    setSize(window.innerWidth);
    if (token) {
      channel.bind("message.sent", (data) => {
        const effect = new Audio("/effect.mp3");
        effect.play();

        if (data.message.type == 0) {
          notification.open({
            message: "لديك رسالة جديدة",
            description: (
              <div className="msg-notification">
                <a
                  href={`/conversations/${data.message.conversation.id}#msg-item-${data.message.id}`}
                  style={{ color: "#666", fontWeight: 300 }}
                >
                  <p className="meta">
                    <LastSeen date={data.message.created_at} />
                  </p>
                  <h4 className="title">{data.message.message}</h4>
                </a>
                <p className="text">
                  <small className="ml-1">
                    <strong>من طرف: </strong>
                  </small>
                  <Link href={`/u/${data.message.user.username}`}>
                    <a style={{ color: "#666", fontWeight: 300 }}>
                      {/*<span style={{ color: '#666', fontWeight: 300, }}>
                                            {data.message.user.profile.full_name}
                                        </span>*/}
                    </a>
                  </Link>
                </p>
              </div>
            ),
            icon: <MessageOutlined style={{ color: "#108ee9" }} />,
            placement: "bottomLeft",
          });
        }
        if (data.message.type == 1) {
          notification["info"]({
            message: "لديك تعليمة جديدة",
            description: (
              <div className="msg-notification">
                <p className="meta">
                  <LastSeen date={data.message.created_at} />
                </p>
                <h4 className="title">{data.message.message}</h4>
                <p className="text">
                  <small className="ml-1">
                    <strong>من طرف: </strong>
                  </small>
                  <Link href={`/u/${data.message.user.username}`}>
                    <a style={{ color: "#666", fontWeight: 300 }}>
                      <span style={{ color: "#666", fontWeight: 300 }}>
                        {data.message.user.profile.full_name}
                      </span>
                    </a>
                  </Link>
                </p>
              </div>
            ),
            icon: <InfoCircleOutlined style={{ color: "#80c26c" }} />,
            placement: "bottomLeft",
          });
        }
        if (data.message.type == 2) {
          notification["error"]({
            message: "لديك سبب إلغاء",
            description: (
              <div className="msg-notification">
                <p className="meta">
                  <LastSeen date={data.message.created_at} />
                </p>
                <h4 className="title">{data.message.message}</h4>
                <p className="text">
                  <small className="ml-1">
                    <strong>من طرف: </strong>
                  </small>
                  <Link href={`/u/${data.message.user.username}`}>
                    <a style={{ color: "#666", fontWeight: 300 }}>
                      <span style={{ color: "#666", fontWeight: 300 }}>
                        {data.message.user.profile.full_name}
                      </span>
                    </a>
                  </Link>
                </p>
              </div>
            ),
            icon: <CloseCircleOutlined style={{ color: "#d33232" }} />,
            placement: "bottomLeft",
          });
        }
      });

      channelNoty.bind("notification.sent", (data) => {
        const NotifyEffect = new Audio("/bell.mp3");
        NotifyEffect.play();
        notification.open({
          message: "لديك اشعار جديد",
          description: (
            <div className="msg-notification">
              {data.to == "seller" && (
                <a
                  href={`/mysales/${data.content.item_id}`}
                  style={{ color: "#666", fontWeight: 300 }}
                >
                  <h4 className="title">{data.title}</h4>
                </a>
              )}
              {data.to == "buyer" && (
                <a
                  href={`/mypurchases/${data.content.item_id}`}
                  style={{ color: "#666", fontWeight: 300 }}
                >
                  <h4 className="title">{data.title}</h4>
                </a>
              )}
              <p className="text">
                <small className="ml-1">
                  <strong>من طرف: </strong>
                </small>
                <Link href={`/u/${data.user_sender.username}`}>
                  <a style={{ color: "#666", fontWeight: 300 }}>
                    <span style={{ color: "#666", fontWeight: 300 }}>
                      {data.user_sender.full_name}
                    </span>
                  </a>
                </Link>
              </p>
            </div>
          ),
          icon: <BellOutlined style={{ color: "#108ee9" }} />,
          placement: "bottomRight",
        });
      });
      return () => {
        pusher.unsubscribe(channelChat);
        pusher.unsubscribe(channelNotification);
        window.removeEventListener("resize", () => {
          setSize(window.innerWidth);
        });
        window.removeEventListener("scroll", () => {
          setVisible(false);
        });
      };
    }
  }, [channelChat, channelNotification]);

  //store username, email & userID in Cookies just for chat
  if (token) {
    const email = userInfo && userInfo.user_details.email;
    const username = userInfo && userInfo.user_details.username;
    const userID = userInfo && userInfo.user_details.id;
    Cookies.set("_email", email);
    Cookies.set("_username", username);
    Cookies.set("_userID", userID);
  }
  const [isMenuShowenMob, setIsMenuShowenMob] = useState(false);
  const setIsMenuShowenHandle = () => {
    setIsMenuShowenMob(!isMenuShowenMob);
  };
  const { data: userData }: any = useSWR(`api/me`);
  const logout = async () => {
    try {
      const res = await API.post(
        "api/logout_user",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        Cookies.remove("token");
        router.reload();
      }
    } catch (error) {
      () => { };
    }
  };
  const myLoader = () => {
    return `${userData && userData.user_details.profile.avatar_path}`;
  };
  const [isLogoutModal, setIsLogoutModal]: any = useState(false);
  const AccountList = (
    <Menu
      style={{ padding: 5, borderRadius: 3, width: size > 450 ? 270 : 220 }}
    >
      <Menu.Item key="0">
        <Link href="/user/profile">
          <a
            style={{
              color: "black",
              fontWeight: 400,
              width: "100%",
              padding: 6,
              backgroundColor: "#F5F5F5",
              height: "100%",
            }}
          >
            <div
              className="d-flex align-items-center justify-content-center"
              style={{
                borderRadius: "100%",
                overflow: "hidden",
                marginLeft: 7,
                padding: 2,
                border: "2px solid rgb(0,0,0,0.2)",
              }}
            >
              <div
                className="d-flex align-items-center justify-content-center"
                style={{
                  borderRadius: "100%",
                  overflow: "hidden",
                  margin: 0,
                }}
              >
                <ImageLogo
                  loader={myLoader}
                  src={userData?.user_details?.profile?.avatar_path}
                  quality={60}
                  width={32}
                  height={32}
                  alt={userData && userData.user_details.profile.full_name}
                  placeholder="blur"
                  blurDataURL="/avatar2.jpg"
                />
              </div>
            </div>

            {userData && userData.user_details.profile.full_name == ""
              ? "بدون اسم"
              : userData && userData.user_details.profile.full_name}
          </a>
        </Link>
      </Menu.Item>
      {veriedEmail && userData && userData.user_details.profile.is_seller == 1 && (
        <Menu.Item key="7">
          <Link href="/add-new">
            <a
              style={{
                width: "100%",
                padding: 6,
                height: "100%",
              }}
            >
              <div
                className="d-flex justify-content-center align-items-center"
                style={{
                  backgroundColor: "#F5F5F5",
                  padding: 4,
                  marginLeft: 5,
                  borderRadius: "100%",
                  color: "#707070",
                  fontSize: 20,
                }}
              >
                <IoIosAddCircleOutline />
              </div>
              إضافة خدمة جديدة
            </a>
          </Link>
        </Menu.Item>
      )}
      {veriedEmail && (
        <Menu.Item key="70">
          <Link href="/mywallet">
            <a
              style={{
                width: "100%",
                padding: 6,
                height: "100%",
              }}
            >
              <div
                className="d-flex justify-content-center align-items-center"
                style={{
                  backgroundColor: "#F5F5F5",
                  padding: 4,
                  borderRadius: "100%",
                  color: "#707070",
                  fontSize: 20,
                  marginLeft: 5,
                }}
              >
                <MdOutlineAccountBalanceWallet />
              </div>
              محفظتي
            </a>
          </Link>
        </Menu.Item>
      )}

      {veriedEmail && userData && userData.user_details.profile.is_seller == 1 && (
        <Menu.Item key="0">
          <Link href="/myproducts">
            <a
              style={{
                padding: 6,
                width: "100%",
                height: "100%",
              }}
            >
              <div
                className="d-flex justify-content-center align-items-center"
                style={{
                  backgroundColor: "#F5F5F5",
                  padding: 4,
                  borderRadius: "100%",
                  color: "#707070",
                  fontSize: 20,
                  marginLeft: 5,
                }}
              >
                <MdOutlineInventory2 />
              </div>
              خدماتي
            </a>
          </Link>
        </Menu.Item>
      )}
      {veriedEmail && (
        <Menu.Item key="1">
          <Link href="/mypurchases">
            <a
              style={{
                width: "100%",
                height: "100%",
                padding: 6,
              }}
            >
              <div
                className="d-flex justify-content-center align-items-center"
                style={{
                  backgroundColor: "#F5F5F5",
                  padding: 4,
                  borderRadius: "100%",
                  color: "#707070",
                  fontSize: 20,
                  marginLeft: 5,
                }}
              >
                <MdOutlineShoppingCart />
              </div>
              مشترياتي
            </a>
          </Link>
        </Menu.Item>
      )}
      {veriedEmail && userData && userData.user_details.profile.is_seller == 1 && (
        <Menu.Item key="43">
          <Link href="/mysales">
            <a
              style={{
                width: "100%",
                height: "100%",
                padding: 6,
              }}
            >
              <div
                className="d-flex justify-content-center align-items-center"
                style={{
                  backgroundColor: "#F5F5F5",
                  padding: 4,
                  borderRadius: "100%",
                  color: "#707070",
                  fontSize: 20,
                  marginLeft: 5,
                }}
              >
                <MdOutlineShop2 />
              </div>
              مبيعاتي
            </a>
          </Link>
        </Menu.Item>
      )}
      <Menu.Item key="14">
        <Link href="/user/personalInformations">
          <a
            style={{
              width: "100%",
              height: "100%",
              padding: 6,
            }}
          >
            <div
              className="d-flex justify-content-center align-items-center"
              style={{
                backgroundColor: "#F5F5F5",
                padding: 4,
                borderRadius: "100%",
                color: "#707070",
                fontSize: 20,
                marginLeft: 5,
              }}
            >
              <FiSettings />
            </div>
            الإعدادات
          </a>
        </Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3">
        <a
          style={{
            width: "100%",
            height: "100%",
            padding: 6,
          }}
          onClick={logout}
        >
          <div
            className="d-flex justify-content-center align-items-center"
            style={{
              backgroundColor: "#F5F5F5",
              padding: 4,
              borderRadius: "100%",
              color: "#707070",
              fontSize: 20,
              marginLeft: 5,
            }}
          >
            <MdLogout />
          </div>
          تسجيل الخروج
        </a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3">
        <a
          style={{
            width: "100%",
            padding: 6,
            height: "100%",
          }}
          onClick={() => setIsLogoutModal(true)}
        >
          <div
            className="d-flex justify-content-center align-items-center"
            style={{
              backgroundColor: "#F5F5F5",
              padding: 4,
              borderRadius: "100%",
              color: "#707070",
              fontSize: 20,
              marginLeft: 5,
            }}
          >
            <MdLogout />
          </div>
          الخروج من جميع الأجهزة
        </a>
      </Menu.Item>
    </Menu>
  );

  const darkMode = userData && userData.user_details.profile.dark_mode;
  const button = useRef();

  return (
    <>
      {isLogoutModal && (
        <LogoutModal setIsLogoutModal={setIsLogoutModal} />
      )}
      <div
        className={"timlands-navbar-container"}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 999,
        }}
      >
        <nav
          className="timlands-navbar d-flex align-items-center justify-content-center"
          style={{
            backgroundColor: !darkMode ? "#fff" : "#212121",
            position: "relative",
            zIndex: 600,
          }}
        >
          <div
            className="d-flex justify-content-between "
            style={{ maxWidth: 1300, width: "100%" }}
          >
            <div className="nav-container">
              <div
                className="d-flex"
                style={{
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                <div className="toggle-nav me-auto">
                  <button
                    ref={button}
                    className="toggle-nav-btn"
                    onClick={setIsMenuShowenHandle}
                    style={{
                      display: "flex",
                      width: 35,
                      height: 35,
                      backgroundColor: "transparent",
                      color: !darkMode ? "#999" : "#333",
                      alignItems: "center",
                      alignContent: "center",
                      justifyContent: "center",
                      borderWidth: 0,
                    }}
                  >
                    <span className="material-icons material-icons-outlined">
                      menu
                    </span>
                  </button>
                </div>
                <div
                  className="logo-nav me-auto"
                  style={{ display: "flex", width: 55 }}
                >
                  <Link href="/">
                    <a>
                      <ImageLogo src={logoIMG} alt="Timwoork" />
                    </a>
                  </Link>
                </div>

                <span
                  className="hr-divider "
                  style={{
                    position: "relative",
                    height: 40,
                    width: 2,
                    backgroundColor: "#f2f2f2",
                  }}
                ></span>
                <Menus darkMode={darkMode} />
                {isMenuShowenMob && (
                  <MenusMobile
                    darkMode={darkMode}
                    button={button}
                    setIsMenuShowenMob={setIsMenuShowenMob}
                  />
                )}
              </div>
            </div>
            <ul
              className="nav-auth ml-auto"
              style={{
                alignItems: "center",
                position: "relative",
                alignContent: "center",
              }}
            >
              {token ? (
                <>
                  {!userData && (
                    <p
                      style={{
                        position: "absolute",
                        right: -120,
                        margin: 0,
                        padding: 0,
                      }}
                    >
                      <span
                        style={{ marginLeft: 5 }}
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      يرجي الانتظار...
                    </p>
                  )}
                  {userData && (
                    <>
                      {!veriedEmail && (
                        <li className="right-butts-icon">
                          <Tooltip
                            placement="bottom"
                            title="حسابك غير مفعل يرجى التحقق من بريدك الإلكتروني انها وصلك رمز تأكيد."
                          >
                            <a
                              href="/email/verification"
                              style={{
                                display: "flex",
                                alignContent: "center",
                                alignItems: "center",
                                justifyContent: "center",
                                width: 30,
                                height: 30,
                                backgroundColor: "orange",
                                color: "#fff",
                                borderRadius: "50%",
                              }}
                            >
                              <i
                                style={{
                                  color: "#fff",
                                  fontSize: 15,
                                }}
                                className="material-icons material-icons-outlined"
                              >
                                warning_amber
                              </i>
                            </a>
                          </Tooltip>
                        </li>
                      )}
                      {veriedEmail && (
                        <li
                          className="hr-divider "
                          style={{
                            position: "relative",
                            height: 40,
                            width: 2,
                            backgroundColor: "#f2f2f2",
                          }}
                        ></li>
                      )}
                      {veriedEmail && (
                        <li className="right-butts-icon">
                          <Tooltip placement="bottom" title="سلة المشتريات">
                            <Link href="/cart">
                              <a>
                                <Badge
                                  count={userData && userData.cart_items_count}
                                  offset={[2, -1]}
                                >
                                  <MdOutlineShoppingCart
                                    style={{
                                      fontSize: size > 450 ? 22 : 15,
                                      color: "#666",
                                    }}
                                  />
                                </Badge>
                              </a>
                            </Link>
                          </Tooltip>
                        </li>
                      )}
                      {veriedEmail && (
                        <li className="right-butts-icon">
                          <Tooltip placement="bottom" title="صندوق الرسائل">
                            <Link href="/conversations">
                              <a>
                                <Badge count={countMsg} offset={[2, -1]}>
                                  <MdOutlineMailOutline
                                    style={{
                                      fontSize: size > 450 ? 22 : 16,
                                      color: "#666",
                                    }}
                                  />
                                </Badge>
                              </a>
                            </Link>
                          </Tooltip>
                        </li>
                      )}
                      <li className="right-butts-icon">
                        <Tooltip placement="bottom" title="الإشعارات">
                          <Link href="/notifications">
                            <a
                              className="d-flex align-items-center justify-content-center"
                              style={{
                                marginLeft: size > 450 ? 7 : 6,
                              }}
                            >
                              <Badge
                                count={
                                  userData &&
                                  userData.unread_notifications_count
                                }
                                offset={[2, -1]}
                              >
                                <MdNotificationsNone
                                  style={{
                                    fontSize: size > 450 ? 22 : 17,
                                    color: "#666",
                                  }}
                                />
                              </Badge>
                            </a>
                          </Link>
                        </Tooltip>
                      </li>
                      <li className="login-user">
                        <span
                          ref={userList}
                          className="d-flex align-items-center justify-content-center"
                          onClick={() => {
                            setVisible(() => !visible);
                          }}
                        >
                          <Dropdown
                            overlay={AccountList}
                            placement="bottomLeft"
                            visible={visible}
                          >
                            <ImageLogo
                              loader={myLoader}
                              src={userData.user_details.profile.avatar_path}
                              quality={60}
                              width={32}
                              height={32}
                              alt={
                                userData &&
                                userData.user_details.profile.full_name
                              }
                              placeholder="blur"
                              blurDataURL="/avatar2.jpg"
                            />
                          </Dropdown>
                        </span>
                      </li>
                    </>
                  )}
                </>
              ) : (
                <>
                  <li
                    className="hr-divider "
                    style={{
                      position: "relative",
                      height: 40,
                      width: 2,
                      backgroundColor: "#f2f2f2",
                    }}
                  ></li>
                  <li className="login-nav-item">
                    <Link href="/login">
                      {size > 350 ? (
                        <a className=" flex-center">تسجيل الدخول</a>
                      ) : (
                        <FaSignInAlt
                          style={{
                            border: "1px solid rgba(0,0,0,0.2)",
                            width: 32,
                            height: 32,
                            padding: 5,
                            color: "gray",
                            marginLeft: 8,
                            cursor: "pointer",

                            borderRadius: 5,
                          }}
                        />
                      )}
                    </Link>
                  </li>
                  <li className="register-nav-item d-flex align-items-center">
                    <Link href="/register">
                      <a className="btn butt-primary flex-center">
                        {size > 350 ? (
                          <>
                            {" "}
                            <i className="material-icons material-icons-outlined">
                              person_add_alt
                            </i>
                            التسجيل
                          </>
                        ) : (
                          <FaUserPlus
                            style={{
                              color: "white   ",
                              fontSize: 17,
                              cursor: "pointer",
                            }}
                          />
                        )}
                      </a>
                    </Link>
                  </li>
                </>
              )}
              <li
                className="hr-divider except"
                style={{
                  position: "relative",
                  height: 40,
                  width: 2,
                  backgroundColor: "#f2f2f2",
                }}
              ></li>
              <Dropdown
                overlay={langsList}
                placement="bottomLeft"
                visible={isShowenLangs}
              >
                <li
                  ref={langList}
                  className="register-nav-item select-langs-inner"
                  onClick={() => setIsShowenLangs(!isShowenLangs)}
                >
                  <button
                    style={{
                      backgroundColor: "transparent",
                      color: "#707070",
                      borderWidth: 0,
                      outline: "none",
                      display: "flex",
                      alignItems: "center",
                    }}
                    className="select-langs"
                  >
                    <FaGlobe
                      style={{ marginLeft: 3, fontSize: 14, color: "#707070" }}
                    />{" "}
                    {size > 400 ? (size > 1050 ? "العربية" : "Ar") : ""}
                    <i className="material-icons material-icons-outlined">
                      expand_more
                    </i>
                  </button>
                </li>
              </Dropdown>
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
}
Navbar.propTypes = {
  setIsDarkenHandle: PropTypes.func,
  logout: PropTypes.func,
  isDarken: PropTypes.bool,
  userData: PropTypes.object,
};

export default Navbar;
