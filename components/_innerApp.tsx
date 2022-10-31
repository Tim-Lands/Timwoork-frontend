import { useEffect } from "react";
import { ConfigProvider } from "antd";
import { SWRConfig } from "swr";
import router from "next/router";
import Cookies from "js-cookie"; // import {
import { MessageOutlined, BellOutlined } from "@ant-design/icons";
import moment from "moment";
import { notification } from "antd";
import API from "../config";
import PropTypes from "prop-types";
import { UserActions } from "../store/user/UserActions";
import { ProfileActions } from "../store/profile/profileActions";
import { CategoriesActions } from "../store/categories/categoriesActions";
import { CartActions } from "../store/cart/cartActions";
import { CurrencyActions } from "@/store/currency/currencyActions";
import { LanguagesActions } from "@/store/languages/languagesActions";
import { NotificationsActions } from "@/store/notifications/notificationsActions";
import { ChatActions } from "store/chat/chatActions";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { PusherService } from "services/pusherService";
import getSpecCurrency from "../utils/currency";

const App = ({ innerApp }) => {
  const unused = "";
  const dispatch = useAppDispatch();
  const {
    user,
    languages: { language, getAll },
    currency: { my: currency, values: currencies },
    chat: { all: chats, one: singleChat },
    notifications: { all: notifications },
  } = useAppSelector((state) => state);

  let token = Cookies.get("token");
  let lang = undefined;
  if (!token && typeof window !== "undefined") {
    token = localStorage.getItem("token");
    lang = localStorage.getItem("lang");
  }
  useEffect(() => {
    dispatch(CategoriesActions.getAllCategories());
    dispatch(CategoriesActions.getTopCategories());
    dispatch(CategoriesActions.getTopMainCategories());
  }, []);
  useEffect(() => {
    if (user.token) initialize();
    else {
      dispatch(UserActions.loaded());
    }
  }, [user.token]);
  async function initialize() {
    await dispatch(UserActions.setToken(user.token));
    dispatch(UserActions.getData({}));
    dispatch(ProfileActions.getProfileData());
    dispatch(CurrencyActions.getData());
    dispatch(CurrencyActions.getAllCurrenciesValues());
    dispatch(CartActions.getCartData());
    dispatch(CategoriesActions.getProductCategories());
  }
  useEffect(() => {
    if (user.token)
      dispatch(
        NotificationsActions.getNotificationsData({
          pageNumber: notifications.pageNumber,
        })
      );
  }, [notifications.pageNumber, user.token]);
  useEffect(() => {
    if (user.token)
      dispatch(ChatActions.getChatsData({ pageNumber: chats.page_number }));
  }, [chats.page_number, user.token]);
  useEffect(() => {
    if (currencies.loaded && currency.code) {
      dispatch(
        CurrencyActions.setValue(
          getSpecCurrency(currency.code, currencies.data).value
        )
      );
    }
  }, [currencies, currency.code]);
  useEffect(() => {
    if (Cookies.get("lang") === undefined || lang === undefined)
      dispatch(LanguagesActions.setLanguageManually("ar"));
  }, [Cookies.get("lang"), lang]);
  useEffect(() => {
    if (user.id) startSocket();
  }, [user.id]);
  async function startSocket() {
    const pusher = await PusherService.Initialize(user.id);
    pusher.subscription();
    pusher.bindMessages((data) => {
      const effect = new Audio("/effect.mp3");
      effect.play();
      dispatch(ChatActions.getChatsData({ pageNumber: chats.page_number }));
      if (singleChat.id == data.message.conversation_id) {
        dispatch(
          ChatActions.getSingleChat({ id: data.message.conversation_id })
        );
      }
      notification.open({
        message: getAll("You_havea"),
        description: (
          <div className="msg-notification">
            <a
              style={{ fontWeight: 300 }}
              onClick={() =>
                router.push(`/conversations/${data.message.conversation.id}`)
              }
            >
              <p className="meta">
                {moment(data.message.created_at).fromNow()}
              </p>
              <h4 className="title">{data.message.message}</h4>
            </a>
            <p className="text">
              <small className="ml-1">
                <strong>{getAll("From") + " "}</strong>
              </small>
              <a
                style={{ color: "#108ee9" }}
                onClick={() =>
                  router.push(
                    data.message.user.username
                      ? `/u/${data.message.user.username}`
                      : "/notifications"
                  )
                }
              >
                <a style={{ fontWeight: 300 }}>
                  <span style={{ fontWeight: 300 }}>
                    {data.message.user.profile.full_name}
                  </span>
                </a>
              </a>
            </p>
          </div>
        ),
        icon: <MessageOutlined style={{ color: "#108ee9" }} />,
        placement: "bottomLeft",
      });
    });
    pusher.bindCurrency(() => {
      dispatch(CurrencyActions.getAllCurrenciesValues());
    });
    pusher.bindNotifications(async (data) => {
      const effect = new Audio("/bell.mp3");
      effect.play();
      await dispatch(
        NotificationsActions.getNotificationsData({
          pageNumber: notifications.pageNumber,
        })
      );
      notification.open({
        message: getAll("You_have_a_new_alert"),
        description: (
          <div className="msg-notification">
            {data.to == "seller" && (
              <a
                onClick={() =>
                  router.push(
                    data.content.item_id
                      ? `/mysales/${data.content.item_id}`
                      : "/mysales"
                  )
                }
                style={{ fontWeight: 300 }}
              >
                <h4 className="title">{data.title}</h4>
              </a>
            )}
            {data.to == "buyer" && (
              <a
                onClick={() =>
                  router.push(
                    data.content.item_id
                      ? `/mypurchases/${data.content.item_id}`
                      : "/mypurchases"
                  )
                }
                style={{ fontWeight: 300 }}
              >
                <h4 className="title">{data.title}</h4>
              </a>
            )}
            <p className="text">
              <small className="ml-1">
                <strong>{getAll("From") + " "}</strong>
              </small>
              <a
                onClick={() => {
                  router.push(
                    data?.user_sender?.username
                      ? `/u/${data.user_sender.username}`
                      : "/notifications"
                  );
                }}
                style={{ fontWeight: 300 }}
              >
                <span style={{ fontWeight: 300, color: "#108ee9" }}>
                  {data.user_sender.full_name}
                </span>
              </a>
            </p>
          </div>
        ),
        icon: <BellOutlined style={{ color: "#108ee9" }} />,
        placement: "bottomRight",
      });
    });
  }

  return (
    <SWRConfig
      value={{
        fetcher: async (url: string) => {
          return url.includes("wp-json")
            ? await API.get(url, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
                .then((r: any) => r.data)
                .catch(() => {
                  if (url == "api/me" && token) {
                    router.reload();
                  }
                })
            : await API.get(url, {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "X-LOCALIZATION": language,
                },
              })
                .then((r: any) => r.data)
                .catch(() => {
                  if (url == "api/me" && token) {
                    router.reload();
                  }
                });
        },
      }}
    >
      {language && (
        <ConfigProvider direction={`${language === "ar" ? "rtl" : "ltr"}`}>
          <div className={`${language === "ar" ? "rtl" : "ltr"}`}>
            {innerApp}
          </div>
        </ConfigProvider>
      )}
    </SWRConfig>
  );
};
App.propTypes = {
  innerApp: PropTypes.node,
};
export default App;
