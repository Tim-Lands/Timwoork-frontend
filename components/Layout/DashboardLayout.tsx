import Navbar from "../Dashboard/Navbar";
import Sidebar from "../Dashboard/Sidebar";
import { useState, useEffect } from "react";
import { SWRConfig } from "swr";
import API from "../../config";
import Cookies from "js-cookie";
import router from "next/router";

function DashboardLayout(props: any) {
  let token = Cookies.get("token_dash");
  if (!token && typeof window !== "undefined")
    token = localStorage.getItem("token_dash");
  useEffect(() => {
    if (!token) {
      router.push("/tw-admin/login");
      return;
    }
  }, [token]);
  const [isSidebarShowen, setIsSidebarShowen] = useState(false);
  const setIsSidebarShowenHandle = () => {
    setIsSidebarShowen(!isSidebarShowen);
  };
  return (
    <SWRConfig
      value={{
        fetcher: async (url: string) => {
          console.log(url);
          return await API.get(url, {
            headers: { Authorization: `Bearer ${token}` },
          }).then((r: any) => r.data);
        },
      }}
    >
      <div className="is-dashboard">
        <div className="clearflex">
          <div className={"right-column" + (isSidebarShowen ? " hidden" : "")}>
            <Sidebar />
          </div>
          <div
            className={"left-column" + (isSidebarShowen ? " full-width" : "")}
          >
            <Navbar setIsSidebarShowenHandle={setIsSidebarShowenHandle} />
            <div className="timlands-dashboard-content">{props.children}</div>
          </div>
        </div>
      </div>
    </SWRConfig>
  );
}

export default DashboardLayout;
