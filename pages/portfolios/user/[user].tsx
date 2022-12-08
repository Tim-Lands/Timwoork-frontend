import React, { ReactElement } from "react";
import Layout from "@/components/Layout/HomeLayout";
import { MetaTags } from "@/components/SEO/MetaTags";
import Portfolio from "@/components/Post/Portfolio";
import Navbar from "components/Portfolio/navbar";
import PropTypes from "prop-types";
import PortfolioProfileHeader from "@/components/Portfolio/PortfolioProfileHeader";

import { useAppSelector } from "@/store/hooks";

function Index({ query }) {
  const {
    languages: { getAll, language },
  } = useAppSelector((state) => state);

  const unused = "stop building";
  const title =
    language === "ar"
      ? getAll("X’s_business_gallery") + query.user
      : query.user + getAll("X’s_business_gallery");

  return (
    <div className="container pt-4 mt-2">
      <MetaTags title={title} metaDescription={title} ogDescription={title} />
      <div className="portfolios-container">
        <PortfolioProfileHeader />
        <Navbar active="portfolio" />
        <div className="portfolios-content">
          <div className="row">
            <div className="col-sm-6 col-lg-3">
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
            <div className="col-sm-6 col-lg-3">
              <Portfolio
                title="يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة"
                thumbnail={`https://cdn.dribbble.com/uploads/7999/original/71d0450f3b5282d9ae34f788ba3a04e2.jpg?1582829647`}
                slug={`dedej-djeded-wedw-wedwef-hgc`}
                author={"محمود المصري"}
                level={`بائع محترف`}
                avatar={`/avatar.png`}
                views={72868}
                username={`aboumegouass`}
              />
            </div>
            <div className="col-sm-6 col-lg-3">
              <Portfolio
                title="الفقرات يتيح لك مولد النص العربى زيادة عدد الفقرات كما تريد"
                thumbnail={`https://cdn.dribbble.com/users/2189268/screenshots/8028972/media/5ae2b122667ec785965a00a021b54eee.png?compress=1&resize=400x300`}
                slug={`dedej-djeded-wedw-wedwef-hgc`}
                author={"عبد الحميد بومقواس"}
                level={`بائع ممتاز`}
                views={72868}
                avatar={`/avatar.png`}
                username={`aboumegouass`}
              />
            </div>
            <div className="col-sm-6 col-lg-3">
              <Portfolio
                title="مقسما ولا يحوي أخطاء لغوية، مولد النص العربى مفيد لمصممي"
                thumbnail={`https://mir-s3-cdn-cf.behance.net/project_modules/2800_opt_1/7631ff94721811.5e85dc7bb7e11.png`}
                slug={`dedej-djeded-wedw-wedwef-hgc`}
                author={"طارق عروي"}
                level={getAll("Active_seller")}
                views={72868}
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
Index.propTypes = {
  query: PropTypes.any,
};

export async function getServerSideProps({ query }) {
  return { props: { query } };
}
