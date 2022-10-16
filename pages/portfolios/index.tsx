import React, { ReactElement } from "react";
import Layout from "@/components/Layout/HomeLayout";
import { MetaTags } from "@/components/SEO/MetaTags";
import Portfolio from "@/components/Post/Portfolio";
import PortfolioNav from "@/components/NewIndex/Portfolio/PortfolioNav";
import PortfolioSliders from "@/components/NewIndex/Portfolio/PortfolioSlider";
import { useAppSelector } from "@/store/hooks";

function Index() {
  const { getAll } = useAppSelector((state) => state.languages);

  return (
    <div className="container pt-4 mt-2">
      <MetaTags
        title={getAll("Explore_services")}
        metaDescription={getAll("Explore_services")}
        ogDescription={getAll("Explore_services")}
      />
      <PortfolioSliders />
      <div className="portfolios-container">
        <PortfolioNav />
        <div className="portfolios-content">
          <div className="row">
            <div className="col-sm-6 col-lg-3">
              <Portfolio
                title="مقسما ولا يحوي أخطاء لغوية، مولد النص العربى مفيد لمصممي المواقع"
                thumbnail={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyBCwIVaaXgBU_spXezU8RZr-MGrzWMBCA5A&usqp=CAU`}
                slug={`dedej-djeded-wedw-wedwef-hgc`}
                author={"أحمد يحيى"}
                level={getAll("New_seller")}
                avatar={`/avatar.png`}
                views={3563}
                username={`aboumegouass`}
              />
            </div>
            <div className="col-sm-6 col-lg-3">
              <Portfolio
                title="النص يمكن أن يتم تركيبه على أي تصميم دون مشكلة فلن"
                thumbnail={`https://i.pinimg.com/736x/fc/c2/a5/fcc2a5b86a3887465ef66e7d13b35fc5.jpg`}
                slug={`dedej-djeded-wedw-wedwef-hgc`}
                author={"عمر الهواري"}
                level={`بائع ممتاز`}
                avatar={`/avataré.jpg`}
                views={3563}
                username={`aboumegouass`}
              />
            </div>
            <div className="col-sm-6 col-lg-3">
              <Portfolio
                title="البحث عن نص بديل لا علاقة له بالموضوع الذى يتحدث عنه التصميم"
                thumbnail={`https://previews.agefotostock.com/previewimage/medibigoff/c21090dd6e94425eaa6e70ed7a23d883/esy-046306278.jpg`}
                slug={`dedej-djeded-wedw-wedwef-hgc`}
                author={"قويدر جلول"}
                level={`بائع محترف`}
                avatar={`/avatar.png`}
                views={3563}
                username={`aboumegouass`}
              />
            </div>
            <div className="col-sm-6 col-lg-3">
              <Portfolio
                title="المصمم أن يضع نصوصا مؤقتة على التصميم ليظهر للعميل"
                thumbnail={`https://gdj-inr5u0ip5pewom.stackpathdns.com/wp-content/uploads/2012/08/big-typography-design-27.jpg`}
                slug={`dedej-djeded-wedw-wedwef-hgc`}
                author={"ثامر بن العمري"}
                level={getAll("Active_seller")}
                avatar={`/avatar3.jpg`}
                views={3563}
                username={`aboumegouass`}
              />
            </div>
            <div className="col-sm-6 col-lg-3">
              <Portfolio
                title="العربى مفيد لمصممي المواقع على وجه الخصوص، حيث"
                thumbnail={`https://www.designandpaper.com/wp-content/uploads/2020/04/Pawel_Nolbert_adobe_dream_1920-1920x1266-1-1600x1055.jpg`}
                slug={`dedej-djeded-wedw-wedwef-hgc`}
                author={"شكراري محمد"}
                level={getAll("New_seller")}
                avatar={`/avatar.png`}
                views={3563}
                username={`aboumegouass`}
              />
            </div>
            <div className="col-sm-6 col-lg-3">
              <Portfolio
                title="أكبر من الفقرات يتيح لك مولد النص العربى زيادة عدد الفقرات"
                thumbnail={`https://cdnb.artstation.com/p/assets/images/images/021/763/033/large/joshua-prakash-magical-water.jpg?1572873773`}
                slug={`dedej-djeded-wedw-wedwef-hgc`}
                author={"ادير عيسى"}
                level={`بائع محترف`}
                avatar={`/avatar3.jpg`}
                views={3563}
                username={`aboumegouass`}
              />
            </div>
            <div className="col-sm-6 col-lg-3">
              <Portfolio
                title="هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد"
                thumbnail={`https://www.digitalartsonline.co.uk/cmsdata/slideshow/3594658/final-1.jpg`}
                slug={`dedej-djeded-wedw-wedwef-hgc`}
                author={"جمال عبد القادر"}
                level={getAll("Active_seller")}
                avatar={`/avatar.png`}
                views={3563}
                username={`aboumegouass`}
              />
            </div>
            <div className="col-sm-6 col-lg-3">
              <Portfolio
                title="مقسما ولا يحوي أخطاء لغوية، مولد النص العربى مفيد لمصممي المواقع"
                thumbnail={`https://gdj-inr5u0ip5pewom.stackpathdns.com/wp-content/uploads/2013/05/TypographyDesign35.jpg`}
                slug={`dedej-djeded-wedw-wedwef-hgc`}
                author={"الهواري وشراك"}
                level={`بائع ممتاز`}
                avatar={`/avatar2.jpg`}
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
