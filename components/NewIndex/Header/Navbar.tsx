import Link from "next/link";
import React, { useEffect, useState, useContext } from "react";
import useSWR from "swr";
import Community from "./Community";
import LoginForm from "@/components/NewIndex/LoginForm";
import { FaSearch } from "react-icons/fa";
import Subnavbar from "./Subnavbar";
import Cookies from "js-cookie";
import Notifications from "../DropdowModal/Notifications";
import PropTypes from "prop-types";
import Messages from "../DropdowModal/Messages";
import Language from "../DropdowModal/Language";
import Image from "next/image";
import ProfileMenu from "../DropdowModal/ProfileMenu";
import { PusherContext } from "../../../contexts/pusherContext";
import API from "../../../config";
import { notification } from "antd";
import LastSeen from "@/components/LastSeen";
import router from "next/router";

import {
  MessageOutlined,
  InfoCircleOutlined,
  CloseCircleOutlined,
  BellOutlined,
} from "@ant-design/icons";
function Navbar({ dark = false }) {
  let token = Cookies.get("token");
  if (!token && typeof window !== "undefined")
    token = localStorage.getItem("token");
  const [isLanguageVisible, setIsLanguageVisible] = useState(false);
  const [showCommunityMenu, setShowCommunityMenu] = useState(false);
  const [showNotificationsMenu, setShowNotificationsMenu] = useState(false);
  const [showMessagesMenu, setShowMessagesMenu] = useState(false);
  const [isShowProfileMenu, setIsShowProfileMenu] = useState(false);
  const [isShowLoginForm, setIsShowLoginForm] = useState(false);
  // const [prevScrollpos, setrtPrevScrollpos] = useState((typeof window === "undefined") ?? window.pageYOffset)
  const [visible, setVisible] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [postsList, setPostsList]: any = useState([]);
  const [messages, setMessages] = useState([]);

  const [sentinel, setSentinel] = useState({ mount: true });
  const [query, setQuery] = useState("");
  const [chatPusher, notificationPusher] = useContext(PusherContext);
  const { data: userInfo }: any = useSWR("api/me");
  const handleScroll = () => {
    window?.pageYOffset === 0 ? setVisible(true) : setVisible(false);
  };
  useEffect(() => {
    API.get(`api/categories`)
      .then((res) => {
        setPostsList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    if (token) fetchData();
  }, [token]);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    if (userInfo) {
      chatPusher.bind("message.sent", (data) => {
        console.log(data);
        console.log(messages);
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

      notificationPusher.bind("notification.sent", (data) => {
        console.log(data);
        const today = new Date();
        const date = `${today.getFullYear()}_${
          today.getMonth() + 1
        }-${today.getDate()}`;
        console.log(date);
        setNotifications([{ created_at: date, data }, ...notifications]);
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
    }
  }, [notificationPusher, userInfo, sentinel]);
  const fetchData = async () => {
    try {
      const notificationsData = await API.get("api/notifications?page=4", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const messagesData = await API.get("api/conversations", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessages(messagesData?.data?.data?.data);
      setNotifications(notificationsData?.data?.data?.data);
      setSentinel({ ...sentinel });
    } catch {
      () => {};
    }
  };

  //   console.log(messages)
  //   return (
  //       <>
  //           {isLanguageVisible && <Language setIsConfirmText={setIsLanguageVisible} />}
  //           {isShowLoginForm && <LoginForm setIsConfirmText={setIsShowLoginForm} />}
  //           <nav className={'app-new-navbar ' + (!visible ? ' is-fixed-nav' : '')}>
  //               <div className="app-new-logo d-flex">
  //                   {!visible ? <img src="/logo6.png" alt="" /> : <img src="/logo7.png" alt="" />}
  //                   {!visible &&
  //                       <div className="new-search-bar">
  //                           <div className="new-search-bar-form">
  //                               <span className="new-searchbar">
  //                                   <FaSearch />
  //                               </span>
  //                               <input type="text" onKeyDown={(e) =>
  //                                   e.keyCode === 13 &&
  //                                   router.push(`/products?query=${query}`)} onChange={e => setQuery(e.target.value)} placeholder='البحث في الموقع...' className='form-serach-nav' />
  //                               <button className='btn butt-xs butt-primary2' onClick={() => router.push(`/products?query=${query}`)}>البحث</button>
  //                           </div>
  //                       </div>
  //                   }
  //               </div>
  //               <ul className="app-new-nav nav">
  //                   <li className='link-item'>
  //                       <Link href={'/products'}>
  //                           <a>
  //                               <span className="material-icons material-icons-outlined">shopping_cart</span> تصفح الخدمات
  //                           </a>
  //                       </Link>
  //                   </li>
  //                   <li className='link-item'>
  //                       <a onClick={() => setShowCommunityMenu(!showCommunityMenu)}>
  //                           <span className="material-icons material-icons-outlined">backup_table</span> أقسام تيم وورك <span className="material-icons material-icons-outlined expand-more">expand_more</span>
  //                       </a>
  //                       {showCommunityMenu && <Community />}
  //                   </li>
  //                   {userInfo ? <>

  //     setMessages(messagesData?.data?.data?.data);
  //     setNotifications(notificationsData?.data?.data?.data);
  //     setSentinel({ ...sentinel });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  return (
    <nav className="app-new-navbar-cont">
      {isLanguageVisible && (
        <Language setIsConfirmText={setIsLanguageVisible} />
      )}
      {isShowLoginForm && <LoginForm setIsConfirmText={setIsShowLoginForm} />}
      <div
        className={
          `app-new-navbar ${dark ? "" : "dr"}` +
          (!visible ? " is-fixed-nav" : "")
        }
      >
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
                  placeholder="البحث في الموقع..."
                  className="form-serach-nav"
                />
                <button
                  className="btn butt-xs butt-primary2"
                  onClick={() => router.push(`/products?query=${query}`)}
                >
                  البحث
                </button>
              </div>
            </div>
          )}
        </div>
        <ul className="app-new-nav nav">
          <li className="link-item">
            <Link href={"/products"}>
              <a>
                <span className="material-icons material-icons-outlined">
                  shopping_cart
                </span>{" "}
                تصفح الخدمات
              </a>
            </Link>
          </li>
          <li className="link-item">
            <a onClick={() => setShowCommunityMenu(!showCommunityMenu)}>
              <span className="material-icons material-icons-outlined">
                backup_table
              </span>{" "}
              مجتمع تيم وورك{" "}
              <span className="material-icons material-icons-outlined expand-more">
                expand_more
              </span>
            </a>
            {showCommunityMenu && <Community />}
          </li>
          {userInfo ? (
            <>
              <li className="circular-newitem">
                <a
                  className="link-circular-button"
                  onClick={() => setIsShowProfileMenu(!isShowProfileMenu)}
                >
                  <Image
                    src={userInfo?.user_details?.profile?.avatar_path}
                    width={31}
                    height={31}
                    alt={""}
                    className="link-circular-button"
                  />
                </a>
                {isShowProfileMenu && (
                  <ProfileMenu user_details={userInfo?.user_details} />
                )}
              </li>
              <li className="circular-newitem">
                <Link href={"/cart"}>
                  <a className="link-circular-button">
                    <span className="material-icons material-icons-outlined">
                      shopping_cart
                    </span>
                  </a>
                </Link>
              </li>
              <li className="circular-newitem">
                <a
                  className="link-circular-button"
                  onClick={() => setShowMessagesMenu(!showMessagesMenu)}
                >
                  <span className="material-icons material-icons-outlined">
                    mail
                  </span>
                </a>
                {showMessagesMenu && <Messages messages={messages} />}
              </li>
              <li className="circular-newitem">
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
                {showNotificationsMenu && (
                  <Notifications notifications={notifications} />
                )}
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href={"/register"}>
                  <a className="btn butt-xs butt-primary2 flex-center">
                    <span className="material-icons material-icons-outlined">
                      person_add
                    </span>{" "}
                    التسجيل
                  </a>
                </Link>
              </li>
              <li>
                <a
                  className={`btn butt-xs flex-center ${
                    !visible ? " butt-primary2-out" : " butt-white-out"
                  }`}
                  onClick={() => setIsShowLoginForm(true)}
                >
                  <span className="material-icons material-icons-outlined">
                    person
                  </span>{" "}
                  تسجيل الدخول
                </a>
              </li>
            </>
          )}

          <li className="circular-newitem">
            <a
              className="link-circular-button"
              onClick={() => setIsLanguageVisible(true)}
            >
              <span className="material-icons material-icons-outlined">
                language
              </span>
            </a>
          </li>
        </ul>
      </div>
      {!visible && <Subnavbar visible={visible} postsList={postsList} />}
    </nav>
  );
}
Navbar.propTypes = {
  dark: PropTypes.string,
};
export default Navbar;
