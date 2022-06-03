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
  const chatPusher = pusher.subscribe(channelChat);
  const notificationPusher = pusher.subscribe(channelNotification);
  useEffect(() => {
    return () => {
      pusher.unsubscribe(channelChat);
      pusher.unsubscribe(channelNotification);
    };
  }, []);
  return (
    <PusherContext.Provider value={[chatPusher, notificationPusher]}>
      {props.children}
    </PusherContext.Provider>
  );
};
