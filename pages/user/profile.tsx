import Layout from "@/components/Layout/HomeLayout";
import { Result, message, Card, Spin } from "antd";
import React, { createRef, ReactElement, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Loading from "@/components/Loading";
import router from "next/router";
import API from "../../config";
import useSWR from "swr";
import { MetaTags } from "@/components/SEO/MetaTags";
import Sidebar from "@/components/Profile/Sidebar";
import MyProducts from "@/components/Profile/MyProducts";
import Unauthorized from "@/components/Unauthorized";
import { useAppSelector } from "../../store/hooks";

function Profile() {
  const profile = useAppSelector((state) => state.profile);

  const user = useAppSelector((state) => state.user);
  const [isTranslate, setIsTranslate] = useState(false);
  const { data: userInfo }: any = useSWR("api/me");
  const { getAll, language } = useAppSelector((state) => state.languages);

  const myLoader = () => {
    return `${profile.avatar_path}`;
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
          Authorization: `Bearer ${user.token}`,
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
    if (!user.isLogged && !user.loading) {
      router.push("/login");
    }
  }, [user.isLogged]);
  if (!user.email_verified && !user.loading) {
    return (
      <div className="row justify-content-md-center">
        <div className="col-md-5">
          <Result
            status="warning"
            title={getAll("Your_account_is_2")}
            subTitle={getAll("Your_account_is")}
            extra={
              <Link href="/email/verification">
                <a className="btn butt-primary butt-md">
                  {getAll("Go_to_Edit")}
                </a>
              </Link>
            }
          />
        </div>
      </div>
    );
  } else if (profile.steps < 1 && profile.steps !== null && !user.loading) {
    return (
      <div className="row justify-content-md-center">
        <div className="col-md-5">
          <Result
            status="warning"
            title={getAll("Your_account_is_2")}
            subTitle={getAll("Your_account_is")}
            extra={
              <Link href="/user/personalInformations">
                <a className="btn butt-primary butt-md">
                  {getAll("Go_to_Edit")}
                </a>
              </Link>
            }
          />
        </div>
      </div>
    );
  } else if (!user.loading)
    return (
      <div className="py-3">
        {!user.isLogged && <Unauthorized />}
        {profile && userInfo && (
          <>
            <MetaTags
              title={
                getAll("X’s_profile") +
                profile.first_name +
                " " +
                profile.last_name
              }
              metaDescription={
                getAll("X’s_profile") +
                profile.first_name +
                " " +
                profile.last_name
              }
              ogDescription={
                getAll("X’s_profile") +
                profile.first_name +
                " " +
                profile.last_name
              }
            />
            <div className="userProfileCont">
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
                      <span className="app-label"> {profile.level.name} </span>
                    </p>
                    <div className="button-edit">
                      <Link href="/user/personalInformations">
                        <a className="btn butt-primary flex-center butt-sm">
                          <span className="material-icons material-icons-outlined">
                            edit
                          </span>{" "}
                          {getAll("Profile_editing")}
                        </a>
                      </Link>
                    </div>
                  </div>
                  <p className="profile-buttons">
                    <button
                      className="btn butt-primary2 flex-center butt-sm"
                      onClick={() =>
                        navigator.clipboard.writeText(
                          `https://timwoork.com/u/${user.username}`
                        )
                      }
                    >
                      <span className="material-icons material-icons-outlined">
                        copy
                      </span>{" "}
                      {getAll("Copy_my_profiles")}
                    </button>
                  </p>
                </div>
              </div>
              <div className="row">
                <Sidebar
                  withdrawable_amount={profile.withdrawable_amount}
                  pending_amount={profile.pending_amount}
                  // darkMode={darkMode}
                />
                <div className="col-lg-8">
                  <div className="timlands-profile-content">
                    {!userInfo.user_details.profile.profile_seller && (
                      <div className="be-seller-aside mb-2">
                        <h3 className="title">{getAll("Become_a_seller")}</h3>
                        <p className="text">{getAll("Do_you_ant")}</p>
                        <button
                          onClick={beseller}
                          disabled={isLoadingSeler}
                          className="btn butt-green butt-md"
                          style={{ width: "100%" }}
                        >
                          {getAll("Create_a_seller")}
                        </button>
                      </div>
                    )}
                    {userInfo.user_details.profile.profile_seller && (
                      <>
                        <div className="pb-1 mb-2">
                          <Card
                            title={getAll("Brief_me_about")}
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
                                  ? getAll("Read_more")
                                  : getAll("Read_less")}
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
                            {getAll("Personal_information")}
                          </h3>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-4">
                          <div className="content-text-item">
                            <h3 className="text-label">
                              {getAll("First_name")}
                            </h3>
                            <p className="text-value">{profile.first_name}</p>
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className="content-text-item">
                            <h3 className="text-label">
                              {getAll("Last_name")}
                            </h3>
                            <p className="text-value">{profile.last_name}</p>
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className="content-text-item">
                            <h3 className="text-label">
                              {getAll("Phone_number")}
                            </h3>
                            <p className="text-value">
                              {user.phone
                                ? user.code_phone?.split("+")[1] + user.phone
                                : "غير مكتمل"}
                              {user.phone && "+"}
                            </p>
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className="content-text-item">
                            <h3 className="text-label">{getAll("Currency")}</h3>
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
                                {getAll("Country")}
                              </h3>
                              <p className="text-value">
                                {
                                  userInfo.user_details.profile.country[
                                    which(language)
                                  ]
                                }
                              </p>
                            </div>
                          </div>
                        )}
                        <div className="col-sm-4">
                          <div className="content-text-item">
                            <h3 className="text-label">{getAll("Gender")}</h3>
                            <p className="text-value">
                              {profile.gender == null
                                ? ""
                                : profile.gender == 0
                                ? getAll("woman")
                                : getAll("Man")}
                            </p>
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className="content-text-item">
                            <h3 className="text-label">{getAll("Birthday")}</h3>
                            <p className="text-value">
                              {profile.date_of_birth == null
                                ? ""
                                : profile.date_of_birth}
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
  else {
    return <Loading />;
  }
}
const which = (language) => {
  switch (language) {
    default:
      return "name_en";
    case "ar":
      return "name_ar";
    case "en":
      return "name_en";
    case "fr":
      return "name_fr";
  }
};
Profile.getLayout = function getLayout(page: any): ReactElement {
  return <Layout>{page}</Layout>;
};
export default Profile;
