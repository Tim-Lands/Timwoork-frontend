import Navbar from "@/components/Navigation/Navbar";
import { Spin } from "antd";
import router from "next/router";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Footer from "../Footer";
import { CartProvider } from "react-use-cart";
import { connect } from "react-redux";
import { logout } from "./../../store/auth/authActions";

function Layout({ children }) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    /*if (isMobile) {
      setIsSidebarShowen(true)
    }*/
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
        <Navbar />
        <Spin tip="يرجى الإنتظار..." spinning={loading}>
          {children}
        </Spin>
        <Footer />
      </div>
    </CartProvider>
  )
}
Layout.propTypes = {
  children: PropTypes.func
};

const mapStateToProps = (state: any) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.registerLoading,
  userInfo: state.auth.user
});

export default connect(mapStateToProps, { logout })(Layout);