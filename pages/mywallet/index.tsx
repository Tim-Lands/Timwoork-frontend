import Layout from "@/components/Layout/HomeLayout";
import React, { ReactElement, useEffect } from "react";
import Image from "next/image";
import router from "next/router";
import useSWR from "swr";
import { MetaTags } from "@/components/SEO/MetaTags";
import Loading from "@/components/Loading";
import Cookies from "js-cookie";
import Unauthorized from "@/components/Unauthorized";
import { Alert } from "@/components/Alert/Alert";
import LastSeen from "@/components/LastSeen";
import Link from "next/link";
import { Table } from "antd";

function index() {
  let token = Cookies.get("token");
  if (!token && typeof window !== "undefined")
    token = localStorage.getItem("token");
  const { data: userInfo }: any = useSWR("api/me");
  const veriedEmail = userInfo && userInfo.user_details.email_verified_at;

  const myLoader = () => {
    return `${userInfo.user_details.profile.avatar_path}`;
  };
  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, []);
  function switchType(type: any, amount: number) {
    switch (type) {
      case 0:
        return <span className="app-badge app-badge-danger">-${amount}</span>;

      case 1:
        return <span className="app-badge app-badge-success">+${amount}</span>;

      case 2:
        return <span className="app-badge app-badge-danger">-${amount}</span>;

      case 3:
        return <span className="app-badge app-badge-success">+${amount}</span>;

      default:
        return <span className="app-badge app-badge-danger">-${amount}</span>;
    }
  }
  const columns: any = [
    {
      title: "المبلغ",
      dataIndex: "",
      render: (e: any) => <>{switchType(e.status, e.amount)}</>,
    },
    {
      title: "عنوان العملية",
      dataIndex: "",
      width: 230,
      render: (e: any) => <>{e.payload.title}</>,
    },
    {
      title: "طريقة العملية",
      dataIndex: "",
      render: (e: any) => <>{e.payload.payment_method}</>,
    },
    {
      title: "التاريخ",
      dataIndex: "created_at",
      render: (created_at: any) => <LastSeen date={created_at} />,
    },
  ];
  const data = userInfo && userInfo.user_details.profile.wallet.activities;
  function onChange() {}
  return (
    <div className="py-3">
      {!userInfo && <Loading />}
      {!token && <Unauthorized />}
      {userInfo && userInfo.user_details.profile && (
        <>
          <MetaTags
            title={"محفظتي"}
            metaDescription={"الصفحة الرئيسية"}
            ogDescription={"الصفحة الرئيسية"}
          />
          {veriedEmail && (
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <div className="timlands-profile-content">
                    <div className="profile-content-header">
                      <div className="profile-content-avatar">
                        <Image
                          loader={myLoader}
                          src={
                            userInfo &&
                            userInfo.user_details.profile.avatar_path
                          }
                          quality={1}
                          width={120}
                          height={120}
                          placeholder="blur"
                          blurDataURL="/avatar2.jpg"
                        />
                      </div>
                      <div className="profile-content-head">
                        <h4 className="title">
                          {userInfo.user_details.profile.full_name}
                        </h4>
                        <p className="text">
                          @{userInfo.user_details.username} |
                          <span className="app-label">
                            {" "}
                            {userInfo.user_details.profile.level.name_ar}{" "}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="profile-content-body">
                      <div className="page-header xs">
                        <h3 className="title">محفظتي</h3>
                      </div>
                      <div className="row">
                        <div className="col-sm-4">
                          <div className="content-text-item wallet-info red">
                            <h3 className="text-label">الرصيد المعلق</h3>
                            <p className="text-value">
                              {userInfo &&
                                userInfo.user_details.profile.pending_amount}
                            </p>
                            <p className="text-note">
                              يتم تعليق الأرباح لمدة 3 أيام قبل أن تتمكن من
                              استخدامها
                            </p>
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className="content-text-item wallet-info green">
                            <h3 className="text-label">الرصيد القابل للسحب</h3>
                            <p className="text-value">
                              {userInfo &&
                                userInfo.user_details.profile
                                  .withdrawable_amount}
                            </p>
                            <p className="text-note">
                              المبلغ الذي حققته من بيع الخدمات يمكنك سحبه
                            </p>
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className="content-text-item wallet-info ">
                            <h3 className="text-label">الرصيد الكلي</h3>
                            <p className="text-value">
                              {Number(
                                userInfo &&
                                  userInfo.user_details.profile
                                    .withdrawable_amount
                              ) +
                                Number(
                                  userInfo &&
                                    userInfo.user_details.profile.pending_amount
                                )}
                            </p>
                            <p className="text-note">
                              كامل الرصيد الموجود في حسابك الآن يضمن الأرباح
                              والرصيد المعلق أيضا
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex justify-content-center py-4">
                        {userInfo && (
                          <>
                            {userInfo &&
                            userInfo.user_details.profile.withdrawable_amount >
                              9 ? (
                              <>
                                {userInfo.user_details.profile.wallet
                                  .is_withdrawable == true ? (
                                  <Link href={"/withdrawal"}>
                                    <a className="btn butt-green butt-md px-5">
                                      طلب سحب الأموال
                                    </a>
                                  </Link>
                                ) : (
                                  <Alert type="error">
                                    <strong>
                                      {" "}
                                      لديك طلب سحب أموال في المعالجة
                                    </strong>
                                  </Alert>
                                )}
                              </>
                            ) : (
                              <div className="row my-5 justify-content-md-center">
                                <div className="col-md-9">
                                  <Alert type="error">
                                    <strong>
                                      {" "}
                                      لا يمكنك طلب سحب الأموال رصيدك القابل
                                      للسحب أقل من 10 دولار
                                    </strong>
                                  </Alert>
                                </div>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                      <div className="page-header xs">
                        <h3 className="title">المعاملات المالية</h3>
                      </div>
                      <Table
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
      )}
    </div>
  );
}

index.getLayout = function getLayout(page: any): ReactElement {
  return <Layout>{page}</Layout>;
};
export default index;
