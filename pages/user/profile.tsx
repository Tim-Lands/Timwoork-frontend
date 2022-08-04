import Layout from "@/components/Layout/HomeLayout";
import { Result, message, Card, Spin } from "antd";
import React, { createRef, ReactElement, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import router from "next/router";
import API from "../../config";
import useSWR from "swr";
import { MetaTags } from "@/components/SEO/MetaTags";
import Loading from "@/components/Loading";
import Sidebar from "@/components/Profile/Sidebar";
import MyProducts from "@/components/Profile/MyProducts";
import Cookies from "js-cookie";
import Unauthorized from "@/components/Unauthorized";
import { LanguageContext } from "../../contexts/languageContext/context";
import { useContext } from "react";

function Profile() {
  let token = Cookies.get("token");
  if (!token && typeof window !== "undefined")
    token = localStorage.getItem("token");
  const [isTranslate, setIsTranslate] = useState(false);
  const { data: userInfo }: any = useSWR("api/me");
  const darkMode = userInfo && userInfo.user_details.profile.dark_mode;
  const { getSectionLanguage, language } = useContext(LanguageContext);
  const getAll = getSectionLanguage("all");
  const getLogin = getSectionLanguage("login");

  const myLoader = () => {
    return `${userInfo.user_details.profile.avatar_path}`;
  };
  const [statusType, setStatusType] = useState("");
  const {
    data: postsList,
    isValidating,
    mutate,
  }: any = useSWR(`api/my_products${statusType}`);

  const [isLoadingSeler, setIsLoadingSeler] = useState(false);
  const beseller = async () => {
    setIsLoadingSeler(true);
    try {
      const res = await API.post("api/sellers/store", null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Authentication was successful.
      if (res.status === 200) {
        setIsLoadingSeler(false);
        router.push("/user/editSeller");
      }
    } catch (error: any) {
      message.error(getAll("An_unexpected_error"));
      setIsLoadingSeler(false);
    }
  };
  const [isLess, setIsLess] = useState(true);
  const detectHeight: any = createRef();
  const [isOverflow, setIsOverflow] = useState(false);
  useEffect(() => {
    setIsOverflow(
      detectHeight &&
        detectHeight.current &&
        detectHeight.current.scrollHeight > 230
    ),
      [detectHeight, detectHeight.current];
  }, [detectHeight]);
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
            title={getLogin("Your_account_is_2")}
            subTitle={getLogin("Your_account_is")}
            extra={
              <Link href="/user/personalInformations">
                <a className="btn butt-primary butt-md">
                  {getLogin("Go_to_Edit")}
                </a>
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
                getLogin("X’s_profile") +
                userInfo.user_details.profile.first_name +
                " " +
                userInfo.user_details.profile.last_name
              }
              metaDescription={
                getLogin("X’s_profile") +
                userInfo.user_details.profile.first_name +
                " " +
                userInfo.user_details.profile.last_name
              }
              ogDescription={
                getLogin("X’s_profile") +
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
                          {getLogin("Profile_editing")}
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
                      {getLogin("Copy_my_profiles")}
                    </button>
                  </p>
                </div>
                {/* <div className="portfolios-container">
                  <nav className="portfolios-nav d-flex">
                    <ul className="portfolios-nav-list me-auto">
                      <li className="active">
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
                      <li>
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
                </div> */}
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
                    {!userInfo.user_details.profile.profile_seller && (
                      <div className="be-seller-aside mb-2">
                        <h3 className="title">{getAll("Become_a_seller")}</h3>
                        <p className="text">{getLogin("Do_you_ant")}</p>
                        <button
                          onClick={beseller}
                          disabled={isLoadingSeler}
                          className="btn butt-green butt-md"
                          style={{ width: "100%" }}
                        >
                          إنشاء بروفايل بائع
                        </button>
                      </div>
                    )}
                    {userInfo.user_details.profile.profile_seller && (
                      <>
                        <div className="pb-1 mb-2">
                          <Card
                            title={getLogin("Brief_me_about")}
                            extra={
                              <Link href="/user/editSeller">
                                <a className="edit-button flex-center">
                                  <span className="material-icons material-icons-outlined">
                                    edit
                                  </span>
                                </a>
                              </Link>
                            }
                          >
                            <div
                              ref={detectHeight}
                              className={
                                "user-bro " + (isLess ? "is-less" : "")
                              }
                              dangerouslySetInnerHTML={
                                isTranslate
                                  ? {
                                      __html:
                                        userInfo.user_details.profile
                                          .profile_seller[`bio_${language}`],
                                    }
                                  : {
                                      __html:
                                        userInfo.user_details.profile
                                          .profile_seller.bio,
                                    }
                              }
                            />

                            {isOverflow && (
                              <button
                                onClick={() => {
                                  setIsLess(!isLess);
                                }}
                                type="button"
                                className={
                                  "read-more-btn " + (isLess ? "is-less" : "")
                                }
                              >
                                {isLess
                                  ? getLogin("Read_more")
                                  : getLogin("Read_less")}
                              </button>
                            )}
                            <div className="d-flex justify-content-center">
                              <button
                                className="btn butt-sm butt-primary-text flex-center"
                                onClick={() => setIsTranslate(!isTranslate)}
                              >
                                <span className="material-icons material-icons-outlined">
                                  translate
                                </span>
                                {isTranslate
                                  ? "إعادة الى اللغة الاصلية"
                                  : "ترجمة"}
                              </button>
                            </div>
                          </Card>
                        </div>
                      </>
                    )}
                    <div className="profile-content-body">
                      <div className="content-title">
                        <div className="d-flex">
                          <h3 className="title flex-center">
                            <span className="material-icons material-icons-outlined">
                              account_circle
                            </span>
                            {getLogin("Personal_information")}
                          </h3>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-4">
                          <div className="content-text-item">
                            <h3 className="text-label">
                              {getLogin("First_name")}
                            </h3>
                            <p className="text-value">
                              {userInfo.user_details.profile.first_name}
                            </p>
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className="content-text-item">
                            <h3 className="text-label">
                              {getLogin("Last_name")}
                            </h3>
                            <p className="text-value">
                              {userInfo.user_details.profile.last_name}
                            </p>
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className="content-text-item">
                            <h3 className="text-label">
                              {getLogin("Phone_number")}
                            </h3>
                            <p className="text-value">
                              {userInfo.user_details.phone
                                ? userInfo.user_details.code_phone?.split(
                                    "+"
                                  )[1] + userInfo.user_details.phone
                                : "غير مكتمل"}
                              {userInfo.user_details.phone && "+"}
                            </p>
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className="content-text-item">
                            <h3 className="text-label">
                              {getLogin("Currency")}
                            </h3>
                            <p className="text-value">
                              {
                                userInfo.user_details.profile.currency
                                  .symbol_native
                              }
                            </p>
                          </div>
                        </div>
                        {userInfo.user_details.profile.country !== null && (
                          <div className="col-sm-4">
                            <div className="content-text-item">
                              <h3 className="text-label">
                                {getLogin("Country")}
                              </h3>
                              <p className="text-value">
                                {userInfo.user_details.profile.country.name_ar}
                              </p>
                            </div>
                          </div>
                        )}
                        <div className="col-sm-4">
                          <div className="content-text-item">
                            <h3 className="text-label">{getLogin("Gender")}</h3>
                            <p className="text-value">
                              {userInfo.user_details.profile &&
                              userInfo.user_details.profile.gender == null
                                ? ""
                                : userInfo.user_details.profile &&
                                  (userInfo.user_details.profile.gender == 0
                                    ? getLogin("woman")
                                    : getLogin("Man"))}
                            </p>
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className="content-text-item">
                            <h3 className="text-label">
                              {getLogin("Birthday")}
                            </h3>
                            <p className="text-value">
                              {userInfo.user_details.profile.date_of_birth ==
                              null
                                ? ""
                                : userInfo.user_details.profile.date_of_birth}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {userInfo.user_details.profile.profile_seller && (
                <Spin spinning={isValidating}>
                  <MyProducts
                    refresh={mutate}
                    setStatusType={setStatusType}
                    postsList={postsList}
                  />
                </Spin>
              )}
            </div>
          </>
        )}
      </div>
    );
}

Profile.getLayout = function getLayout(page: any): ReactElement {
  return <Layout>{page}</Layout>;
};
export default Profile;
