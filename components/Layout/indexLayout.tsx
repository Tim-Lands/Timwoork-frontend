import { Spin } from "antd";
import router from "next/router";
import { useEffect, useState } from "react";
import { SWRConfig } from "swr";
import API from "../../config";
import { useAppSelector } from "@/store/hooks";
import Footer from "../Footer/Footer";
import Navbar from "../Header/Navbar";

function LayoutHome(props: any) {
  const [loading, setLoading] = useState(false);
  const { getAll } = useAppSelector((state) => state.languages);
  const { token } = useAppSelector((state) => state.user);

  useEffect(() => {
    const handleStart = (url: any) => {
      url !== router.pathname ? setLoading(true) : setLoading(false);
    };
    const handleComplete = () => setLoading(false);
    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
  }, [router]);
  return (
    <SWRConfig
      value={{
        fetcher: async (url: string) => {
          return await API.get(url, {
            headers: { Authorization: `Bearer ${token}` },
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
      <div className="hero-content" style={{ overflowX: "hidden" }}>
        <div className="container">
          <Navbar dark={props.dark} />
        </div>
      </div>
      <div className="mainHomeIndex pb-5">
        {props.children}
        {loading && (
          <div className="loading">
            <Spin tip={getAll("Loading")} spinning={true}></Spin>
          </div>
        )}
      </div>
      <Footer />
    </SWRConfig>
  );
}

export default LayoutHome;
