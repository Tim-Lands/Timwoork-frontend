import Layout from "@/components/Layout/HomeLayout";
import { Result, message, Card, Spin } from "antd";
import React, { createRef, ReactElement, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Loading from "@/components/Loading";
import router from "next/router";
import API from "../../config";
import { ProfileActions } from "@/store/profile/profileActions";
import { MetaTags } from "@/components/SEO/MetaTags";
import Sidebar from "@/components/Profile/Sidebar";
import MyProducts from "@/components/Profile/MyProducts";
import { MyProductsActions } from "@/store/myProducts/myProductsActions";
import Unauthorized from "@/components/Unauthorized";
import { useAppSelector, useAppDispatch } from "../../store/hooks";

function Profile() {
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state) => state.profile);
  const profile_seller = useAppSelector(
    (state) => state.profile.profile_seller
  );
  const currency = useAppSelector((state) => state.currency.my);
  const products = useAppSelector((state) => state.myProducts.products);
  const [statusType, setStatusType] = useState({});
  useEffect(() => {
    if (!products.loaded) {
      dispatch(MyProductsActions.getMyProducts({ params: statusType }));
    }
    if (!profile_seller.loaded) {
      dispatch(ProfileActions.getProfileSellerData());
    }
  }, [products, profile_seller]);

  const user = useAppSelector((state) => state.user);
  const { getAll } = useAppSelector((state) => state.languages);

  const myLoader = () => {
    return `${profile.avatar_path}`;
  };

  const [isLoadingSeler, setIsLoadingSeler] = useState(false);
  const beseller = async () => {
    setIsLoadingSeler(true);
    try {
      await API.post("api/sellers/store");
      setIsLoadingSeler(false);
      router.push("/user/editSeller");
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
  }, [user]);
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
        {profile && profile_seller.data.id && (
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
                    {!profile_seller.data.id && (
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
                    {profile_seller.data.id && (
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
                              dangerouslySetInnerHTML={{
                                __html: profile_seller.data.bio,
                              }}
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
                                : getAll("Uncompleted")}
                              {user.phone && "+"}
                            </p>
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className="content-text-item">
                            <h3 className="text-label">{getAll("Currency")}</h3>
                            <p className="text-value">
                              {currency.symbol_native}
                            </p>
                          </div>
                        </div>
                        {profile.country.name !== "" && (
                          <div className="col-sm-4">
                            <div className="content-text-item">
                              <h3 className="text-label">
                                {getAll("Country")}
                              </h3>
                              <p className="text-value">
                                {profile.country.name}
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
                              {profile.date_of_birth}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {profile_seller.data.id && (
                <Spin spinning={products.loading}>
                  <MyProducts
                    setStatusType={setStatusType}
                    postsList={products.data}
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

Profile.getLayout = function getLayout(page: any): ReactElement {
  return <Layout>{page}</Layout>;
};
export default Profile;
