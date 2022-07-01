import React, { ReactElement, useState, useContext } from "react";
import { LanguageContext } from "../../contexts/languageContext/context";
import Layout from "@/components/Layout/HomeLayout";
import { MetaTags } from "@/components/SEO/MetaTags";
import Portfolio from "@/components/Post/Portfolio";
import PortfolioSlider from "@/components/Post/PortfolioSlider";

function Index() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSettings, setIsSettings] = useState(false);
  const { language, getSectionLanguage } = useContext(LanguageContext);
  const getLanguage = getSectionLanguage("products");

  return (
    <div className="container pt-4 mt-2">
      <MetaTags
        title={"تصفح الخدمات"}
        metaDescription={"تصفح الخدمات"}
        ogDescription={"تصفح الخدمات"}
      />
      <div className="portfolios-slider">
        <div className="row">
          <div className="col-6 col-xl-3 p-0 slider-inner">
            <PortfolioSlider
              thumbnail={`/JuliaQ49-201801121901090270None.jpg`}
              author={`Ahmed Yahya`}
              level={`VIP Seller`}
              username={`wjw`}
              avatar={`/avatar2.jpg`}
            />
          </div>
          <div className="col-6 col-xl-3 p-0 slider-inner">
            <PortfolioSlider
              thumbnail={`/JuliaQ49-201801121901090270None.jpg`}
              author={`Ahmed Yahya`}
              level={`VIP Seller`}
              username={`wjw`}
              avatar={`/avatar2.jpg`}
            />
          </div>
          <div className="col-6 col-xl-3 p-0 slider-inner">
            <PortfolioSlider
              thumbnail={`/JuliaQ49-201801121901090270None.jpg`}
              author={`Ahmed Yahya`}
              level={`VIP Seller`}
              username={`wjw`}
              avatar={`/avatar2.jpg`}
            />
          </div>
          <div className="col-6 col-xl-3 p-0 slider-inner">
            <PortfolioSlider
              thumbnail={`/JuliaQ49-201801121901090270None.jpg`}
              author={`Ahmed Yahya`}
              level={`VIP Seller`}
              username={`wjw`}
              avatar={`/avatar2.jpg`}
            />
          </div>
        </div>
      </div>
      <div className="portfolios-container">
        <nav className="portfolios-nav">
          <ul className="portfolios-nav-list">
            <li className="active">
              <button className="portfolio-item">Web Designs</button>
            </li>
            <li>
              <button className="portfolio-item">Web Designs</button>
            </li>
            <li>
              <button className="portfolio-item">Web Designs</button>
            </li>
            <li>
              <button className="portfolio-item">Web Designs</button>
            </li>
          </ul>
        </nav>
        <div className="portfolios-content">
          <div className="row">
            <div className="col-sm-6 col-lg-3">
              <Portfolio
                title="A very tasty and cool recipe for pilaf inside a huge"
                thumbnail={`https://www.gettyimages.fr/gi-resources/images/500px/983794168.jpg`}
                slug={`dedej-djeded-wedw-wedwef-hgc`}
                author={"Abdelhamid Boumegouas"}
                level={`New Seller`}
                avatar={`/avatar.png`}
                username={`aboumegouass`}
              />
            </div>
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
