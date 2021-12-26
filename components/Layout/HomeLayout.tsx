import Navbar from "@/components/Navigation/Navbar";
import { Spin } from "antd";
import router from "next/router";
import { useEffect, useState } from "react";
import Footer from "../Footer";
import { connect } from "react-redux";
import { logout } from "./../../store/auth/authActions";

function Layout(props: any) {
  const [loading, setLoading] = useState(false);
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
    <div className={'is-home is-dark'}>
      <Navbar />
      <Spin tip="يرجى الإنتظار..." spinning={loading}>
        {props.children}
      </Spin>
      <Footer />
    </div>
  )
}
const mapStateToProps = (state: any) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(Layout);