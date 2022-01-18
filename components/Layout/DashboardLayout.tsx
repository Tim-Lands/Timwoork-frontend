import Navbar from "../Dashboard/Navbar";
import Sidebar from "../Dashboard/Sidebar";
import { useState } from "react";
import { connect } from "react-redux";
import { logout } from "./../../store/auth/authActions";
import withAuth from '../../services/withAuth'
import { SWRConfig } from 'swr'
import API from '../../config'
import Cookies from 'js-cookie'

function DashboardLayout(props: any) {
  const [isDarken, setIsDarken] = useState(false)
  const setIsDarkenHandle = () => {
    setIsDarken(!isDarken)
  }
  const token = Cookies.get('token_dash')

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
    <div className={'is-dashboard ' + (isDarken ? 'is-dark' : '')}>
      <div className="clearflex">
        <div className={"right-column" + (isSidebarShowen ? ' hidden' : '')}>
          <Sidebar />
        </div>
        <div className={"left-column" + (isSidebarShowen ? ' full-width' : '')}>
          <Navbar setIsSidebarShowenHandle={setIsSidebarShowenHandle} isDarken={isDarken} setIsDarkenHandle={setIsDarkenHandle} />
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

export default connect(mapStateToProps, { logout })(withAuth(DashboardLayout));