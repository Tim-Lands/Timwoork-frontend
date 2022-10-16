import { useEffect } from "react";
import { ConfigProvider } from "antd";
import { SWRConfig } from "swr";
import router from "next/router";
import Cookies from "js-cookie";
import API from "../config";
import PropTypes from "prop-types";
import { UserActions } from "../store/user/UserActions";
import { ProfileActions } from "../store/profile/profileActions";
import { CartActions } from "../store/cart/cartActions";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

const App = ({ innerApp }) => {
  const user = useAppSelector((state) => state.user);
  const language = useAppSelector((state) => state.languages.language);

  const unUsed = "";
  const dispatch = useAppDispatch();
  let token = Cookies.get("token");
  if (!token && typeof window !== "undefined")
    token = localStorage.getItem("token");
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
    dispatch(CartActions.getCartData());
  }
  return (
    <SWRConfig
      value={{
        fetcher: async (url: string) => {
          console.log(url);
          return url.includes("wp-json")
            ? await API.get(url, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
                .then((r: any) => r.data)
                .catch(() => {
                  if (url == "api/me" && token) {
                    Cookies.remove("token");
                    if (typeof window !== undefined) {
                      localStorage.removeItem("token");
                      return;
                    }
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
                    Cookies.remove("token");
                    if (typeof window !== undefined) {
                      localStorage.removeItem("token");
                      return;
                    }
                    router.reload();
                  }
                });
        },
      }}
    >
      <ConfigProvider direction={`${language === "ar" ? "rtl" : "ltr"}`}>
        <div className={`${language === "ar" ? "rtl" : "ltr"}`}>{innerApp}</div>
      </ConfigProvider>
    </SWRConfig>
  );
};
App.propTypes = {
  innerApp: PropTypes.func,
};
export default App;
