import pusher from "../config/pusher";
import { createContext, useEffect } from "react";
import Cookies from "js-cookie";
import { useAppSelector } from "@/store/hooks";
export const PusherContext = createContext(null);
export const PusherProvider = (props) => {
  const { isLogged, id } = useAppSelector((store) => store.user);
  let token = Cookies.get("token");
  if (!token && typeof window !== "undefined")
    token = localStorage.getItem("token");

  const channelChat = `presence-receiver.${id}`;
  const channelNotification = `presence-notify.${id}`;
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
