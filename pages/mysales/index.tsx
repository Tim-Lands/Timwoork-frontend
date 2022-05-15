import Layout from "@/components/Layout/HomeLayout";
import React, { ReactElement, useEffect } from "react";
import { MetaTags } from "@/components/SEO/MetaTags";
import { Table } from "antd";
import Link from "next/link";
import useSWR from "swr";
import LastSeen from "@/components/LastSeen";
import Cookies from "js-cookie";
import router from "next/router";
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
        return <span className="badge bg-secondary">قيد الانتظار...</span>;

      case 1:
        return <span className="badge bg-warning">ملغية من طرف المشتري</span>;

      case 2:
        return <span className="badge bg-danger">مرفوضة من طرف البائع</span>;

      case 3:
        return <span className="badge bg-info text-dark">قيد التنفيذ...</span>;

      case 4:
        return (
          <span className="badge bg-warning">طلب إلغاء من طرف المشتري</span>
        );

      case 5:
        return <span className="badge bg-warning">ملغية من طرف البائع</span>;

      case 6:
        return <span className="badge bg-primary">قيد الإستلام</span>;

      case 7:
        return <span className="badge bg-success text-light">مكتملة</span>;

      case 8:
        return <span className="badge bg-danger text-light">معلقة</span>;

      case 9:
        return <span className="badge bg-light text-dark">حالة طلب تعديل</span>;

      case 10:
        return (
          <span className="badge bg-danger text-light">
            معلقة بسبب رفض التعديل
          </span>
        );

      default:
        return <span className="badge bg-info text-dark">قيد الانتظار...</span>;
    }
  };
  const columns: any = [
    {
      title: "العنوان",
      dataIndex: "",
      render: (e: any) => (
        <Link href={`/mysales/${e.id}`}>
          <a>{e.title}</a>
        </Link>
      ),
    },
    {
      title: "السعر الكلي",
      dataIndex: "price_product",
      render: (status: any) => <>{status}$</>,
    },
    {
      title: "المشتري",
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
      title: "الحالة",
      dataIndex: "status",
      render: (e: any) => <>{statusLabel(e)}</>,
    },
    {
      title: "التاريخ",
      dataIndex: "created_at",
      render: (created_at: any) => <LastSeen date={created_at} />,
    },
  ];
  const data = buysList && buysList.data;
  function onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }
  return (
    <>
      <MetaTags
        title={"مبيعاتي"}
        metaDescription={"مبيعاتي"}
        ogDescription={"مبيعاتي"}
      />
      {veriedEmail && (
        <div className="timwoork-single my-3">
          <div className="row py-4 justify-content-center">
            <div className="col-lg-10">
              <div className="app-bill">
                <div className="app-bill-header">
                  <h3 className="title">مبيعاتي</h3>
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
