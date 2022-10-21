import Layout from "@/components/Layout/HomeLayout";
import React, { ReactElement, useEffect } from "react";
import { useAppSelector } from "@/store/hooks";

import { MetaTags } from "@/components/SEO/MetaTags";
import Sidebar from "@/components/Conversations/Sidebar";
import { Empty } from "antd";
import router from "next/router";
function index() {
  const { getAll } = useAppSelector((state) => state.languages);
  const user = useAppSelector((state) => state.user);

  const veriedEmail = user.email_verified;
  useEffect(() => {
    if (!user.isLogged && !user.loading) {
      router.push("/login");
      return;
    }
  }, [user]);
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
