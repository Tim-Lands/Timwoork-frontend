import Link from "next/link";
import React, { useEffect, useState, useContext, useRef } from "react";
import { useOutsideAlerter } from "../../useOutsideAlerter";
import { useOutSide } from "../../useOutSide";
import Community from "./Community";
// import LoginForm from "@/components/NewIndex/LoginForm";
import { FaSearch } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Subnavbar from "./Subnavbar";
import Notifications from "../DropdowModal/Notifications";
import PropTypes from "prop-types";
import Messages from "../DropdowModal/Messages";
// import Language from "../DropdowModal/Language";
import Image from "next/image";
import ProfileMenu from "../DropdowModal/ProfileMenu";
import { PusherContext } from "../../../contexts/pusherContext";
import API from "../../../config";
import { Badge, notification } from "antd";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import LastSeen from "@/components/LastSeen";
import MobileMenu from "./mobileMenus";
import router from "next/router";
import { LanguagesActions } from "../../../store/languages/languagesActions";

import {
  MessageOutlined,
  InfoCircleOutlined,
  CloseCircleOutlined,
  BellOutlined,
} from "@ant-design/icons";
import { darken } from "@mui/material";
import { PRIMARY } from "../../../styles/variables";
function Navbar({ dark = false, MoreNav = <></> }) {
  const cartLength = useAppSelector((state) => state.cart.itemsLength);
  const user = useAppSelector((state) => state.user);
  const profile = useAppSelector((state) => state.profile);
  const { getAll, language } = useAppSelector((state) => state.languages);
  const dispatch = useAppDispatch();

  const [isLanguageVisible, setIsLanguageVisible] = useState(false);
  const [showCommunityMenu, setShowCommunityMenu] = useState(false);
  const [showNotificationsMenu, setShowNotificationsMenu] = useState(false);
  const [showMessagesMenu, setShowMessagesMenu] = useState(false);
  const [isShowProfileMenu, setIsShowProfileMenu] = useState(false);

  const [visible, setVisible] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [postsList, setPostsList]: any = useState([]);
  const [messages, setMessages] = useState([]);

  const [sentinel, setSentinel] = useState({ mount: true });
  const [query, setQuery] = useState("");
  const [chatPusher, notificationPusher] = useContext(PusherContext);

  const handleScroll = () => {
    window?.pageYOffset === 0 ? setVisible(true) : setVisible(false);
    setShowMessagesMenu(false);
    setShowNotificationsMenu(false);
    setShowCommunityMenu(false);
    setIsShowProfileMenu(false);
    setIsLanguageVisible(false);
  };
  const languageRef = useRef(null);
  const messagesRef = useRef(null);
  const notificationsRef = useRef(null);
  const profileRef = useRef(null);
  const profileBtn = useRef(null);
  const communityRef = useRef(null);
  const messagesBtn = useRef(null);
  const notificationsBtn = useRef(null);
  const communityBtn = useRef(null);
  const hideMessages = () => {
    setShowMessagesMenu(false);
  };
  const hideNotifications = () => {
    setShowNotificationsMenu(false);
  };
  const hideCommunity = () => {
    setShowCommunityMenu(false);
  };
  const hideProfile = () => {
    setIsShowProfileMenu(false);
  };
  const hideLanguage = () => {
    setIsLanguageVisible(false);
  };

  useOutsideAlerter(messagesRef, hideMessages, messagesBtn);

  useOutsideAlerter(notificationsRef, hideNotifications, notificationsBtn);
  useOutSide(languageRef, hideLanguage);
  useOutsideAlerter(communityRef, hideCommunity, communityBtn);
  useOutsideAlerter(profileRef, hideProfile, profileBtn);

  useEffect(() => {
    API.get(`api/categories`)
      .then((res) => {
        setPostsList(res.data.data);
      })
      .catch(() => {});
    if (user.token) fetchData();
  }, [user.token]);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);
  useEffect(() => {
    if (user.isLogged) {
      chatPusher?.bind("message.sent", (data) => {
        const message = {
          members: [data?.message?.user],
          id: data?.message?.conversation_id,
          ...data?.message?.conversation,
        };
        setMessages([
          message,
          ...messages.filter((msg) => msg.id != data?.message?.conversation_id),
        ]);
        const effect = new Audio("/effect.mp3");
        effect.play();
        if (data.message.type == 0) {
          notification.open({
            message: getAll("You_havea"),
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
                    <strong>{getAll("From")}</strong>
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
            icon: <MessageOutlined style={{ color: "#108ee9" }} />,
            placement: "bottomLeft",
          });
        }
        if (data.message.type == 1) {
          notification["info"]({
            message: getAll("You_have_a_new"),
            description: (
              <div className="msg-notification">
                <p className="meta">
                  <LastSeen date={data.message.created_at} />
                </p>
                <h4 className="title">{data.message.message}</h4>
                <p className="text">
                  <small className="ml-1">
                    <strong>{getAll("From")}</strong>
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
            message: getAll("You_have_a_cancellation"),
            description: (
              <div className="msg-notification">
                <p className="meta">
                  <LastSeen date={data.message.created_at} />
                </p>
                <h4 className="title">{data.message.message}</h4>
                <p className="text">
                  <small className="ml-1">
                    <strong>{getAll("From")}</strong>
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
      notificationPusher?.bind("notification.sent", (data) => {
        console.log(data);
        const today = new Date();
        const date = `${today.getFullYear()}_${
          today.getMonth() + 1
        }-${today.getDate()}`;
        setNotifications([{ created_at: date, data }, ...notifications]);
        const NotifyEffect = new Audio("/bell.mp3");
        NotifyEffect.play();
        notification.open({
          message: getAll("You_have_a_new_alert"),
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
                  <strong>{getAll("From")}</strong>
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
    }
  }, [notificationPusher]);
  const fetchData = async () => {
    try {
      const notificationsData = await API.get("api/notifications?page=1", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const messagesData = await API.get("api/conversations", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      setMessages(messagesData?.data?.data?.data);
      setNotifications(notificationsData?.data?.data?.data);
      setSentinel({ ...sentinel });
    } catch {
      () => {};
    }
  };
  const LanguageMenu = () => {
    return (
      <ul
        className={`languageMenuDropDown ${
          isLanguageVisible ? " showLanguage" : ""
        } ${language === "ar" ? "ar" : "en"}`}
      >
        <li
          className={language === "ar" ? "selectedLanguage" : ""}
          onClick={() => {
            dispatch(LanguagesActions.setLanguage("ar"));
            hideLanguage();
          }}
        >
          العربية
        </li>
        <li
          className={language === "en" ? "selectedLanguage" : ""}
          onClick={() => {
            hideLanguage();
            dispatch(LanguagesActions.setLanguage("en"));
          }}
        >
          English
        </li>
        <li
          className={language === "fr" ? "selectedLanguage" : ""}
          onClick={() => {
            hideLanguage();
            dispatch(LanguagesActions.setLanguage("fr"));
          }}
        >
          Français
        </li>
      </ul>
    );
  };
  async function markAllRead() {
    try {
      // const res =
      await API.post(
        `api/notifications/markAllAsRead`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
    } catch (error) {
      () => {};
    }
  }
  return (
    <nav
      className="app-new-navbar-cont"
      style={{
        backgroundColor: visible
          ? !dark
            ? darken(PRIMARY, 0.4)
            : "transparent"
          : "white",
      }}
    >
      {/* {isLanguageVisible && (
        <Language setIsConfirmText={setIsLanguageVisible} />
      )}  */}
      {/* {isShowLoginForm && <LoginForm setIsConfirmText={setIsShowLoginForm} />} */}
      <div
        className={
          `app-new-navbar ${dark ? "" : "dr"}` +
          (!visible ? " is-fixed-nav" : "")
        }
      >
        <MobileMenu postsList={postsList} />
        <div className="app-new-logo d-flex">
          {!visible ? (
            <Link href="/">
              <img src="/logo6.png" alt="" style={{ cursor: "pointer" }} />
            </Link>
          ) : (
            <Link href="/">
              <img src="/logo7.png" alt="" style={{ cursor: "pointer" }} />
            </Link>
          )}
          {!visible && (
            <div className="new-search-bar">
              <div className="new-search-bar-form">
                <span className="new-searchbar">
                  <FaSearch />
                </span>
                <input
                  type="text"
                  onKeyDown={(e) =>
                    e.keyCode === 13 && router.push(`/products?query=${query}`)
                  }
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={getAll("Search_in_Timwoork")}
                  className="form-serach-nav"
                />
                <button
                  className="btn butt-xs butt-primary2"
                  onClick={() => router.push(`/products?query=${query}`)}
                >
                  {getAll("Search")}
                </button>
              </div>
            </div>
          )}
        </div>
        <ul className="app-new-nav nav">
          <li className="link-item" ref={communityBtn}>
            <a onClick={() => setShowCommunityMenu(!showCommunityMenu)}>
              <span className="material-icons material-icons-outlined">
                backup_table
              </span>{" "}
              {getAll("Timwoork_sections")}
              <span className="material-icons material-icons-outlined expand-more">
                expand_more
              </span>
            </a>
            {showCommunityMenu && <Community refs={communityRef} />}
          </li>
          <li className="link-item">
            <Link href={"/products"}>
              <a>
                <span className="material-icons material-icons-outlined">
                  shopping_cart
                </span>{" "}
                {getAll("Browsing_services")}
              </a>
            </Link>
          </li>
          {!user.loading ? (
            user.isLogged ? (
              <>
                <li className="circular-newitem avatar" ref={profileBtn}>
                  <a
                    className="link-circular-button"
                    onClick={() => {
                      setIsShowProfileMenu(!isShowProfileMenu);
                    }}
                  >
                    <Image
                      src={profile.avatar_path}
                      width={31}
                      height={31}
                      alt={""}
                      className="link-circular-button"
                    />
                  </a>
                  {isShowProfileMenu && (
                    <ProfileMenu
                      refs={profileRef}
                      setIsShowProfileMenu={setIsShowProfileMenu}
                    />
                  )}
                </li>
                <li className="circular-newitem">
                  <Badge
                    count={cartLength}
                    style={{ fontSize: 10, zIndex: 1000 }}
                    size="small"
                    offset={language === "ar" ? [5, 5] : [-6, 5]}
                  >
                    <Link href={"/cart"}>
                      <a className="link-circular-button">
                        <span className="material-icons material-icons-outlined">
                          shopping_cart
                        </span>
                      </a>
                    </Link>
                  </Badge>
                </li>
                {profile.is_completed == 1 && (
                  <>
                    <li className="circular-newitem" ref={messagesBtn}>
                      <Badge
                        // count={userInfo?.unread_messages_count}
                        count={0}
                        offset={language === "ar" ? [5, 5] : [-6, 5]}
                        style={{ fontSize: 10, zIndex: 1000 }}
                        size="small"
                      >
                        <a
                          className="link-circular-button"
                          onClick={() => setShowMessagesMenu(!showMessagesMenu)}
                        >
                          <span className="material-icons material-icons-outlined">
                            mail
                          </span>
                        </a>
                      </Badge>
                      {showMessagesMenu && (
                        <Messages
                          refs={messagesRef}
                          messages={messages}
                          setShowMessagesMenu={setShowMessagesMenu}
                        />
                      )}
                    </li>
                    <li
                      className="circular-newitem"
                      ref={notificationsBtn}
                      onClick={() => {
                        if (!showNotificationsMenu) markAllRead();
                      }}
                    >
                      <Badge
                        // count={userInfo?.unread_notifications_count}
                        count={0}
                        offset={language === "ar" ? [5, 5] : [-6, 5]}
                        style={{ fontSize: 10, zIndex: 1000 }}
                        size="small"
                      >
                        <a
                          className="link-circular-button"
                          onClick={() =>
                            setShowNotificationsMenu(!showNotificationsMenu)
                          }
                        >
                          <span className="material-icons material-icons-outlined">
                            notifications
                          </span>
                        </a>
                      </Badge>
                      {showNotificationsMenu && (
                        <Notifications
                          notifications={notifications}
                          setShowNotificationsMenu={setShowNotificationsMenu}
                          refs={notificationsRef}
                        />
                      )}
                    </li>
                  </>
                )}
              </>
            ) : (
              <>
                <li className="authBtn">
                  <Link href={"/register"}>
                    <a
                      style={{ fontWeight: "bold" }}
                      className="btn butt-xs butt-primary2 flex-center"
                    >
                      <span className="material-icons material-icons-outlined">
                        person_add
                      </span>{" "}
                      {getAll("Sign_up")}
                    </a>
                  </Link>
                </li>
                <li
                  className="mobAuthBtn"
                  // onClick={() => setIsShowLoginForm(true)}
                >
                  <Link href="login">
                    <button>{getAll("Login")}</button>
                  </Link>
                </li>
                <li className="authBtn">
                  <Link href="/login">
                    <a
                      style={{ fontWeight: "bold" }}
                      className={`btn butt-xs flex-center ${
                        !visible ? " butt-primary2-out" : " butt-white-out"
                      }`}
                      // onClick={() => setIsShowLoginForm(true)}
                    >
                      <span className="material-icons material-icons-outlined">
                        person
                      </span>{" "}
                      {getAll("Log_in")}
                    </a>
                  </Link>
                </li>
              </>
            )
          ) : (
            <li className="link-item">
              <a>
                <AiOutlineLoading3Quarters className="rotate_load fs-4" />
              </a>
            </li>
          )}

          <li className="circular-newitem" ref={languageRef}>
            <a
              className="link-circular-button "
              onClick={() => setIsLanguageVisible(!isLanguageVisible)}
            >
              <span className="material-icons material-icons-outlined">
                language
              </span>
            </a>
            {isLanguageVisible ? <LanguageMenu /> : <></>}
          </li>
        </ul>
      </div>
      {!visible && MoreNav}
      {!visible && <Subnavbar visible={visible} postsList={postsList} />}
    </nav>
  );
}

Navbar.propTypes = {
  dark: PropTypes.string,
  MoreNav: PropTypes.any,
};
export default Navbar;
