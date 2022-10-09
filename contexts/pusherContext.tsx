import pusher from "../config/pusher";
import { createContext, useEffect } from "react";
import useSWR from "swr";
import Cookies from "js-cookie";
import API from "../config";
import { useAppSelector } from "@/store/hooks";
export const PusherContext = createContext(null);
export const PusherProvider = (props) => {
  const isLogged = useAppSelector((store) => store.user.isLogged);
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
  const channelCurrency = "currency";

  let chatPusher;
  let notificationPusher;
  let currencyPusher;
  useEffect(() => {
    if (isLogged) {
      pusher.subscribe(channelChat);

      pusher.subscribe(channelNotification);

      pusher.subscribe(channelCurrency);
    }
  }, [isLogged]);
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
