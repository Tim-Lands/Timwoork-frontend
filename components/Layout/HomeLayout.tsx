import Navbar from "@/components/NewIndex/Header/Navbar";
import { Spin } from "antd";
import router from "next/router";
import { useEffect, useState } from "react";
import Footer from "../NewIndex/Footer/Footer";
import { useAppSelector } from "@/store/hooks";
import Cookies from "js-cookie";

function Layout(props: any) {
  const [loading, setLoading] = useState(false);
  let token = Cookies.get("token");
  const { getAll } = useAppSelector((state) => state.languages);
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
    <div className="pt-5 mainHomeIndex">
      <Navbar />
      {props.children}
      {loading && (
        <div className="loading">
          <Spin tip={getAll("Loading")} spinning={true}></Spin>
        </div>
      )}
      <Footer />
    </div>
  );
}
export default Layout;
// const mapStateToProps = (state: any) => ({
//   isAuthenticated: state.auth.isAuthenticated,
// });

// export default connect(mapStateToProps, { logout })(Layout);
