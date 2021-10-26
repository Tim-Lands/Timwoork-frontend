import Navbar from "../Dashboard/Navbar";
import Sidebar from "../Dashboard/Sidebar";
import PropTypes from "prop-types";
import { useState } from "react";

export default function DashboardLayout({ children }: any) {
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
          <Sidebar />
        </div>
        <div className={"left-column" + (isSidebarShowen ? ' full-width' : '')}>
          <Navbar setIsSidebarShowenHandle={setIsSidebarShowenHandle} isDarken={isDarken} setIsDarkenHandle={setIsDarkenHandle} />
          <div className="timlands-dashboard-content">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
DashboardLayout.propTypes = {
    children: PropTypes.any
};

