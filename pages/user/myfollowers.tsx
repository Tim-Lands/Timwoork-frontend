import Layout from "@/components/Layout/HomeLayout";
import { Result } from "antd";
import React, { ReactElement, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import router from "next/router";
import useSWR from "swr";
import { MetaTags } from "@/components/SEO/MetaTags";
import Loading from "@/components/Loading";
import Sidebar from "@/components/Profile/Sidebar";
import Cookies from "js-cookie";
import Unauthorized from "@/components/Unauthorized";
import { FaHeart, FaImages, FaRss, FaUserCircle } from "react-icons/fa";
import FollowItem from "@/components/NewIndex/FollowItem";

function MyFollowers() {
  let token = Cookies.get("token");
  if (!token && typeof window !== "undefined")
    token = localStorage.getItem("token");
  const { data: userInfo }: any = useSWR("api/me");
  const darkMode = userInfo && userInfo.user_details.profile.dark_mode;

  const myLoader = () => {
    return `${userInfo.user_details.profile.avatar_path}`;
  };
  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, []);
  if (userInfo && userInfo.user_details.profile.steps < 1) {
    return (
      <div className="row justify-content-md-center">
        <div className="col-md-5">
          <Result
            status="warning"
            title="حسابك غير كامل"
            subTitle="حسابك غير كامل يرجى إكمال الصفحة الشخصية الخاصة بك"
            extra={
              <Link href="/user/personalInformations">
                <a className="btn butt-primary butt-md">الذهاب إلى التعديل</a>
              </Link>
            }
          />
        </div>
      </div>
    );
  } else
    return (
      <div className="py-3">
        {!userInfo && <Loading />}
        {!token && <Unauthorized />}
        {userInfo && userInfo.user_details.profile && (
          <>
            <MetaTags
              title={
                "الملف الشخصي لـ " +
                userInfo.user_details.profile.first_name +
                " " +
                userInfo.user_details.profile.last_name
              }
              metaDescription={
                "الملف الشخصي لـ " +
                userInfo.user_details.profile.first_name +
                " " +
                userInfo.user_details.profile.last_name
              }
              ogDescription={
                "الملف الشخصي لـ " +
                userInfo.user_details.profile.first_name +
                " " +
                userInfo.user_details.profile.last_name
              }
            />
            <div className="userProfileCont">
              <div className="timlands-profile-content">
                <div className="profile-content-header">
                  <div className="profile-content-avatar">
                    <Image
                      loader={myLoader}
                      src={
                        userInfo && userInfo.user_details.profile.avatar_path
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
                    <div className="button-edit">
                      <Link href="/user/personalInformations">
                        <a className="btn butt-primary flex-center butt-sm">
                          <span className="material-icons material-icons-outlined">
                            edit
                          </span>{" "}
                          تعديل الملف الشخصي
                        </a>
                      </Link>
                    </div>
                  </div>
                  <p className="profile-buttons">
                    <button
                      className="btn butt-primary2 flex-center butt-sm"
                      onClick={() =>
                        navigator.clipboard.writeText(
                          `https://timwoork.com/u/${userInfo.user_details.username}`
                        )
                      }
                    >
                      <span className="material-icons material-icons-outlined">
                        copy
                      </span>{" "}
                      نسخ رابط بروفايلي
                    </button>
                  </p>
                </div>
                <div className="portfolios-container">
                  <nav className="portfolios-nav d-flex">
                    <ul className="portfolios-nav-list me-auto">
                      <li>
                        <Link href={`/user/profile`}>
                          <a className="portfolio-item">
                            <FaUserCircle /> الملف الشخصي
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={`/portfolios/user/${
                            userInfo && userInfo.user_details.username
                          }`}
                        >
                          <a className="portfolio-item">
                            <FaImages /> معرض الأعمال
                          </a>
                        </Link>
                      </li>
                      <li className="active">
                        <Link href={`/user/myfollowers`}>
                          <a className="portfolio-item">
                            <FaRss /> الأشخاص الذين أتابعهم
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link href={`/user/myfavorites`}>
                          <a className="portfolio-item">
                            <FaHeart /> مفضلاتي
                          </a>
                        </Link>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
              <div className="row">
                <Sidebar
                  withdrawable_amount={
                    userInfo &&
                    userInfo.user_details.profile.withdrawable_amount
                  }
                  pending_amount={
                    userInfo && userInfo.user_details.profile.pending_amount
                  }
                  darkMode={darkMode}
                />
                <div className="col-lg-8">
                  <div className="timlands-profile-content">
                    <div className="profile-content-body">
                      <div className="page-header sm">
                        <h3 className="title">الأشخاص الذين أتابعهم</h3>
                      </div>
                      <div className="timlands-followers-users">
                        <FollowItem
                          avatar="/avatar3.jpg"
                          fullname="عبد الحميد بومقواس"
                          level="بائع جديد"
                        />
                        <FollowItem
                          avatar="/avatar2.jpg"
                          fullname="أحمد يحيى"
                          level="بائع جديد"
                        />
                        <FollowItem
                          avatar="/avatar3.jpg"
                          fullname="عبد الحميد بومقواس"
                          level="بائع جديد"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    );
}

MyFollowers.getLayout = function getLayout(page: any): ReactElement {
  return <Layout>{page}</Layout>;
};
export default MyFollowers;
