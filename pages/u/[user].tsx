import React, { createRef, ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Layout from "@/components/Layout/HomeLayout";
import { Badge, Card } from "antd";
import { MetaTags } from "@/components/SEO/MetaTags";
import useSWR from "swr";
import PropTypes from "prop-types";
import Loading from "@/components/Loading";
import API from "../../config";
import PostInner from "@/components/Post/PostInner";
import { LanguageContext } from "../../contexts/languageContext/context";
import { useContext } from "react";

const User = ({ query, stars }) => {
  // Return statement.
  const { data: userInfo }: any = useSWR(`api/profiles/${query.user}`);
  const { data: currentUserInfo }: any = useSWR("api/me");
  const router = useRouter();
  const User = userInfo && userInfo.data;
  const userId = User && User.id;
  const currentUserId = currentUserInfo && currentUserInfo.user_details.id;
  const APIURL = "";
  const myLoader = () => {
    return `${APIURL}${User.profile.avatar_path}`;
  };

  const [isLess, setIsLess] = useState(true);
  const [isOverflow, setIsOverflow] = useState(false);
  const detectHeight: any = createRef();
  const { getSectionLanguage, language } = useContext(LanguageContext);
  const getAll = getSectionLanguage();

  useEffect(() => {
    setIsOverflow(
      detectHeight &&
        detectHeight.current &&
        detectHeight.current.scrollHeight > 230
    ),
      [detectHeight, detectHeight.current];
    if (userId && userId == currentUserId) router.push("/user/profile");
  }, [detectHeight]);
  return (
    <div className="py-3 mt-3">
      <MetaTags
        title={stars.data.profile.full_name}
        metaDescription={
          stars.data.profile.profile_seller &&
          stars.data.profile.profile_seller.bio
        }
        ogDescription={
          stars.data.profile.profile_seller &&
          stars.data.profile.profile_seller.bio
        }
        ogImage={stars.data.profile.avatar_path}
        ogUrl={`https://timwoork.com/u/${stars.data.username}`}
      />
      {!userInfo && <Loading />}
      {userInfo && User.profile && (
        <>
          <div className="container">
            <div className="timlands-profile-content py-3">
              <div className="profile-content-header py-4">
                <Badge
                  color={User.status == 0 ? "#ccc" : "green"}
                  count={
                    User.status == 0 ? getAll("Offline") : getAll("Online")
                  }
                  offset={[10, 10]}
                >
                  <div className="profile-content-avatar">
                    {User.profile.avatar_path == "avatar.png" ? (
                      <Image src="/avatar2.jpg" width={120} height={120} />
                    ) : (
                      <Image
                        loader={myLoader}
                        src={APIURL + User.profile.avatar_path}
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
                    {User.profile && User.profile.full_name}
                  </h4>
                  <p className="text">
                    @{User.username} |
                    <span className="app-label">
                      {" "}
                      {User &&
                        User.profile &&
                        User.profile.level &&
                        User.profile.level[which(language)]}{" "}
                    </span>
                  </p>
                </div>
                <p className="profile-buttons">
                  <button
                    className="btn butt-primary2 flex-center butt-sm"
                    onClick={() =>
                      navigator.clipboard.writeText(
                        `https://timwoork.com/u/${query?.user}`
                      )
                    }
                  >
                    <span className="material-icons material-icons-outlined">
                      copy
                    </span>{" "}
                    {getAll("Copy_my_profiles")}
                  </button>
                </p>
                {/* {User && User.profile.profile_seller && User.profile.profile_seller.portfolio &&
                                <p className="py-3">
                                    <a rel="noreferrer" target="_blank" className="btn butt-sm butt-primary2" href={`${User.profile.profile_seller.portfolio}`}>مشاهدة رابط الأعمال</a>
                                </p>
                            } */}
              </div>
            </div>
            <div className={"row justify-content-md-center"}>
              <div className="col-lg-8">
                <div className="timlands-profile-content">
                  {User &&
                    User.profile.profile_seller &&
                    User.profile.profile_seller.bio && (
                      <div className="pb-1 mb-2">
                        <Card title={getAll("Brief_me_about")}>
                          <div
                            ref={detectHeight}
                            className={"user-bro " + (isLess ? "is-less" : "")}
                            dangerouslySetInnerHTML={{
                              __html:
                                User &&
                                User.profile.profile_seller[whichBio(language)],
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
                      <div className="col-sm-6">
                        <div className="content-text-item">
                          <h3 className="text-label">{getAll("First_name")}</h3>
                          <p className="text-value">
                            {User.profile && User.profile.first_name}
                          </p>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="content-text-item">
                          <h3 className="text-label">{getAll("Last_name")}</h3>
                          <p className="text-value">
                            {User.profile && User.profile.last_name}
                          </p>
                        </div>
                      </div>
                      {User && User.profile.country !== null && (
                        <div className="col-sm-6">
                          <div className="content-text-item">
                            <h3 className="text-label">{getAll("Country")}</h3>
                            <p className="text-value">
                              {User.profile.country[which(language)]}
                            </p>
                          </div>
                        </div>
                      )}
                      <div className="col-sm-6">
                        <div className="content-text-item">
                          <h3 className="text-label">{getAll("Gender")}</h3>
                          <p className="text-value">
                            {User.profile && User.profile.gender == null
                              ? ""
                              : User.profile &&
                                (User.profile.gender == 0
                                  ? getAll("woman")
                                  : getAll("Man"))}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
                <div className="posts-aside-body">
                  <div className="row">
                    {User &&
                      User.profile.profile_seller &&
                      User.profile.profile_seller.products &&
                      User.profile.profile_seller.products.map((e: any) => (
                        <div key={e.id} className={"col-sm-6 col-lg-4"}>
                          <PostInner
                            avatar={`/avatar.png`}
                            size="small"
                            title={e[whichTitle(language)]}
                            author={
                              e.profile_seller &&
                              e.profile_seller.profile.first_name +
                                " " +
                                e.profile_seller.profile.last_name
                            }
                            rate={e.ratings_avg_rating}
                            username={
                              e.profile_seller &&
                              e.profile_seller.profile.user.username
                            }
                            price={e.price}
                            slug={e.slug}
                            thumbnail={e.full_path_thumbnail}
                            buyers={e.count_buying}
                          />
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default User;
User.getLayout = function getLayout(page: any): ReactElement {
  return <Layout>{page}</Layout>;
};
export async function getServerSideProps({ query }) {
  try {
    const uriString = encodeURI(`api/profiles/${query.user}`);
    // Fetch data from external API
    const res = await API.get(uriString);

    // Pass data to the page via props
    return { props: { stars: res.data, query, errorFetch: false } };
  } catch (error) {
    return { props: { stars: null, query, errorFetch: true } };
  }
}
const whichTitle = (language) => {
  switch (language) {
    case "ar":
      return "title_ar";
    case "en":
      return "title_en";
    case "fr":
      return "title_fr";
  }
};
const which = (language) => {
  switch (language) {
    case "fr":
      return "name_fr";
    case "ar":
      return "name_ar";
    case "en":
      return "name_en";
  }
};
const whichBio = (language) => {
  switch (language) {
    case "ar":
      return "bio_ar";
    case "en":
      return "bio_en";
    case "fr":
      return "bio_fr";
  }
};
User.propTypes = {
  query: PropTypes.any,
  stars: PropTypes.any,
};
