import React, { ReactElement } from "react";
// import { LanguageContext } from "../../contexts/languageContext/context";
import Layout from "@/components/Layout/HomeLayout";
import { MetaTags } from "@/components/SEO/MetaTags";
import Portfolio from "@/components/Post/Portfolio";
import PortfolioNav from "@/components/NewIndex/Portfolio/PortfolioNav";
import PortfolioSliders from "@/components/NewIndex/Portfolio/PortfolioSlider";

function Index() {
  // const [isLoading, setIsLoading] = useState(false);
  // const [isSettings, setIsSettings] = useState(false);
  // const { language, getSectionLanguage } = useContext(LanguageContext);
  // const getLanguage = getSectionLanguage("products");

  return (
    <div className="container pt-4 mt-2">
      <MetaTags
        title={"تصفح الخدمات"}
        metaDescription={"تصفح الخدمات"}
        ogDescription={"تصفح الخدمات"}
      />
      <PortfolioSliders />
      <div className="portfolios-container">
        <PortfolioNav />
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
                views={3563}
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
