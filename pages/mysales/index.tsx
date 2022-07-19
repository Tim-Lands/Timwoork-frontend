import Layout from "@/components/Layout/HomeLayout";
import React, { ReactElement, useEffect } from "react";
import { MetaTags } from "@/components/SEO/MetaTags";
import { Table } from "antd";
import Link from "next/link";
import useSWR from "swr";
import LastSeen from "@/components/LastSeen";
import Cookies from "js-cookie";
import router from "next/router";
import { LanguageContext } from "../../contexts/languageContext/context";
import { useContext } from "react";

const { getSectionLanguage } = useContext(LanguageContext);
const getLogin = getSectionLanguage("login");
const getAll = getSectionLanguage("all");
function index() {
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
  const { data: buysList }: any = useSWR(`api/my_sales`);

  const statusLabel = (status: any) => {
    switch (status) {
      case 0:
        return (
          <span className="badge bg-secondary">{getLogin("PEnding")}</span>
        );

      case 1:
        return (
          <span className="badge bg-warning">{getAll("Cancelled_by_the")}</span>
        );

      case 2:
        return (
          <span className="badge bg-danger">{getAll("Refused_by_the")}</span>
        );

      case 3:
        return (
          <span className="badge bg-info text-dark">
            {getAll("In_progress")}
          </span>
        );

      case 4:
        return (
          <span className="badge bg-warning">
            {getAll("Buyer_cancellation_request")}
          </span>
        );

      case 5:
        return (
          <span className="badge bg-warning">
            {getAll("Cancelled_by_the_seller")}
          </span>
        );

      case 6:
        return (
          <span className="badge bg-primary">{getAll("Pending_receipt")}</span>
        );

      case 7:
        return (
          <span className="badge bg-success text-light">
            {getLogin("Completed")}
          </span>
        );

      case 8:
        return (
          <span className="badge bg-danger text-light">
            {getAll("Completed")}
          </span>
        );

      case 9:
        return (
          <span className="badge bg-light text-dark">
            {getAll("Status_amendment_request")}
          </span>
        );

      case 10:
        return (
          <span className="badge bg-danger text-light">
            {getAll("Suspended_due_to")}
          </span>
        );

      default:
        return (
          <span className="badge bg-info text-dark">{getLogin("PEnding")}</span>
        );
    }
  };
  const columns: any = [
    {
      title: getAll("Title"),
      dataIndex: "",
      render: (e: any) => (
        <Link href={`/mysales/${e.id}`}>
          <a>{e.title}</a>
        </Link>
      ),
    },
    {
      title: getLogin("Total_price"),
      dataIndex: "price_product",
      render: (status: any) => <>{status}$</>,
    },
    {
      title: getAll("Buyer"),
      dataIndex: "",
      render: (e: any) => (
        <p className="m-0 is-hover-primary">
          <Link href={`/u/${e.order.cart.user.username}`}>
            <a className="flex-center" style={{ color: "gray" }}>
              <span className="mx-1">
                {e.order.cart.user.profile.full_name}
              </span>
            </a>
          </Link>
        </p>
      ),
    },
    {
      title: getLogin("Status"),
      dataIndex: "status",
      render: (e: any) => <>{statusLabel(e)}</>,
    },
    {
      title: getAll("Date"),
      dataIndex: "created_at",
      render: (created_at: any) => <LastSeen date={created_at} />,
    },
  ];
  const data = buysList && buysList.data;
  function onChange() {}
  return (
    <>
      <MetaTags
        title={getAll("My_sells")}
        metaDescription={getAll("My_sells")}
        ogDescription={getAll("My_sells")}
      />
      {veriedEmail && (
        <div className="timwoork-single my-3">
          <div className="row py-4 justify-content-center">
            <div className="col-lg-10">
              <div className="app-bill">
                <div className="app-bill-header">
                  <h3 className="title">{getAll("My_sells")}</h3>
                </div>
                <div className="saleTable">
                  <Table
                    className="innerTable"
                    columns={columns}
                    onChange={onChange}
                    dataSource={data}
                    bordered
                    size="small"
                  />
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
