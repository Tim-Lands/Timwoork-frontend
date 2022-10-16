import Layout from "@/components/Layout/HomeLayout";
import React, { ReactElement, useEffect } from "react";
import { useAppSelector } from "@/store/hooks";

import { MetaTags } from "@/components/SEO/MetaTags";
import Cookies from "js-cookie";
import Sidebar from "@/components/Conversations/Sidebar";
import { Empty } from "antd";
import router from "next/router";
import useSWR from "swr";
function index() {
  const { getAll } = useAppSelector((state) => state.languages);

  let token = Cookies.get("token");
  if (!token && typeof window !== "undefined")
    token = localStorage.getItem("token");
  const { data: userInfo }: any = useSWR("api/me");
  const veriedEmail = userInfo && userInfo.user_details.email_verified_at;
  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, []);
  return (
    <>
      <MetaTags
        title={getAll("Conversations")}
        metaDescription={getAll("My_sells_Timwoork")}
        ogDescription={getAll("My_sells_Timwoork")}
      />
      {veriedEmail && (
        <div className=" my-3" style={{ maxWidth: 1300, marginInline: "auto" }}>
          <div className="row">
            <div className="col-lg-4">
              <Sidebar />
            </div>
            <div className="col-lg-8">
              <div
                className="conversations-form-main"
                style={{
                  padding: 9,
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  alignContent: "center",
                  justifyContent: "center",
                }}
              >
                <div className="conversations-form">
                  <Empty description={getAll("Choose_a_conversation")} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
index.getLayout = function getLayout(page: any): ReactElement {
  return <Layout>{page}</Layout>;
};
export default index;
