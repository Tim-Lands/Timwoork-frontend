import Navbar from "@/components/Navigation/Navbar";
import { Spin } from "antd";
import router from "next/router";
import { useEffect, useState } from "react";
import Footer from "../Footer";
import { CartProvider } from "react-use-cart";
import { connect } from "react-redux";
import { logout, loadUser } from "./../../store/auth/authActions";

function Layout(props: any) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    /*if (isMobile) {
      setIsSidebarShowen(true)
    }*/
    props.loadUser()
    console.log(props.userInfo);

    const handleStart = (url: any) => {
      url !== router.pathname ? setLoading(true) : setLoading(false);
    };
    const handleComplete = () => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
  }, [router]);
  return (
    <CartProvider>
      <div className={'is-home is-dark'}>
        <Navbar userData={props.userInfo} />
        <Spin tip="يرجى الإنتظار..." spinning={loading}>
          {props.children}
        </Spin>
        <Footer />
      </div>
    </CartProvider>
  )
}
const mapStateToProps = (state: any) => ({
  isAuthenticated: state.auth.isAuthenticated,
  userInfo: state.auth.user
});

export default connect(mapStateToProps, { logout, loadUser })(Layout);