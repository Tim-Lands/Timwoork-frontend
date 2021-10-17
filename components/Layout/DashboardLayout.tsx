import Navbar from "@/components/Dashboard/Navbar";
import Sidebar from "@/components/Dashboard/Sidebar";
import PropTypes from "prop-types";
import { useState } from "react";

export default function DashboardLayout({ children }) {
  const [isDarken, setIsDarken] = useState(false)
  const setIsDarkenHandle = () => {
      setIsDarken(!isDarken)
  } 
  return (
    <div className={'is-dashboard ' + (isDarken ? 'is-dark' : '')}>
      <div className="row">
        <div className="col-lg-3 p-0">
          <Sidebar />
        </div>
        <div className="col-lg-9 p-0">
          <Navbar isDarken={isDarken} setIsDarkenHandle={setIsDarkenHandle} />
          <div className="timlands-dashboard-content">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
DashboardLayout.propTypes = {
    children: PropTypes.func
};

