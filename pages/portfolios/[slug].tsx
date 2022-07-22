import React, { ReactElement, useState } from "react";
import Layout from "@/components/Layout/HomeLayout";
import PropTypes from "prop-types";
import { MetaTags } from "@/components/SEO/MetaTags";
import {
  FaFacebook,
  FaHeart,
  FaLink,
  FaLinkedin,
  FaRegHeart,
  FaRegStar,
  FaStar,
  FaTwitter,
} from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import DeleteConfirm from "@/components/NewIndex/Portfolio/DeleteConfirm";
import Portfolio from "@/components/Post/Portfolio";
import PortfolioNav from "@/components/NewIndex/Portfolio/PortfolioNav";
import { LanguageContext } from "../../contexts/languageContext/context";
import { useContext } from "react";

function Index({ query }) {
  const { getSectionLanguage } = useContext(LanguageContext);
  const getAll = getSectionLanguage("all");
  const getLogin = getSectionLanguage("login");
  const [isDeleteShowen, setIsDeleteShowen] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isFavorated, setIsFavorated] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  console.log(query);
  return (
    <div className="container pt-4 mt-2">
      <MetaTags
        title={getAll("Explore_services")}
        metaDescription={getAll("Explore_services")}
        ogDescription={getAll("Explore_services")}
      />
      {isDeleteShowen && <DeleteConfirm setIsDeleteModal={setIsDeleteShowen} />}
      <div className="portfolios-container">
        <PortfolioNav />
        <div className="row">
          <div className="col-xl-9">
            <div className="portfolio-single bg-white p-3">
              <div className="portfolio-single-header">
                <div className="portfolio-single-header-aside">
                  <h2 className="title">{getLogin("This_text_is")}</h2>
                </div>
                <div className="portfolio-single-header-tool">
                  <button
                    className={`like-btn-portfolio ${isLiked ? " active" : ""}`}
                    type="button"
                    onClick={() => setIsLiked(!isLiked)}
                  >
                    {!isLiked ? (
                      <>
                        <FaRegStar /> أعجبني
                      </>
                    ) : (
                      <>
                        <FaStar /> معجب
                      </>
                    )}
                  </button>

                  <button
                    className={`like-btn-portfolio ${
                      isFavorated ? " active" : ""
                    }`}
                    type="button"
                    onClick={() => setIsFavorated(!isFavorated)}
                  >
                    {!isFavorated ? (
                      <>
                        <FaRegHeart /> إضافة للمفضلة
                      </>
                    ) : (
                      <>
                        <FaHeart /> {getLogin("Added_successfully")}
                      </>
                    )}
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
                  {getLogin("This_text_is_2")}
                  {getLogin("If_you_need")}
                  {getLogin("This_text_is")}
                </p>
                <div className="buttons-link">
                  <a
                    href="test"
                    className="btn butt-primary butt-lg"
                    target="_blank"
                  >
                    <FaLink /> مشاهدة العمل
                  </a>
                </div>
                <div className="portfolio-another-posts">
                  <div className="portfolio-another-posts-header">
                    <h2 className="title">أعمال لنفس المستخدم</h2>
                  </div>
                  <div className="row">
                    <div className="col-sm-6 col-md-4">
                      <Portfolio
                        title={getLogin("If_you_need")}
                        thumbnail={`https://cdn.dribbble.com/uploads/7999/original/71d0450f3b5282d9ae34f788ba3a04e2.jpg?1582829647`}
                        slug={`dedej-djeded-wedw-wedwef-hgc`}
                        author={"طارق عروي"}
                        level={`New Seller`}
                        views={3642}
                        avatar={`/avatar.png`}
                        username={`aboumegouass`}
                      />
                    </div>
                    <div className="col-sm-6 col-md-4">
                      <Portfolio
                        title="يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى"
                        thumbnail={`https://mir-s3-cdn-cf.behance.net/project_modules/2800_opt_1/7631ff94721811.5e85dc7bb7e11.png`}
                        slug={`dedej-djeded-wedw-wedwef-hgc`}
                        author={"شرف الدين المصري"}
                        level={`New Seller`}
                        avatar={`/avatar.png`}
                        views={3642}
                        username={`aboumegouass`}
                      />
                    </div>
                    <div className="col-sm-6 col-md-4">
                      <Portfolio
                        title={getLogin("This_text_is")}
                        thumbnail={`https://cdn.dribbble.com/users/2189268/screenshots/8028972/media/5ae2b122667ec785965a00a021b54eee.png?compress=1&resize=400x300`}
                        slug={`dedej-djeded-wedw-wedwef-hgc`}
                        author={"أحمد يحيى"}
                        level={`New Seller`}
                        views={3642}
                        avatar={`/avatar.png`}
                        username={`aboumegouass`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-3">
            <div className="p-3 bg-white portfolio-sidebar">
              <h3 className="title">أدوات المعرض</h3>
              <div className="actions-info-portfolio">
                <button
                  type="button"
                  className="btn butt-green mb-2 flex-center butt-sm"
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  <span className="material-icons material-icons-outlined">
                    edit
                  </span>{" "}
                  تعديل معرض الأعمال
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
                  حذف معرض الأعمال
                </button>
              </div>
            </div>
            <div className="p-3 bg-white portfolio-sidebar">
              <h3 className="title">معلومات عن المستخدم</h3>
              <div className="user-info-portfolio">
                <Image src={`/avatar.png`} width={50} height={50} />
                <h3 className="user-title">
                  <Link href={`/u/ddkdh`}>
                    <a>عبد الحميد بومقواس</a>
                  </Link>
                </h3>
                <p className="meta">بائع محترف</p>
                <p className="text">{getLogin("This_text_is")}</p>
                <div className="btns-follow">
                  {isFollowing && (
                    <button
                      type="button"
                      className="btn butt-sm butt-green flex-center"
                      onClick={() => setIsFollowing(!isFollowing)}
                    >
                      <span className="material-icons material-icons-outlined">
                        person_add
                      </span>
                      متابعته
                    </button>
                  )}
                  {!isFollowing && (
                    <button
                      type="button"
                      className="btn butt-sm butt-light flex-center"
                      onClick={() => setIsFollowing(!isFollowing)}
                    >
                      <span className="material-icons material-icons-outlined">
                        person_remove
                      </span>
                      تمت المتابعة
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="p-3 bg-white portfolio-sidebar single-info-portfolio-container">
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
