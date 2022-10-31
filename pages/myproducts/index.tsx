import Layout from "@/components/Layout/HomeLayout";
import { Badge, Result } from "antd";
import React, { ReactElement, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import router from "next/router";
import { ProfileActions } from "@/store/profile/profileActions";
import Link from "next/link";
import Image from "next/image";
import { MetaTags } from "@/components/SEO/MetaTags";
import Loading from "@/components/Loading";
import MyProducts from "@/components/Profile/MyProducts";

function index() {
  const { getAll } = useAppSelector((state) => state.languages);
  const profile_seller = useAppSelector(
    (state) => state.profile.profile_seller
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (profile_seller.loaded) return;
    dispatch(ProfileActions.getProfileSellerData());
  }, [profile_seller]);

  const user = useAppSelector((state) => state.user);
  const profile = useAppSelector((state) => state.profile);

  const veriedEmail = user.email_verified;

  const myLoader = () => {
    return `${profile.avatar_path}`;
  };
  useEffect(() => {
    if (!user.isLogged && !user.loading) {
      router.push("/login");
      return;
    }
  }, [user]);
  if (profile.loading || user.loading) return <Loading />;
  if (profile.steps < 1 && !profile.loading && !user.loading) {
    return (
      <div className="row justify-content-md-center">
        <div className="col-md-5">
          <Result
            status="warning"
            title={getAll("Your_account_is")}
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
  }

  return (
    <div className="py-3">
      <>
        <MetaTags
          title={getAll("My_services")}
          metaDescription={getAll("Home")}
          ogDescription={getAll("Home")}
        />
        <div className="container">
          <div className="timlands-profile-content">
            <div className="profile-content-header">
              <Badge color={"green"} count={getAll("Online")} offset={[10, 10]}>
                <div className="profile-content-avatar">
                  {profile.avatar_path == "avatar.png" ? (
                    <Image src="/avatar2.jpg" width={120} height={120} />
                  ) : (
                    <Image
                      loader={myLoader}
                      src={profile.avatar_path}
                      quality={1}
                      width={120}
                      height={120}
                      placeholder="blur"
                      blurDataURL="/avatar2.jpg"
                    />
                  )}
                </div>
              </Badge>
              <div className="profile-content-head">
                <h4 className="title">
                  {profile.first_name + " " + profile.last_name}
                </h4>
                <p className="text">
                  {/* @{user.username} | */}
                  <span className="app-label">
                    <span className="material-icons material-icons-outlined">
                      badge
                    </span>{" "}
                    {profile_seller.data.level.name}
                  </span>
                </p>
              </div>
            </div>
            {veriedEmail && <MyProducts />}
          </div>
        </div>
      </>
    </div>
  );
}

index.getLayout = function getLayout(page: any): ReactElement {
  return <Layout>{page}</Layout>;
};
export default index;
