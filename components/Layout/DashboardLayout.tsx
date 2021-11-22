import Navbar from "../Dashboard/Navbar";
import Sidebar from "../Dashboard/Sidebar";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { logout } from "./../../store/auth/authActions";

function DashboardLayout(props: any) {
  useEffect(() => {
    console.log(props);
  }, []);

  const [isDarken, setIsDarken] = useState(false)
  const setIsDarkenHandle = () => {
    setIsDarken(!isDarken)
  }

  const [isSidebarShowen, setIsSidebarShowen] = useState(false)
  const setIsSidebarShowenHandle = () => {
    setIsSidebarShowen(!isSidebarShowen)
  }
  return (
    <div className={'is-dashboard ' + (isDarken ? 'is-dark' : '')}>
      <div className="clearflex">
        <div className={"right-column" + (isSidebarShowen ? ' hidden' : '')}>
          <Sidebar userData={props.userInfo} />
        </div>
        <div className={"left-column" + (isSidebarShowen ? ' full-width' : '')}>
          <Navbar setIsSidebarShowenHandle={setIsSidebarShowenHandle} isDarken={isDarken} setIsDarkenHandle={setIsDarkenHandle} />
          <div className="timlands-dashboard-content">
            {props.children}
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state: any) => ({
  isAuthenticated: state.auth.isAuthenticated,
  userInfo: state.auth.user
});

export default connect(mapStateToProps, { logout })(DashboardLayout);