import React, { ReactElement } from "react";
import Layout from "@/components/Layout/HomeLayout";
import { MetaTags } from "@/components/SEO/MetaTags";
import Portfolio from "@/components/Post/Portfolio";
import Link from "next/link";
import PropTypes from "prop-types";
import Image from "next/image";
import { Badge } from "antd";

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
        <div className="timlands-profile-content bg-white">
          <div className="profile-content-header">
            <Badge status="success">
              <div className="profile-content-avatar">
                <Image
                  src={`/avatar3.jpg`}
                  quality={80}
                  width={120}
                  height={120}
                  placeholder="blur"
                  blurDataURL="/avatar2.jpg"
                />
              </div>
            </Badge>
            <div className="profile-content-head">
              <h4 className="title">Abdelhamid Boumegouas</h4>
              <p className="text">
                @aboumegouass |<span className="app-label"> VIP Seller </span>
              </p>
              <div className="button-edit d-flex">
                <Link href="/user/personalInformations">
                  <a className="btn butt-dark mx-1 flex-center butt-sm">
                    <span className="material-icons material-icons-outlined">
                      edit
                    </span>{" "}
                    Edit Profile
                  </a>
                </Link>
                <Link href="/user/personalInformations">
                  <a className="btn butt-green mx-1 flex-center butt-sm">
                    <span className="material-icons material-icons-outlined">
                      add_circle
                    </span>{" "}
                    Add New Portfolio
                  </a>
                </Link>
              </div>
            </div>
            <p className="profile-buttons">
              <button
                className="btn butt-primary2 flex-center butt-sm"
                onClick={() =>
                  navigator.clipboard.writeText(
                    `https://timwoork.com/u/aboumegouass`
                  )
                }
              >
                <span className="material-icons material-icons-outlined">
                  file_copy
                </span>{" "}
                Copy My Profile Link
              </button>
            </p>
          </div>
        </div>
        <div className="portfolios-content">
          <div className="row">
            <div className="col-sm-6 col-lg-3">
              <Portfolio
                title="A very tasty and cool recipe for pilaf inside a huge"
                thumbnail={`https://mir-s3-cdn-cf.behance.net/project_modules/1400/165af265485593.5af5bf8eae575.jpg`}
                slug={`dedej-djeded-wedw-wedwef-hgc`}
                author={"Abdelhamid Boumegouas"}
                level={`New Seller`}
                avatar={`/avatar.png`}
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
