import React, { ReactElement, useEffect, useState } from "react";
import Layout from "@/components/Layout/HomeLayout";
import cookies from "next-cookies";
import { MetaTags } from "@/components/SEO/MetaTags";
import Portfolio from "@/components/Post/Portfolio";
import { ProfileService } from "services/profile";
import Navbar from "components/Portfolio/navbar";
import PortfolioProfileHeader from "@/components/Portfolio/PortfolioProfileHeader";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Empty } from "antd";
import router from "next/router";
import { PortfolioActions } from "@/store/portfolio/portfolioActions";
import Loading from "@/components/Loading";
import { ProjectsServices } from "@/services/projects";
function Index({
  otherUser,

  portfolio,
  errorFetch,
  username,
}: {
  otherUser: any;

  portfolio: any;
  errorFetch: boolean;
  username: any;
}) {
  const {
    user: meUser,
    profile: meProfile,
    languages: { getAll, language },
    portfolio: {
      user: { data: meData, loading, loaded },
      project,
    },
  } = useAppSelector((state) => state);
  const [isMe, setIsMe] = useState(
    username.toLowerCase() === meUser.username.toLowerCase() ||
      username === "me" ||
      username == meUser.id
      ? true
      : false
  );
  if (errorFetch && !isMe) router.push("/user/profile/me");
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (loaded) return;
    if (isMe && meUser.username) {
      dispatch(
        PortfolioActions.getUserProjects({
          username: meUser.username,
        })
      );
    }
  }, [isMe, meUser]);
  const user = isMe ? meUser : otherUser;
  const [data, setData] = useState(isMe ? meData : portfolio);
  useEffect(() => {
    setIsMe(
      username.toLowerCase() === meUser.username.toLowerCase() ||
        username === "me" ||
        username == meUser.id
        ? true
        : false
    );
  }, [meUser, otherUser]);
  useEffect(() => {
    setData(isMe ? meData : portfolio);
  }, [isMe, meData, portfolio]);

  const profile = isMe ? meProfile : user?.profile;

  const title =
    language === "ar"
      ? getAll("X’s_business_gallery") + profile.full_name
      : profile?.full_name + getAll("X’s_business_gallery");
  return (
    <div className="container pt-4 mt-2">
      <MetaTags title={title} metaDescription={title} ogDescription={title} />
      <div className="portfolios-container">
        <PortfolioProfileHeader
          showAddBtn={isMe ? data?.length !== 0 : false}
          otherProfile={!isMe && otherUser.profile}
          otherUsername={user.username}
        />
        <Navbar active="portfolio" username={!isMe && user.username} />
        <div className="portfolios-content">
          <div className="row">
            {loading && isMe && <Loading />}
            {(!loading || !isMe) &&
              data?.map((portfolio) => (
                <div className="col-sm-6 col-lg-3" key={portfolio.id}>
                  <Portfolio
                    title={portfolio.title}
                    thumbnail={portfolio.cover_url}
                    slug={portfolio.id}
                    author={"any"}
                    fans_count={portfolio.fans_count}
                    level={getAll("New_seller")}
                    avatar={`/avatar.png`}
                    views={72868}
                    user={true}
                    likes={isMe}
                    username={"me"}
                    isLiked={portfolio.is_liked}
                    onLike={async () => {
                      if (meUser.isLogged) {
                        setData((data) => {
                          return data.map((element) => {
                            if (element.id === portfolio.id) {
                              return {
                                ...element,
                                is_liked: !element.is_liked,
                              };
                            } else return element;
                          });
                        });
                        await dispatch(
                          PortfolioActions.toggleLikeBack({ id: portfolio.id })
                        );
                        if (project.id == portfolio.id) {
                          dispatch(
                            PortfolioActions.getUserProject({ id: project.id })
                          );
                        }
                      } else {
                        router.push("/login");
                      }
                    }}
                  />
                </div>
              ))}
            {((data?.length === 0 && !loading) ||
              (data.length === 0 && !isMe)) && (
              <div className="bg-white py-3 rounded mb-3">
                <Empty
                  image="/hero.png"
                  imageStyle={{
                    height: 100,
                  }}
                  description={<span>{getAll("There_is_no_projects")}</span>}
                >
                  {isMe && (
                    <button
                      onClick={() => {
                        router.push("/portfolios/project-modify/add");
                      }}
                      className="btn butt-green mx-1 flex-center butt-sm w-fit"
                    >
                      <span className="material-icons material-icons-outlined">
                        add_circle
                      </span>{" "}
                      {getAll("Add_New_project")}
                    </button>
                  )}
                </Empty>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
Index.getLayout = function getLayout(page: any): ReactElement {
  return <Layout>{page}</Layout>;
};
export async function getServerSideProps(ctx) {
  const {
    query: { user: username },
  } = ctx;
  const isMeProp = username === "me";
  if (isMeProp)
    return {
      props: {
        portfolio: null,
        otherUser: null,
        errorFetch: true,

        username,
      },
    };
  try {
    const lang = cookies(ctx).lang || "";
    const token = cookies(ctx).token || "";
    const [portfolio, otherUser] = await Promise.all([
      ProjectsServices.getAll(username, lang, token),
      ProfileService.getOne(username, lang),
    ]);

    return {
      props: { portfolio, otherUser, errorFetch: false, username },
    };
  } catch (error) {
    return {
      props: {
        portfolio: null,
        otherUser: null,
        errorFetch: true,

        username,
      },
    };
  }
}
export default Index;
