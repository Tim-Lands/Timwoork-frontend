import pusher from "../config/pusher";
import { createContext, useEffect } from "react";
import useSWR from "swr";
import Cookies from "js-cookie";
import API from "../config";
export const PusherContext = createContext(null);
export const PusherProvider = (props) => {
  let token = Cookies.get("token");
  if (!token && typeof window !== "undefined")
    token = localStorage.getItem("token");
  const { data: userInfo }: any = useSWR("api/me", async (url: string) => {
    return await API.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((r: any) => r.data);
  });
  const channelChat = `presence-receiver.${
    userInfo && userInfo.user_details.id
  }`;
  const channelNotification = `presence-notify.${
    userInfo && userInfo.user_details.id
  }`;
  const chatPusher = pusher.subscribe(channelChat);

  const channelCurrency = "currency";

  const notificationPusher = pusher.subscribe(channelNotification);

  const currencyPusher = pusher.subscribe(channelCurrency);
  useEffect(() => {
    return () => {
      pusher.unsubscribe(channelChat);
      pusher.unsubscribe(channelNotification);
      pusher.unsubscribe(channelCurrency);
    };
  }, []);
  return (
    <PusherContext.Provider
      value={[chatPusher, notificationPusher, currencyPusher]}
    >
      {props.children}
    </PusherContext.Provider>
  );
};
