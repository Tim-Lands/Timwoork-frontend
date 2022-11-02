import Layout from "@/components/Layout/HomeLayout";
import React, { ReactElement, useEffect } from "react";
import Image from "next/image";
import router from "next/router";
import { MetaTags } from "@/components/SEO/MetaTags";
import Loading from "@/components/Loading";
import Unauthorized from "@/components/Unauthorized";
import { Alert } from "@/components/Alert/Alert";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { WalletActions } from "store/wallet/WalletActions";
import LastSeen from "@/components/LastSeen";
import Link from "next/link";
import { Table } from "antd";

function index() {
  const dispatch = useAppDispatch();
  const {
    languages: { getAll },
    wallet,
    user,
    profile,
  } = useAppSelector((state) => state);
  const veriedEmail = user.email_verified;
  const myLoader = () => {
    return `${profile.avatar_path}`;
  };
  useEffect(() => {
    if (wallet.loaded) return;
    dispatch(WalletActions.getWalletData());
  }, [wallet]);
  useEffect(() => {
    if (!user.isLogged && !user.loading) {
      router.push("/login");
      return;
    }
  }, [user]);

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
      title: getAll("Amount"),
      dataIndex: "",
      render: (e: any) => <>{switchType(e.status, e.amount)}</>,
    },
    {
      title: getAll("Operation_title"),
      dataIndex: "",
      width: 230,
      render: (e: any) => {
        return <>{e.payload.title}</>;
      },
    },
    {
      title: getAll("Payment_method"),
      dataIndex: "",
      render: (e: any) => <>{e.payload.payment_method}</>,
    },
    {
      title: getAll("Date"),
      dataIndex: "created_at",
      render: (created_at: any) => <LastSeen date={created_at} />,
    },
  ];
  const data = wallet.activities;
  function onChange() {}
  return (
    <div className="py-3">
      {user.loading && <Loading />}
      {!user.isLogged && !user.loading && <Unauthorized />}
      {user.isLogged && !user.loading && (
        <>
          <MetaTags
            title={getAll("My_portfolio")}
            metaDescription={getAll("Home")}
            ogDescription={getAll("Home")}
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
                          src={profile.avatar_path}
                          quality={1}
                          width={120}
                          height={120}
                          placeholder="blur"
                          blurDataURL="/avatar2.jpg"
                        />
                      </div>
                      <div className="profile-content-head">
                        <h4 className="title">{profile.full_name}</h4>
                        <p className="text">
                          @{user.username} |
                          <span className="app-label">
                            {" "}
                            {profile.level.name}{" "}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="profile-content-body">
                      <div className="page-header xs">
                        <h3 className="title">{getAll("My_portfolio")}</h3>
                      </div>
                      <div className="row">
                        <div className="col-sm-4">
                          <div className="content-text-item wallet-info red">
                            <h3 className="text-label">
                              {getAll("Pending_balance")}
                            </h3>
                            <p className="text-value">
                              {profile.pending_amount}
                            </p>
                            <p className="text-note">
                              {getAll("Your_earnings_are")}
                            </p>
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className="content-text-item wallet-info green">
                            <h3 className="text-label">
                              {getAll("Withdrawable_balance")}
                            </h3>
                            <p className="text-value">
                              {profile.withdrawable_amount}
                            </p>
                            <p className="text-note">
                              {getAll("The_mount_you")}
                            </p>
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className="content-text-item wallet-info ">
                            <h3 className="text-label">
                              {getAll("Total_balance")}
                            </h3>
                            <p className="text-value">
                              {Number(profile.withdrawable_amount) +
                                Number(profile.pending_amount)}
                            </p>
                            <p className="text-note">
                              {getAll("The_entire_balance")}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex justify-content-center py-4">
                        {profile.withdrawable_amount > 9 ? (
                          <>
                            {wallet.is_withdrawable == true ? (
                              <Link href={"/withdrawal"}>
                                <a className="btn butt-green butt-md px-5">
                                  {getAll("Withdrawal_request")}
                                </a>
                              </Link>
                            ) : (
                              <Alert type="error">
                                <strong> {getAll("You_have_a")}</strong>
                              </Alert>
                            )}
                          </>
                        ) : (
                          <div className="row my-5 justify-content-md-center">
                            <div className="col-md-9">
                              <Alert type="error">
                                <strong> {getAll("You_cannot_request")}</strong>
                              </Alert>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="page-header xs">
                        <h3 className="title">
                          {getAll("Financial_transactions")}
                        </h3>
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
