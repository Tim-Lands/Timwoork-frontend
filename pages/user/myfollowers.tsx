import Layout from "@/components/Layout/HomeLayout";
import { Result } from "antd";
import React, { ReactElement, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "components/Portfolio/navbar";
import router from "next/router";
import { MetaTags } from "@/components/SEO/MetaTags";
import Loading from "@/components/Loading";
import Sidebar from "@/components/Profile/Sidebar";
import Unauthorized from "@/components/Unauthorized";
import FollowItem from "@/components/FollowItem";
import { useAppSelector } from "@/store/hooks";

function MyFollowers() {
  const user = useAppSelector((state) => state.user);
  const profile = useAppSelector((state) => state.profile);

  const { getAll } = useAppSelector((state) => state.languages);

  const myLoader = () => {
    return `${profile.avatar_path}`;
  };
  useEffect(() => {
    if (!user.isLogged && !user.loading) {
      router.push("/login");
      return;
    }
  }, [user]);
  if (profile.steps < 1) {
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
  } else
    return (
      <div className="py-3">
        {user.loading && <Loading />}
        {!user.isLogged && !user.loading && <Unauthorized />}
        {user.isLogged && (
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
                          {getAll("Edit_profile")}
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
                <Navbar active="followers" />
              </div>
              <div className="row">
                <Sidebar
                  withdrawable_amount={profile.withdrawable_amount}
                  pending_amount={profile.pending_amount}
                />
                <div className="col-lg-8">
                  <div className="timlands-profile-content">
                    <div className="profile-content-body">
                      <div className="page-header sm">
                        <h3 className="title">{getAll("Following")}</h3>
                      </div>
                      <div className="timlands-followers-users">
                        <FollowItem
                          avatar="/avatar3.jpg"
                          fullname="عبد الحميد بومقواس"
                          level={getAll("New_seller")}
                        />
                        <FollowItem
                          avatar="/avatar2.jpg"
                          fullname="أحمد يحيى"
                          level={getAll("New_seller")}
                        />
                        <FollowItem
                          avatar="/avatar3.jpg"
                          fullname="عبد الحميد بومقواس"
                          level={getAll("New_seller")}
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
