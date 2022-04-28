import Navbar from "@/components/Navigation/Navbar";
import { Spin } from "antd";
import router from "next/router";
import { useEffect, useState } from "react";
import Footer from "../Footer";
import { connect } from "react-redux";
import { logout } from "./../../store/auth/authActions";
import { SWRConfig } from 'swr'
import API from '../../config'
import Cookies from 'js-cookie'

function Layout(props: any) {
  const [loading, setLoading] = useState(false);
  const token = Cookies.get('token')

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
    <SWRConfig value={{
      fetcher: async (url: string) =>  await API.get(url, {
        headers: { Authorization: `Bearer ${token}` }
      }).then((r: any) => r.data).catch(()=>{
        if(url=="api/me" && token){
          Cookies.remove('token');
          router.reload();
        }
        })
    }}>
      <div className="pt-5">
        
        <Navbar />
        <Spin tip="يرجى الإنتظار..." spinning={loading}>
          {props.children}
        </Spin>

        <Footer />
      </div>
    </SWRConfig>
  )
}
const mapStateToProps = (state: any) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(Layout);