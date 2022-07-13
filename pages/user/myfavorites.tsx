import React, { ReactElement } from "react";
import Layout from "@/components/Layout/HomeLayout";
import { MetaTags } from "@/components/SEO/MetaTags";
import Portfolio from "@/components/Post/Portfolio";
import PropTypes from "prop-types";
import PortfolioProfileHeader from "@/components/NewIndex/Portfolio/PortfolioProfileHeader";
import Link from "next/link";
import { FaHeart, FaImages, FaRss, FaUserCircle } from "react-icons/fa";

function Index({ query }) {
  console.log(query);

  return (
    <div className="container pt-4 mt-2">
      <MetaTags
        title={"معرض الأعمال ل، فلان بن فلان"}
        metaDescription={"معرض الأعمال ل، فلان بن فلان"}
        ogDescription={"معرض الأعمال ل، فلان بن فلان"}
      />
      <div className="portfolios-container">
        <PortfolioProfileHeader />
        <div className="portfolios-container">
          <nav className="portfolios-nav d-flex">
            <ul className="portfolios-nav-list me-auto">
              <li>
                <Link href={`/user/profile`}>
                  <a className="portfolio-item">
                    <FaUserCircle /> الملف الشخصي
                  </a>
                </Link>
              </li>
              <li>
                <Link href={`/portfolios/user/dfdfd`}>
                  <a className="portfolio-item">
                    <FaImages /> معرض الأعمال
                  </a>
                </Link>
              </li>
              <li>
                <Link href={`/user/myfollowers`}>
                  <a className="portfolio-item">
                    <FaRss /> الأشخاص الذين أتابعهم
                  </a>
                </Link>
              </li>
              <li className="active">
                <Link href={`/user/myfavorites`}>
                  <a className="portfolio-item">
                    <FaHeart /> مفضلاتي
                  </a>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="portfolios-content">
          <div className="page-header">
            <div className="title">My Favotites</div>
          </div>
          <div className="row">
            <div className="col-sm-6 col-lg-3">
              <Portfolio
                title="A very tasty and cool recipe for pilaf inside a huge"
                thumbnail={`https://mir-s3-cdn-cf.behance.net/project_modules/1400/165af265485593.5af5bf8eae575.jpg`}
                slug={`dedej-djeded-wedw-wedwef-hgc`}
                author={"Abdelhamid Boumegouas"}
                level={`New Seller`}
                avatar={`/avatar.png`}
                views={72868}
                username={`aboumegouass`}
              />
            </div>
            <div className="col-sm-6 col-lg-3">
              <Portfolio
                title="A very tasty and cool recipe for pilaf inside a huge"
                thumbnail={`https://cdn.dribbble.com/uploads/7999/original/71d0450f3b5282d9ae34f788ba3a04e2.jpg?1582829647`}
                slug={`dedej-djeded-wedw-wedwef-hgc`}
                author={"Abdelhamid Boumegouas"}
                level={`New Seller`}
                avatar={`/avatar.png`}
                views={72868}
                username={`aboumegouass`}
              />
            </div>
            <div className="col-sm-6 col-lg-3">
              <Portfolio
                title="A very tasty and cool recipe for pilaf inside a huge"
                thumbnail={`https://cdn.dribbble.com/users/2189268/screenshots/8028972/media/5ae2b122667ec785965a00a021b54eee.png?compress=1&resize=400x300`}
                slug={`dedej-djeded-wedw-wedwef-hgc`}
                author={"Abdelhamid Boumegouas"}
                level={`New Seller`}
                views={72868}
                avatar={`/avatar.png`}
                username={`aboumegouass`}
              />
            </div>
            <div className="col-sm-6 col-lg-3">
              <Portfolio
                title="A very tasty and cool recipe for pilaf inside a huge"
                thumbnail={`https://mir-s3-cdn-cf.behance.net/project_modules/2800_opt_1/7631ff94721811.5e85dc7bb7e11.png`}
                slug={`dedej-djeded-wedw-wedwef-hgc`}
                author={"Abdelhamid Boumegouas"}
                level={`New Seller`}
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
