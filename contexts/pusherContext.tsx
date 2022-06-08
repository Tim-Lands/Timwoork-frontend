import pusher from "../config/pusher";
import { createContext, useEffect, useState } from "react";
import useSWR from "swr";

export const PusherContext = createContext(null);
export const PusherProvider = (props) => {
  const { data: userInfo }: any = useSWR("api/me");
  const channelChat = `presence-receiver.${
    userInfo && userInfo.user_details.id
  }`;
  const channelNotification = `presence-notify.${
    userInfo && userInfo.user_details.id
  }`;
  const channelCurrency = `currency`;

  const chatPusher = pusher.subscribe(channelChat);

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
