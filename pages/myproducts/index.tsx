import Layout from "@/components/Layout/HomeLayout";
import { Badge, Result, Spin } from "antd";
import React, { ReactElement, useState, useContext } from "react";
import { LanguageContext } from "../../contexts/languageContext/context";
import Link from "next/link";
import Image from "next/image";
import useSWR from "swr";
import { MetaTags } from "@/components/SEO/MetaTags";
import Cookies from "js-cookie";
import Unauthorized from "@/components/Unauthorized";
import MyProducts from "@/components/Profile/MyProducts";

function index() {
  const { getSectionLanguage } = useContext(LanguageContext);
  const getAll = getSectionLanguage();
  const { language } = useContext(LanguageContext);
  let token = Cookies.get("token");
  if (!token && typeof window !== "undefined")
    token = localStorage.getItem("token");
  const [statusType, setStatusType] = useState("");
  // useEffect(() => {
  //   if (!token) {
  //   }
  // }, []);

  const { data: userInfo }: any = useSWR("api/me");
  const {
    data: postsList,
    isValidating,
    mutate,
  }: any = useSWR(`api/my_products${statusType}`);
  const veriedEmail = userInfo && userInfo.user_details.email_verified_at;
  if (userInfo && userInfo.user_details.profile.steps < 1)
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
    return `${userInfo.user_details.profile.avatar_path}`;
  };
  return (
    <div className="py-3">
      {!token && <Unauthorized />}
      {userInfo && userInfo.user_details.profile && (
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
                    {userInfo.user_details.profile.avatar_path ==
                    "avatar.png" ? (
                      <Image src="/avatar2.jpg" width={120} height={120} />
                    ) : (
                      <Image
                        loader={myLoader}
                        src={userInfo.user_details.profile.avatar_path}
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
                    {userInfo.user_details.profile.first_name +
                      " " +
                      userInfo.user_details.profile.last_name}
                  </h4>
                  <p className="text">
                    @{userInfo.user_details.username} |
                    <span className="app-label">
                      <span className="material-icons material-icons-outlined">
                        badge
                      </span>{" "}
                      {userInfo.user_details.profile &&
                        userInfo.user_details.profile.profile_seller.level[
                          which(language)
                        ]}
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
  }
};
index.getLayout = function getLayout(page: any): ReactElement {
  return <Layout>{page}</Layout>;
};
export default index;
