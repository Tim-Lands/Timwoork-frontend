import Layout from "@/components/Layout/HomeLayout";
import { Result, message, Card } from "antd";
import React, { createRef, ReactElement, useEffect, useState } from "react";
import Link from "next/link";
import Loading from "components/Loading";
import PortfolioProfileHeader from "@/components/Portfolio/PortfolioProfileHeader";
import cookies from "next-cookies";
import { ProfileService } from "@/services/profile";
import Navbar from "@/components/Portfolio/navbar";
import router from "next/router";
import API from "../../../config";
import { ProfileActions } from "@/store/profile/profileActions";
import { MetaTags } from "@/components/SEO/MetaTags";
import Sidebar from "@/components/Profile/Sidebar";
import MyProducts from "@/components/Profile/MyProducts";
import Unauthorized from "@/components/Unauthorized";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import PostInner from "@/components/Post/PostInner";

function Profile({
  otherUser,
  isMeProp,
  username,
  errorFetch,
}: {
  otherUser: any;
  isMeProp: boolean;
  username: string;
  errorFetch: boolean;
}) {
  const dispatch = useAppDispatch();

  const {
    user: meUser,
    languages: { getAll },
    profile: meProfile,
    profile: { profile_seller: profile_seller_me },
    currency: { my: currency },
  } = useAppSelector((state) => state);
  const isMe = username === meUser.username ? true : isMeProp;
  if (errorFetch && !isMe) router.push("/user/profile/me");

  const [isLoadingSeler, setIsLoadingSeler] = useState(false);
  const detectHeight: any = createRef();
  const user = isMe ? meUser : otherUser;
  const profile = isMe ? meProfile : otherUser.profile;
  const profile_seller = isMe
    ? profile_seller_me
    : otherUser.profile.profile_seller;
  useEffect(() => {
    if (profile_seller.loaded) return;
    dispatch(ProfileActions.getProfileSellerData());
  }, [profile_seller]);

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

  if (!user.email_verified && !user.loading && isMe) {
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
  } else if (
    profile.steps < 1 &&
    profile.steps !== null &&
    !user.loading &&
    isMe
  ) {
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
  } else if (!user.loading && !profile.loading)
    return (
      <div className="container pt-4 mt-2">
        {!user.isLogged && isMe && <Unauthorized />}
        {profile && (
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
            <div className="portfolios-container">
              <div className="timlands-profile-content">
                <PortfolioProfileHeader
                  showAddBtn={false}
                  otherProfile={!isMe && profile}
                  otherUsername={user.username}
                />
                <Navbar active="profile" username={!isMe && user.username} />
              </div>
              <div className="row">
                {isMe && (
                  <Sidebar
                    withdrawable_amount={profile.withdrawable_amount}
                    pending_amount={profile.pending_amount}
                  />
                )}
                {profile_seller && (
                  <div className={isMe ? "col-lg-8" : "col-lg-12"}>
                    <div className="timlands-profile-content">
                      {isMe && !profile_seller.data.id && (
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
                      {(profile_seller?.data?.id || !isMe) && (
                        <>
                          <div className="pb-1 mb-2">
                            <Card
                              title={getAll("Brief_me_about")}
                              extra={
                                isMe && (
                                  <Link href="/user/editSeller">
                                    <a className="edit-button flex-center">
                                      <span className="material-icons material-icons-outlined">
                                        edit
                                      </span>
                                    </a>
                                  </Link>
                                )
                              }
                            >
                              <div
                                ref={detectHeight}
                                className={"user-bro "}
                                dangerouslySetInnerHTML={{
                                  __html: isMe
                                    ? profile_seller.data.bio
                                    : profile_seller.bio,
                                }}
                              />
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
                          {isMe && (
                            <div className="col-sm-4">
                              <div className="content-text-item">
                                <h3 className="text-label">
                                  {getAll("Phone_number")}
                                </h3>
                                <p className="text-value">
                                  {user.phone
                                    ? user.code_phone?.split("+")[1] +
                                      user.phone
                                    : getAll("Uncompleted")}
                                  {user.phone && "+"}
                                </p>
                              </div>
                            </div>
                          )}
                          {isMe && (
                            <div className="col-sm-4">
                              <div className="content-text-item">
                                <h3 className="text-label">
                                  {getAll("Currency")}
                                </h3>
                                <p className="text-value">
                                  {currency.symbol_native}
                                </p>
                              </div>
                            </div>
                          )}
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
                          {isMe && (
                            <div className="col-sm-4">
                              <div className="content-text-item">
                                <h3 className="text-label">
                                  {getAll("Birthday")}
                                </h3>
                                <p className="text-value">
                                  {profile.date_of_birth}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {isMe && profile_seller.data.id && <MyProducts />}
              {!isMe && (
                <>
                  <div
                    className="posts-aside-header"
                    style={{
                      textAlign: "center",
                      paddingBlock: 10,
                    }}
                  >
                    <h1
                      className="title me-auto"
                      style={{ fontWeight: "bold", fontSize: 26 }}
                    >
                      {getAll("Services")}
                    </h1>
                  </div>
                  <div className="posts-aside-body ">
                    <div className="row">
                      {profile_seller.products.map((e: any) => {
                        return (
                          <div key={e.id} className={"col-sm-6 col-lg-4"}>
                            <PostInner
                              className="mb-3"
                              avatar={user.profile.avatar_path}
                              size="small"
                              title={e.title}
                              author={
                                user.profile &&
                                user.profile.first_name +
                                  " " +
                                  user.profile.last_name
                              }
                              rate={e.ratings_avg_rating}
                              username={
                                user.profile.profile_seller && user.username
                              }
                              price={e.price}
                              slug={e.id}
                              thumbnail={e.full_path_thumbnail}
                              buyers={e.count_buying}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </>
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
export async function getServerSideProps(ctx) {
  const {
    query: { user: username },
  } = ctx;
  const isMeProp = username === "me";
  if (isMeProp)
    return { props: { otherUser: null, errorFetch: true, isMeProp, username } };

  try {
    const lang = cookies(ctx).lang || "";
    const otherUser = await ProfileService.getOne(username, lang);
    return { props: { otherUser, errorFetch: false, isMeProp, username } };
  } catch (error) {
    return { props: { otherUser: null, errorFetch: true, isMeProp, username } };
  }
}
export default Profile;
