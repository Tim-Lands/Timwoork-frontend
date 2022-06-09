import { Spin } from "antd";
import router from "next/router";
import { useEffect, useState } from "react";
import { SWRConfig } from "swr";
import API from "../../../config";

import Cookies from "js-cookie";
import Footer from "../Footer/Footer";
import Navbar from "../Header/Navbar";

function LayoutHome(props: any) {
  console.log(props);
  const [loading, setLoading] = useState(false);
  let token = Cookies.get("token");
  if (!token && typeof window !== "undefined")
    token = localStorage.getItem("token");
  useEffect(() => {
    const handleStart = (url: any) => {
      url !== router.pathname ? setLoading(true) : setLoading(false);
    };
    const handleComplete = () => setLoading(false);
    console.log("use effect from layout home component");
    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
  }, [router]);
  return (
    <SWRConfig
      value={{
        fetcher: async (url: string) => {
          // console.log(url)
          return await API.get(url, {
            headers: { Authorization: `Bearer ${token}` },
          })
            .then((r: any) => r.data)
            .catch(() => {
              // console.log('err')
              if (url == "api/me" && token) {
                // console.log('cookies is undefined and will be removed')
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
      <div className="hero-content">
        <div className="container">
          <Navbar dark={props.dark} />
        </div>
      </div>
      <Spin tip="يرجى الإنتظار..." spinning={loading}>
        <div className="mainHomeIndex pb-5">{props.children}</div>
        <Footer />
      </Spin>
    </SWRConfig>
  );
}

export default LayoutHome;
