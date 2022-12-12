import React, { ReactElement, useEffect } from "react";
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
  isMeProp,
  portfolio,
  errorFetch,
  username,
}: {
  otherUser: any;
  isMeProp: boolean;
  portfolio: any;
  errorFetch: boolean;
  username: string;
}) {
  const {
    user: meUser,
    languages: { getAll, language },
    portfolio: {
      user: { data: meData, loading },
    },
  } = useAppSelector((state) => state);
  const isMe = username === meUser.username ? true : isMeProp;
  if (errorFetch && !isMe) router.push("/user/profile/me");
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (isMe && meUser.username) {
      dispatch(
        PortfolioActions.getUserProjects({
          username: meUser.username,
        })
      );
    }
  }, [isMe, meUser]);
  const user = isMe ? meUser : otherUser;
  const data = isMe ? meData : portfolio;

  const title =
    language === "ar"
      ? getAll("X’s_business_gallery") + user?.profile?.full_name
      : user?.profile?.full_name + getAll("X’s_business_gallery");

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
              data?.map((portfolio, index) => (
                <div className="col-sm-6 col-lg-3" key={index}>
                  <Portfolio
                    title={portfolio.title}
                    thumbnail={portfolio.cover_url}
                    slug={portfolio.id}
                    author={"أحمد يحيى"}
                    level={getAll("New_seller")}
                    avatar={`/avatar.png`}
                    views={72868}
                    username={user.username}
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
        isMeProp,
        username,
      },
    };
  try {
    const lang = cookies(ctx).lang || "";
    const [portfolio, otherUser] = await Promise.all([
      ProjectsServices.getAll(username, lang),
      ProfileService.getOne(username, lang),
    ]);

    return {
      props: { portfolio, otherUser, errorFetch: false, isMeProp, username },
    };
  } catch (error) {
    return {
      props: {
        portfolio: null,
        otherUser: null,
        errorFetch: true,
        isMeProp,
        username,
      },
    };
  }
}
export default Index;
