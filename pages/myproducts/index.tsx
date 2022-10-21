import Layout from "@/components/Layout/HomeLayout";
import { Badge, Result, Spin } from "antd";
import React, { ReactElement, useState } from "react";
import { useAppSelector } from "@/store/hooks";

import Link from "next/link";
import Image from "next/image";
import useSWR from "swr";
import { MetaTags } from "@/components/SEO/MetaTags";
import Unauthorized from "@/components/Unauthorized";
import MyProducts from "@/components/Profile/MyProducts";

function index() {
  const { getAll, language } = useAppSelector((state) => state.languages);

  const [statusType, setStatusType] = useState("");
  const { data: userInfo }: any = useSWR("api/me");

  const user = useAppSelector((state) => state.user);
  const profile = useAppSelector((state) => state.profile);

  const {
    data: postsList,
    isValidating,
    mutate,
  }: any = useSWR(`api/my_products${statusType}`);
  const veriedEmail = user.email_verified;
  if (profile.steps < 1)
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
  const myLoader = () => {
    return `${profile.avatar_path}`;
  };
  return (
    <div className="py-3">
      {!user.isLogged && !user.loading && <Unauthorized />}
      {userInfo?.user_details?.profile && (
        <>
          <MetaTags
            title={getAll("My_services")}
            metaDescription={getAll("Home")}
            ogDescription={getAll("Home")}
          />
          <div className="container">
            <div className="timlands-profile-content">
              <div className="profile-content-header">
                <Badge
                  color={"green"}
                  count={getAll("Online")}
                  offset={[10, 10]}
                >
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
                    @{user.username} |
                    <span className="app-label">
                      <span className="material-icons material-icons-outlined">
                        badge
                      </span>{" "}
                      {
                        userInfo?.user_details?.profile?.profile_seller?.level[
                          which(language)
                        ]
                      }
                    </span>
                  </p>
                </div>
              </div>
              <Spin spinning={isValidating}>
                {veriedEmail && (
                  <MyProducts
                    refresh={mutate}
                    setStatusType={setStatusType}
                    postsList={postsList}
                  />
                )}
              </Spin>
            </div>
          </div>
        </>
      )}
    </div>
  );
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
index.getLayout = function getLayout(page: any): ReactElement {
  return <Layout>{page}</Layout>;
};
export default index;
