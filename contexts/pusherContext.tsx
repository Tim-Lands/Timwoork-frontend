import pusher from "../config/pusher";
import { createContext, useEffect, useState } from "react";
import useSWR from "swr";
import Cookies from "js-cookie";
import API from '../config'
export const PusherContext = createContext(null);
export const PusherProvider = (props) => {
  let token = Cookies.get("token");
  if (!token && typeof window !== "undefined")
    token = localStorage.getItem("token");
  const { data: userInfo }: any = useSWR("api/me", async (url: string) => {
    return await API.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r: any) => r.data)
  });
  const channelChat = `presence-receiver.${userInfo && userInfo.user_details.id
    }`;
  const channelNotification = `presence-notify.${userInfo && userInfo.user_details.id
    }`;
  const chatPusher = pusher.subscribe(channelChat);
  const notificationPusher = pusher.subscribe(channelNotification);
  useEffect(() => {
    console.log(channelNotification)
    return () => {
      console.log('unsubscripe');
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
