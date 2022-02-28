import Navbar from "../Dashboard/Navbar";
import Sidebar from "../Dashboard/Sidebar";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { logout } from "./../../store/auth/authActions";
import { SWRConfig } from 'swr'
import API from '../../config'
import Cookies from 'js-cookie'
import router from "next/router";

function DashboardLayout(props: any) {
  const token = Cookies.get('token_dash')
  useEffect(() => {
    if (!token) {
      router.push("/tw-admin/login")
      return
    }
  }, [])
  const [isSidebarShowen, setIsSidebarShowen] = useState(false)
  const setIsSidebarShowenHandle = () => {
    setIsSidebarShowen(!isSidebarShowen)
  }
  return (
    <SWRConfig value={{
      fetcher: async (url: string) => await API.get(url, {
        headers: { Authorization: `Bearer ${token}` }
      }).then((r: any) => r.data)
    }}>
      <div className='is-dashboard'>
        <div className="clearflex">
          <div className={"right-column" + (isSidebarShowen ? ' hidden' : '')}>
            <Sidebar />
          </div>
          <div className={"left-column" + (isSidebarShowen ? ' full-width' : '')}>
            <Navbar setIsSidebarShowenHandle={setIsSidebarShowenHandle} />
            <div className="timlands-dashboard-content">
              {props.children}
            </div>
          </div>
        </div>
      </div>
    </SWRConfig>
  )
}

const mapStateToProps = (state: any) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(DashboardLayout);