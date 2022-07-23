import React, { ReactElement, useState } from "react";
import Layout from "@/components/Layout/HomeLayout";
import PropTypes from "prop-types";
import { MetaTags } from "@/components/SEO/MetaTags";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Image from "next/image";
import DeleteConfirm from "@/components/NewIndex/Portfolio/DeleteConfirm";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { BsCheckCircle, BsCheckCircleFill, BsPlus } from "react-icons/bs";

import AuthorCard from "@/components/NewIndex/AuthorCard";
import ContestSingleInfo from "@/components/NewIndex/Contests/ContestSingleInfo";
import Link from "next/link";
import ContestEntierPost from "@/components/Post/ContestEntierPost";

function Index({ query }) {
  console.log(query);
  const [isDeleteShowen, setIsDeleteShowen] = useState(false);
  const [isFavorated, setIsFavorated] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  return (
    <div className="container pt-4 mt-2">
      <MetaTags
        title={"تصفح المسابقات"}
        metaDescription={"تصفح الخدمات"}
        ogDescription={"تصفح الخدمات"}
      />
      {isDeleteShowen && <DeleteConfirm setIsDeleteModal={setIsDeleteShowen} />}
      <div className="portfolios-container">
        <nav className="portfolios-nav d-flex">
          <ul className="portfolios-nav-list me-auto">
            <li>
              <Link href={`/contests/slug-test-text`}>
                <a className="portfolio-item"> تفاصيل المسابقة</a>
              </Link>
            </li>
            <li className="active">
              <Link href={`/contests/slug-test-text/posts`}>
                <a className="portfolio-item"> المشاركات</a>
              </Link>
            </li>
          </ul>
          <ul className="portfolios-nav-list ml-auto">
            <li>
              <Link href={`/contests/add-new`}>
                <a className="portfolio-item">
                  <BsPlus /> إضافة مسابقة جديدة
                </a>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="row">
          <div className="col-xl-9">
            <div className="portfolio-single bg-white">
              <ul className="contest-status">
                <li className="actived">
                  <span className="icon-status">
                    <BsCheckCircleFill />
                  </span>
                  المرحلة الأولى
                </li>
                <li className="actived">
                  <span className="icon-status">
                    <BsCheckCircle />
                  </span>
                  المرحلة الثانية
                </li>
                <li>
                  <span className="icon-status">
                    <BsCheckCircle />
                  </span>
                  المرحلة الأخيرة
                </li>
              </ul>
              <div className="p-4">
                <div className="portfolio-single-header">
                  <div className="portfolio-single-header-aside">
                    <h2 className="title">
                      هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لق
                    </h2>
                  </div>
                  <div className="portfolio-single-header-tool">
                    <button
                      className={`like-btn-portfolio ${
                        isLiked ? " active" : ""
                      }`}
                      type="button"
                      onClick={() => setIsLiked(!isLiked)}
                    >
                      {!isLiked ? (
                        <>
                          <AiOutlineLike />
                        </>
                      ) : (
                        <>
                          <AiFillLike />
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
                          <FaRegHeart />
                        </>
                      ) : (
                        <>
                          <FaHeart />
                        </>
                      )}
                    </button>
                  </div>
                </div>
                <div className="portfolio-single-content">
                  <h4 className="title">مشاركات المسابقة</h4>
                  <div className="row">
                    <div className="col-md-4">
                      <ContestEntierPost
                        thumbnail={`/JuliaQ49-201801121901090270None.jpg`}
                        avatar={`/avatar.png`}
                        author={`طارق عروي`}
                        level={`بائع محترف`}
                        username={`tarekaroui`}
                        heartCount={1203}
                        isWin={true}
                        slug={`test-slug-text`}
                        id={12}
                      />
                    </div>
                    <div className="col-md-4">
                      <ContestEntierPost
                        thumbnail={`/JuliaQ49-201801121901090270None.jpg`}
                        avatar={`/avatar.png`}
                        author={`طارق عروي`}
                        level={`بائع محترف`}
                        username={`tarekaroui`}
                        heartCount={1203}
                        isWin={false}
                        slug={`test-slug-text`}
                        id={12}
                      />
                    </div>
                    <div className="col-md-4">
                      <ContestEntierPost
                        thumbnail={`/JuliaQ49-201801121901090270None.jpg`}
                        avatar={`/avatar.png`}
                        author={`طارق عروي`}
                        level={`بائع محترف`}
                        username={`tarekaroui`}
                        heartCount={1203}
                        isWin={false}
                        slug={`test-slug-text`}
                        id={12}
                      />
                    </div>
                    <div className="col-md-4">
                      <ContestEntierPost
                        thumbnail={`/JuliaQ49-201801121901090270None.jpg`}
                        avatar={`/avatar.png`}
                        author={`طارق عروي`}
                        level={`بائع محترف`}
                        username={`tarekaroui`}
                        heartCount={1203}
                        isWin={false}
                        slug={`test-slug-text`}
                        id={12}
                      />
                    </div>
                    <div className="col-md-4">
                      <ContestEntierPost
                        thumbnail={`/JuliaQ49-201801121901090270None.jpg`}
                        avatar={`/avatar.png`}
                        author={`طارق عروي`}
                        level={`بائع محترف`}
                        username={`tarekaroui`}
                        heartCount={1203}
                        isWin={false}
                        slug={`test-slug-text`}
                        id={12}
                      />
                    </div>
                    <div className="col-md-4">
                      <ContestEntierPost
                        thumbnail={`/JuliaQ49-201801121901090270None.jpg`}
                        avatar={`/avatar.png`}
                        author={`طارق عروي`}
                        level={`بائع محترف`}
                        username={`tarekaroui`}
                        heartCount={1203}
                        isWin={false}
                        slug={`test-slug-text`}
                        id={12}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-3">
            <div className="p-3 bg-white portfolio-sidebar">
              <h3 className="title">أدوات المسابقة</h3>
              <div className="actions-info-portfolio">
                <button
                  type="button"
                  className="btn butt-green mb-2 flex-center butt-sm"
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  <span className="material-icons material-icons-outlined">
                    edit
                  </span>{" "}
                  تعديل المسابقة
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
                  حذف المسابقة
                </button>
              </div>
            </div>
            <AuthorCard
              author="عبد الحميد بومقواس"
              country="الجزائر"
              avatar="/avatar.png"
              bio="هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف يضع نصوصا مؤقتة على التصميم ليظهر للعميل الشكل كاملاً،دور "
              username="aboumegouass"
              isFollower={true}
            />
            <div className="p-3 bg-white portfolio-sidebar">
              <h3 className="title">الفائزين</h3>
              <div className="users-contest-wins">
                <div className="users-contest-item">
                  <div className="users-contest-item-img">
                    <Image src={`/avatar.png`} width={40} height={40} />
                  </div>
                  <div className="users-contest-item-body">
                    <h4 className="user-title">أحمد يحيى</h4>
                    <p className="meta">المرتبة الأولى</p>
                  </div>
                </div>
              </div>
            </div>
            <ContestSingleInfo
              created_at={`منذ أسبوع`}
              deleveryTime={`9 أيام`}
              contestantsCount={12}
              winnersCount={3}
              sharesCount={532}
              viewsCount={1344}
              likesCount={2342}
            />
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
