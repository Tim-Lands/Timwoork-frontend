import React, { ReactElement, useState } from "react";
import Layout from "@/components/Layout/HomeLayout";
import PropTypes from "prop-types";
import { MetaTags } from "@/components/SEO/MetaTags";
import {
  FaFacebook,
  FaHeart,
  FaLink,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import DeleteConfirm from "@/components/NewIndex/Portfolio/DeleteConfirm";

function Index({ query }) {
  console.log(query);
  const [isDeleteShowen, setIsDeleteShowen] = useState(false);
  return (
    <div className="container pt-4 mt-2">
      <MetaTags
        title={"تصفح الخدمات"}
        metaDescription={"تصفح الخدمات"}
        ogDescription={"تصفح الخدمات"}
      />
      {isDeleteShowen && <DeleteConfirm setIsDeleteModal={setIsDeleteShowen} />}
      <div className="portfolios-container">
        <nav className="portfolios-nav">
          <ul className="portfolios-nav-list">
            <li>
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
        <div className="row">
          <div className="col-xl-9">
            <div className="portfolio-single bg-white p-3">
              <div className="portfolio-single-header">
                <div className="portfolio-single-header-aside">
                  <h2 className="title">
                    Lorem ipsum dolor, sit adipisicing elit. Temporibus.
                  </h2>
                </div>
                <div className="portfolio-single-header-tool">
                  <button className="like-btn-portfolio" type="button">
                    <FaHeart /> Like
                  </button>
                </div>
              </div>
              <div className="portfolio-single-content">
                <div className="mb-2">
                  <Image
                    src={`/JuliaQ49-201801121901090270None.jpg`}
                    width={700}
                    height={400}
                    layout="responsive"
                  />
                </div>
                <div className="mb-2">
                  <Image
                    src={`/JuliaQ49-201801121901090270None.jpg`}
                    width={700}
                    height={400}
                    layout="responsive"
                  />
                </div>
                <div className="mb-2">
                  <Image
                    src={`/JuliaQ49-201801121901090270None.jpg`}
                    width={700}
                    height={400}
                    layout="responsive"
                  />
                </div>
                <p className="text">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Explicabo assumenda natus iusto minus blanditiis asperiores
                  voluptas quae neque voluptatibus et corrupti odit consequatur
                  quis mollitia, ipsa quisquam sequi ipsam placeat.Lorem ipsum,
                  dolor sit amet consectetur adipisicing elit. Explicabo
                  assumenda natus iusto minus blanditiis asperiores voluptas
                  quae neque voluptatibus et corrupti odit consequatur quis
                  mollitia, ipsa quisquam sequi ipsam placeat.Lorem ipsum, dolor
                  sit amet consectetur adipisicing elit. Explicabo assumenda
                  natus iusto minus blanditiis asperiores voluptas quae neque
                  voluptatibus et corrupti odit consequatur quis mollitia, ipsa
                  quisquam sequi ipsam placeat.Lorem ipsum, dolor sit amet
                  consectetur adipisicing elit. Explicabo assumenda natus iusto
                  minus blanditiis asperiores voluptas quae neque voluptatibus
                  et corrupti odit consequatur quis mollitia, ipsa quisquam
                  sequi ipsam placeat.Lorem ipsum, dolor sit amet consectetur
                  adipisicing elit. Explicabo assumenda natus iusto minus
                  blanditiis asperiores voluptas quae neque voluptatibus et
                  corrupti odit consequatur quis mollitia, ipsa quisquam sequi
                  ipsam placeat.
                </p>
                <div className="buttons-link">
                  <a
                    href="test"
                    className="btn butt-primary butt-lg"
                    target="_blank"
                  >
                    <FaLink /> Go to Website
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-3">
            <div className="p-3 bg-white portfolio-sidebar">
              <h3 className="title">Portfolio Actions</h3>
              <div className="actions-info-portfolio">
                <button
                  type="button"
                  className="btn butt-green mb-2 flex-center butt-sm"
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  <span className="material-icons material-icons-outlined">
                    edit
                  </span>{" "}
                  Edit Portfolio
                </button>
                <button
                  type="button"
                  className="btn butt-red flex-center butt-sm"
                  style={{ width: "100%", justifyContent: "center" }}
                  onClick={() => setIsDeleteShowen(true)}
                >
                  <span className="material-icons material-icons-outlined">
                    delete
                  </span>{" "}
                  Delete Portfolio
                </button>
              </div>
            </div>
            <div className="p-3 bg-white portfolio-sidebar">
              <h3 className="title">User Details</h3>
              <div className="user-info-portfolio">
                <Image src={`/avatar.png`} width={50} height={50} />
                <h3 className="user-title">
                  <Link href={`/u/ddkdh`}>
                    <a>Abdelhamid Boumegouas</a>
                  </Link>
                </h3>
                <p className="meta">VIP Seller</p>
                <p className="text">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Deserunt quo esse neque error accusantium, nam repudiandae id
                  blanditiis rem iure ab magnam consectetur laudantium
                  aspernatur dignissimos nulla fuga sapiente exercitationem.
                </p>
              </div>
            </div>
            <div className="p-3 bg-white portfolio-sidebar">
              <h3 className="title">Post Info</h3>
              <div className="single-info-portfolio">
                <table className="table table-borderles">
                  <tbody>
                    <tr>
                      <th>Created At:</th>
                      <td>7 min ago</td>
                    </tr>
                    <tr>
                      <th>Views:</th>
                      <td>8,368</td>
                    </tr>
                    <tr>
                      <th>Likes:</th>
                      <td>236</td>
                    </tr>
                    <tr>
                      <th>Skills:</th>
                      <td>
                        <span className="skill-item">CSS</span>
                        <span className="skill-item">HTML</span>
                        <span className="skill-item">JavaScript</span>
                        <span className="skill-item">After Effect</span>
                        <span className="skill-item">Photoshop</span>
                      </td>
                    </tr>
                    <tr>
                      <th>Share My Portfolio:</th>
                      <td>
                        <a href="" className="share-item">
                          <FaFacebook />
                        </a>
                        <a href="" className="share-item">
                          <FaTwitter />
                        </a>
                        <a href="" className="share-item">
                          <FaLinkedin />
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
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
