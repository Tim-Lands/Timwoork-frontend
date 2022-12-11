import React, { ReactElement } from "react";
import Layout from "@/components/Layout/HomeLayout";
import { MetaTags } from "@/components/SEO/MetaTags";
import Portfolio from "@/components/Post/Portfolio";
import Navbar from "components/Portfolio/navbar";
import PortfolioProfileHeader from "@/components/Portfolio/PortfolioProfileHeader";
import { useAppSelector } from "@/store/hooks";
import { Empty } from "antd";

function Index() {
  const { getAll } = useAppSelector((state) => state.languages);
  const favorites = [];
  return (
    <div className="container pt-4 mt-2">
      <MetaTags
        title={getAll("Favorite")}
        metaDescription={getAll("Favorite")}
        ogDescription={getAll("Favorite")}
      />
      <div className="portfolios-container">
        <PortfolioProfileHeader showAddBtn={false} />
        <Navbar active="favorite" />

        <div className="portfolios-content">
          <div className="row">
            {favorites.map(() => (
              <div key={1} className="col-sm-6 col-lg-3">
                <Portfolio
                  title="A very tasty and cool recipe for pilaf inside a huge"
                  thumbnail={`https://mir-s3-cdn-cf.behance.net/project_modules/1400/165af265485593.5af5bf8eae575.jpg`}
                  slug={`dedej-djeded-wedw-wedwef-hgc`}
                  author={"Abdelhamid Boumegouas"}
                  level={`New Seller`}
                  avatar={`/avatar.png`}
                  views={72868}
                  username={`aboumegouass`}
                  me={false}
                />
              </div>
            ))}
            {favorites.length === 0 && (
              <div className="bg-white py-3 rounded mb-3">
                <Empty
                  image="/hero.png"
                  imageStyle={{
                    height: 100,
                  }}
                  description={<span>{getAll("Favorites_projects")}</span>}
                ></Empty>
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
