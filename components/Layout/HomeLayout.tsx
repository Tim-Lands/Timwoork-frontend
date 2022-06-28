import Navbar from "@/components/NewIndex/Header/Navbar";
import { Spin } from "antd";
import router from "next/router";
import { useEffect, useState, useContext } from "react";
import Footer from "../NewIndex/Footer/Footer";
import { LanguageContext } from "../../contexts/languageContext/context";
import { connect } from "react-redux";
import { logout } from "./../../store/auth/authActions";
import { SWRConfig } from "swr";
import API from "../../config";
import Cookies from "js-cookie";

function Layout(props: any) {
  const [loading, setLoading] = useState(false);
  let token = Cookies.get("token");
  const { getSectionLanguage } = useContext(LanguageContext);
  const getLanguage = getSectionLanguage("main");
  if (!token && typeof window !== "undefined")
    token = localStorage.getItem("token");
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
      <div className="pt-5 mainHomeIndex">
        <Navbar />
        {props.children}
        {loading && (
          <div className="loading">
            <Spin tip={getLanguage("Loading")} spinning={true}></Spin>
          </div>
        )}
        <Footer />
      </div>
    </SWRConfig>
  );
}
const mapStateToProps = (state: any) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(Layout);
