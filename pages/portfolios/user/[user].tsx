import React, { ReactElement } from "react";
import Layout from "@/components/Layout/HomeLayout";
import { MetaTags } from "@/components/SEO/MetaTags";
import Portfolio from "@/components/Post/Portfolio";
import Navbar from "components/Portfolio/navbar";
import PortfolioProfileHeader from "@/components/Portfolio/PortfolioProfileHeader";
import { useAppSelector } from "@/store/hooks";
import { Empty } from "antd";
import router from "next/router";
function Index() {
  const {
    languages: { getAll, language },
    profile,
  } = useAppSelector((state) => state);

  const title =
    language === "ar"
      ? getAll("X’s_business_gallery") + profile.full_name
      : profile.full_name + getAll("X’s_business_gallery");
  const projects = [];
  return (
    <div className="container pt-4 mt-2">
      <MetaTags title={title} metaDescription={title} ogDescription={title} />
      <div className="portfolios-container">
        <PortfolioProfileHeader showAddBtn={projects.length !== 0} />
        <Navbar active="portfolio" />
        <div className="portfolios-content">
          <div className="row">
            {projects.map(() => (
              <div className="col-sm-6 col-lg-3" key={1}>
                <Portfolio
                  title={getAll("This_text_is")}
                  thumbnail={`https://mir-s3-cdn-cf.behance.net/project_modules/1400/165af265485593.5af5bf8eae575.jpg`}
                  slug={`dedej-djeded-wedw-wedwef-hgc`}
                  author={"أحمد يحيى"}
                  level={getAll("New_seller")}
                  avatar={`/avatar.png`}
                  views={72868}
                  username={`aboumegouass`}
                />
              </div>
            ))}
            {projects.length === 0 && (
              <div className="bg-white py-3 rounded mb-3">
                <Empty
                  image="/hero.png"
                  imageStyle={{
                    height: 100,
                  }}
                  description={<span>{getAll("There_is_no_projects")}</span>}
                >
                  <button
                    onClick={() => {
                      router.push("/portfolios/modify/add");
                    }}
                    className="btn butt-green mx-1 flex-center butt-sm w-fit"
                  >
                    <span className="material-icons material-icons-outlined">
                      add_circle
                    </span>{" "}
                    {getAll("Add_New_project")}
                  </button>
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
export default Index;
