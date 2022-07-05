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
                thumbnail={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyBCwIVaaXgBU_spXezU8RZr-MGrzWMBCA5A&usqp=CAU`}
                slug={`dedej-djeded-wedw-wedwef-hgc`}
                author={"Abdelhamid Boumegouas"}
                level={`New Seller`}
                avatar={`/avatar.png`}
                views={3563}
                username={`aboumegouass`}
              />
            </div>
            <div className="col-sm-6 col-lg-3">
              <Portfolio
                title="A very tasty and cool recipe for pilaf inside a huge"
                thumbnail={`https://i.pinimg.com/736x/fc/c2/a5/fcc2a5b86a3887465ef66e7d13b35fc5.jpg`}
                slug={`dedej-djeded-wedw-wedwef-hgc`}
                author={"Abdelhamid Boumegouas"}
                level={`New Seller`}
                avatar={`/avatar.png`}
                views={3563}
                username={`aboumegouass`}
              />
            </div>
            <div className="col-sm-6 col-lg-3">
              <Portfolio
                title="A very tasty and cool recipe for pilaf inside a huge"
                thumbnail={`https://previews.agefotostock.com/previewimage/medibigoff/c21090dd6e94425eaa6e70ed7a23d883/esy-046306278.jpg`}
                slug={`dedej-djeded-wedw-wedwef-hgc`}
                author={"Abdelhamid Boumegouas"}
                level={`New Seller`}
                avatar={`/avatar.png`}
                views={3563}
                username={`aboumegouass`}
              />
            </div>
            <div className="col-sm-6 col-lg-3">
              <Portfolio
                title="A very tasty and cool recipe for pilaf inside a huge"
                thumbnail={`https://gdj-inr5u0ip5pewom.stackpathdns.com/wp-content/uploads/2012/08/big-typography-design-27.jpg`}
                slug={`dedej-djeded-wedw-wedwef-hgc`}
                author={"Abdelhamid Boumegouas"}
                level={`New Seller`}
                avatar={`/avatar.png`}
                views={3563}
                username={`aboumegouass`}
              />
            </div>
            <div className="col-sm-6 col-lg-3">
              <Portfolio
                title="A very tasty and cool recipe for pilaf inside a huge"
                thumbnail={`https://www.designandpaper.com/wp-content/uploads/2020/04/Pawel_Nolbert_adobe_dream_1920-1920x1266-1-1600x1055.jpg`}
                slug={`dedej-djeded-wedw-wedwef-hgc`}
                author={"Abdelhamid Boumegouas"}
                level={`New Seller`}
                avatar={`/avatar.png`}
                views={3563}
                username={`aboumegouass`}
              />
            </div>
            <div className="col-sm-6 col-lg-3">
              <Portfolio
                title="A very tasty and cool recipe for pilaf inside a huge"
                thumbnail={`https://cdnb.artstation.com/p/assets/images/images/021/763/033/large/joshua-prakash-magical-water.jpg?1572873773`}
                slug={`dedej-djeded-wedw-wedwef-hgc`}
                author={"Abdelhamid Boumegouas"}
                level={`New Seller`}
                avatar={`/avatar.png`}
                views={3563}
                username={`aboumegouass`}
              />
            </div>
            <div className="col-sm-6 col-lg-3">
              <Portfolio
                title="A very tasty and cool recipe for pilaf inside a huge"
                thumbnail={`https://www.digitalartsonline.co.uk/cmsdata/slideshow/3594658/final-1.jpg`}
                slug={`dedej-djeded-wedw-wedwef-hgc`}
                author={"Abdelhamid Boumegouas"}
                level={`New Seller`}
                avatar={`/avatar.png`}
                views={3563}
                username={`aboumegouass`}
              />
            </div>
            <div className="col-sm-6 col-lg-3">
              <Portfolio
                title="A very tasty and cool recipe for pilaf inside a huge"
                thumbnail={`https://gdj-inr5u0ip5pewom.stackpathdns.com/wp-content/uploads/2013/05/TypographyDesign35.jpg`}
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
