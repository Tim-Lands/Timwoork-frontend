import PropTypes from "prop-types";
import { Menu, Dropdown, Badge, Tooltip, notification } from "antd";
import { ReactElement, useEffect, useState } from "react";
import Menus from "./Menus";
import API from "../../config";
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
import { motion } from "framer-motion";

function Navbar(): ReactElement {
  const [visible, setVisible] = useState(false);
  let token = Cookies.get("token");
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
  const channelChat = `presence-receiver.${
    userInfo && userInfo.user_details.id
  }`;
  const channel = pusher.subscribe(channelChat);

  const channelNotification = `presence-notify.${
    userInfo && userInfo.user_details.id
  }`;
  const channelNoty = pusher.subscribe(channelNotification);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setVisible(false);
    });
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
        console.log(data);
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
    //setIsMenuShowen(!isMenuShowen)
    setIsMenuShowenMob(!isMenuShowenMob);
  };
  /*const DarkIconvariants = {
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.41 },
        },
        hidden: {
            opacity: 0,
            y: 80,
            transition: { duration: 0.41 },
        },
        
    }
    const [darkLoading, setSarkLoading] = useState(false)
    async function darkModeToggle() {
        setSarkLoading(true)
        try {
            const res = await API.post("api/mode", null, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            // Authentication was successful.
            if (res.status === 200) {
                router.reload()
                setSarkLoading(false)
            }
        } catch (error: any) {
            message.error('حدث خطأ غير متوقع')
            setSarkLoading(false)
        }
    }*/
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
      //console.log(error);
    }
  };
  const AccountList = (
    <Menu>
      <Menu.Item key="0">
        <Link href="/user/profile">
          <a>
            <span className="material-icons material-icons-outlined">
              account_circle
            </span>
            {userData && userData.user_details.profile.full_name == ""
              ? "بدون اسم"
              : userData && userData.user_details.profile.full_name}
          </a>
        </Link>
      </Menu.Item>
      {veriedEmail && userData && userData.user_details.profile.is_seller == 1 && (
        <Menu.Item key="7">
          <Link href="/add-new">
            <a>
              <span className="material-icons material-icons-outlined">
                add_circle_outline
              </span>
              إضافة خدمة جديدة
            </a>
          </Link>
        </Menu.Item>
      )}
      {veriedEmail && (
        <Menu.Item key="70">
          <Link href="/mywallet">
            <a>
              <span className="material-icons material-icons-outlined">
                account_balance_wallet
              </span>
              محفظتي
            </a>
          </Link>
        </Menu.Item>
      )}

      {veriedEmail && userData && userData.user_details.profile.is_seller == 1 && (
        <Menu.Item key="0">
          <Link href="/myproducts">
            <a>
              <span className="material-icons material-icons-outlined">
                inventory_2
              </span>
              خدماتي
            </a>
          </Link>
        </Menu.Item>
      )}
      {veriedEmail && (
        <Menu.Item key="1">
          <Link href="/mypurchases">
            <a>
              <span className="material-icons material-icons-outlined">
                shopping_cart
              </span>
              مشترياتي
            </a>
          </Link>
        </Menu.Item>
      )}
      {veriedEmail && userData && userData.user_details.profile.is_seller == 1 && (
        <Menu.Item key="43">
          <Link href="/mysales">
            <a>
              <span className="material-icons material-icons-outlined">
                shop_2
              </span>
              مبيعاتي
            </a>
          </Link>
        </Menu.Item>
      )}
      <Menu.Item key="14">
        <Link href="/user/personalInformations">
          <a>
            <span className="material-icons material-icons-outlined">
              settings
            </span>
            الإعدادات
          </a>
        </Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3">
        <a onClick={logout}>
          <span className="material-icons material-icons-outlined">logout</span>
          تسجيل الخروج
        </a>
      </Menu.Item>
    </Menu>
  );
  const myLoader = () => {
    return `${userData && userData.user_details.profile.avatar_path}`;
  };
  const darkMode = userData && userData.user_details.profile.dark_mode;
  return (
    <>
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
            style={{ maxWidth: "1300px", width: "100%" }}
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
                <div className="logo-nav me-auto" style={{ display: "flex" }}>
                  <Link href="/">
                    <a>
                      <ImageLogo src={logoIMG} alt="Timwoork" />
                    </a>
                  </Link>
                </div>
                <Menus darkMode={darkMode} />
                {isMenuShowenMob && <MenusMobile darkMode={darkMode} />}
              </div>
            </div>
            <ul
              className="nav-auth ml-auto"
              style={{
                alignItems: "center",
                alignContent: "center",
              }}
            >
              {token ? (
                <>
                  {!userData && (
                    <li
                      className="nav-loading"
                      style={{
                        display: "flex",
                        alignContent: "center",
                        alignItems: "center",
                        margin: 0,
                      }}
                    >
                      <p
                        className="loading-text"
                        style={{
                          fontSize: 13,
                          fontWeight: "bold",
                          color: !darkMode ? "#666" : "#ddd",
                          margin: 0,
                        }}
                      >
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>{" "}
                        يرجى الإنتظار...
                      </p>
                    </li>
                  )}
                  {userData && (
                    <>
                      {/*<li
                                            className="right-butts-icon"
                                            style={{
                                                opacity: (darkLoading ? 0.5 : 1),
                                                display: 'flex',
                                                alignItems: 'center',
                                                alignContent: 'center',
                                                marginTop: 4
                                            }}
                                        >
                                            <Tooltip placement="bottom" title='الوضع العادي والوضع الليلي'>
                                                <motion.a onClick={darkModeToggle} whileTap={{ scale: 0.9 }} style={{
                                                    display: 'flex',
                                                    alignContent: 'center',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    alignSelf: 'center',
                                                    color: !darkMode ? '#777' : '#ddd',
                                                    height: 40,
                                                    width: 40,
                                                }}>
                                                    <Badge count={0} offset={[2, -1]}>
                                                        {userData.user_details.profile.dark_mode == 1 ?
                                                            <motion.i animate='visible' initial='hidden' variants={DarkIconvariants} className="material-icons material-icons-outlined">light_mode</motion.i>
                                                            :
                                                            <motion.i animate='visible' initial='hidden' variants={DarkIconvariants} className="material-icons material-icons-outlined">dark_mode</motion.i>
                                                        }
                                                    </Badge>
                                                </motion.a>
                                            </Tooltip>
                                        </li>*/}
                      {!veriedEmail && (
                        <li
                          className="right-butts-icon"
                          style={{ marginInline: 5 }}
                        >
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
                          className="right-butts-icon"
                          style={{ marginInline: 5 }}
                        >
                          <Tooltip placement="bottom" title="سلة المشتريات">
                            <Link href="/cart">
                              <a>
                                <Badge
                                  count={userData && userData.cart_items_count}
                                  offset={[2, -1]}
                                >
                                  <i className="material-icons material-icons-outlined">
                                    shopping_cart
                                  </i>
                                </Badge>
                              </a>
                            </Link>
                          </Tooltip>
                        </li>
                      )}
                      {veriedEmail && (
                        <li
                          className="right-butts-icon"
                          style={{ marginInline: 5 }}
                        >
                          <Tooltip placement="bottom" title="صندوق الرسائل">
                            <Link href="/conversations">
                              <a>
                                <Badge count={countMsg} offset={[2, -1]}>
                                  <i className="material-icons material-icons-outlined">
                                    email
                                  </i>
                                </Badge>
                              </a>
                            </Link>
                          </Tooltip>
                        </li>
                      )}
                      <li
                        className="right-butts-icon"
                        style={{ marginInline: 5 }}
                      >
                        <Tooltip placement="bottom" title="الإشعارات">
                          <Link href="/notifications">
                            <a>
                              <Badge
                                count={
                                  userData &&
                                  userData.unread_notifications_count
                                }
                                offset={[2, -1]}
                              >
                                <i className="material-icons material-icons-outlined">
                                  notifications
                                </i>
                              </Badge>
                            </a>
                          </Link>
                        </Tooltip>
                      </li>
                      <li className="login-user" style={{ marginInline: 5 }}>
                        <span
                          onClick={() => {
                            setVisible(() => !visible);
                          }}
                        >
                          <Dropdown
                            overlay={AccountList}
                            // trigger={["click"]}

                            visible={visible}
                          >
                            <motion.span
                              style={{ display: "inline-block" }}
                              whileHover={{
                                scale: 1.07,
                              }}
                              whileTap={{
                                scale: 1,
                              }}
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
                            </motion.span>
                          </Dropdown>
                        </span>
                      </li>
                    </>
                  )}
                </>
              ) : (
                <>
                  <li className="login-nav-item">
                    <Link href="/login">
                      <a
                        className="btn butt-xs flex-center"
                        style={{ width: 120 }}
                      >
                        تسجيل الدخول
                      </a>
                    </Link>
                  </li>
                  <li className="register-nav-item" style={{ padding: 7 }}>
                    <Link href="/register">
                      <a className="btn butt-sm butt-primary flex-center">
                        <i className="material-icons material-icons-outlined">
                          person_add_alt
                        </i>{" "}
                        التسجيل
                      </a>
                    </Link>
                  </li>
                </>
              )}
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
