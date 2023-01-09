import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import { useOutsideAlerter } from "../useOutsideAlerter";
import { useOutSide } from "../useOutSide";
import Community from "./Community";
import { BiCartAlt } from "react-icons/bi";
import { BsPersonPlus } from "react-icons/bs";
import {
  MdOutlineBackupTable,
  MdPersonOutline,
  MdKeyboardArrowDown,
  MdLanguage,
} from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Subnavbar from "./Subnavbar";
import Notifications from "../DropdowModal/Notifications";
import PropTypes from "prop-types";
import Messages from "../DropdowModal/Messages";
import Image from "next/image";
import ProfileMenu from "../DropdowModal/ProfileMenu";
import { Badge } from "antd";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import MobileMenu from "./mobileMenus";
import router from "next/router";
import { LanguagesActions } from "../../store/languages/languagesActions";

import { darken } from "@mui/material";
import { PRIMARY } from "../../styles/variables";
import { NotificationsActions } from "@/store/notifications/notificationsActions";
function Navbar({ dark = false, MoreNav = <></> }) {
  const cartLength = useAppSelector((state) => state.cart.itemsLength);
  const {
    languages: { getAll, language },
    user,
    profile,
    categories: { all: postsList },
    notifications: {
      all: { unread: notifyCount },
    },
    chat: {
      unReadConversation: { count: conversationCount },
    },
  } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const [isLanguageVisible, setIsLanguageVisible] = useState(false);
  const [showCommunityMenu, setShowCommunityMenu] = useState(false);
  const [showNotificationsMenu, setShowNotificationsMenu] = useState(false);
  const [showMessagesMenu, setShowMessagesMenu] = useState(false);
  const [isShowProfileMenu, setIsShowProfileMenu] = useState(false);

  const [visible, setVisible] = useState(true);

  const [query, setQuery] = useState("");
  // const [chatPusher, notificationPusher] = useContext(PusherContext);

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
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

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
              <MdOutlineBackupTable className="material-icons" />
              {getAll("Timwoork_sections")}
              <MdKeyboardArrowDown className="material-icons" />
            </a>
            {showCommunityMenu && <Community refs={communityRef} />}
          </li>
          <li className="link-item">
            <Link href={"/products"}>
              <a>
                <BiCartAlt className="material-icons" />
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
                      blurDataURL="/avatar2.jpg"
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
                        count={conversationCount}
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
                          setShowMessagesMenu={setShowMessagesMenu}
                        />
                      )}
                    </li>
                    <li
                      className="circular-newitem"
                      ref={notificationsBtn}
                      onClick={() => {
                        if (!showNotificationsMenu)
                          dispatch(NotificationsActions.notificationsReaded());
                      }}
                    >
                      <Badge
                        // count={userInfo?.unread_notifications_count}
                        count={notifyCount}
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
                      <BsPersonPlus className="material-icons" />
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
                      <MdPersonOutline className="material-icons" />
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
              <MdLanguage className="material-icons" />
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
  dark: PropTypes.bool,
  MoreNav: PropTypes.any,
};
export default Navbar;
