import { useContext } from "react";
import { ConfigProvider } from "antd";
import { SWRConfig } from "swr";
import router from "next/router";
import Cookies from "js-cookie";
import API from "../config";
import PropTypes from "prop-types";

import { LanguageContext } from "../contexts/languageContext/context";
const App = ({ innerApp }) => {
  const { language } = useContext(LanguageContext);
  let token = Cookies.get("token");
  if (!token && typeof window !== "undefined")
    token = localStorage.getItem("token");
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
