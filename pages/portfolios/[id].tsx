import React, { ReactElement, useEffect, useState } from "react";
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
import DeleteConfirm from "@/components/Portfolio/DeleteConfirm";
import PortfolioNav from "@/components/Portfolio/PortfolioNav";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { PortfolioActions } from "@/store/portfolio/portfolioActions";
import router from "next/router";
import Loading from "@/components/Loading";
import { message } from "antd";
import { FavoritesActions } from "@/store/favorites/favoritesAction";

function Index({ id }) {
  const {
    user,
    profile: {
      profile_seller: {
        data: { id: meId },
      },
    },
    languages: { getAll },
    portfolio: { project },
  } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const [isDeleteShowen, setIsDeleteShowen] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  useEffect(() => {
    if (project.loaded && project.id == id) return;
    dispatch(PortfolioActions.getUserProject({ id }));
  }, [project.id]);
  const isMe = project.seller.id === meId;

  return (
    <div className="container pt-4 mt-2">
      <MetaTags
        title={getAll("Explore_services")}
        metaDescription={getAll("Explore_services")}
        ogDescription={getAll("Explore_services")}
      />
      {isDeleteShowen && (
        <DeleteConfirm
          setIsDeleteModal={setIsDeleteShowen}
          onClick={async () => {
            try {
              await dispatch(
                PortfolioActions.deleteProject({ id, username: user.username })
              );
              dispatch(PortfolioActions.initializeProject());
              router.push("/portfolios/user/me");
              setIsDeleteShowen(false);
            } catch (error) {
              message.error(error.msg);
            }
          }}
        />
      )}
      <div className="portfolios-container">
        <PortfolioNav />
        {project.loading && <Loading />}
        {project.id && !project.loading && (
          <div className="row">
            <div className="col-xl-9">
              <div className="portfolio-single bg-white p-3">
                <div className="portfolio-single-header">
                  <div className="portfolio-single-header-aside">
                    <h2 className="title">{project.title}</h2>
                  </div>
                  {!isMe && (
                    <div className="portfolio-single-header-tool">
                      <button
                        className={`like-btn-portfolio ${
                          project.is_liked ? " active" : ""
                        }`}
                        type="button"
                        onClick={() => {
                          dispatch(PortfolioActions.toggleLikeBack({ id }));
                          dispatch(PortfolioActions.toggleLike());
                        }}
                      >
                        {!project.is_liked ? (
                          <>
                            <FaRegHeart />
                            {getAll("Like")}
                          </>
                        ) : (
                          <>
                            <FaHeart /> {getAll("Fan")}
                          </>
                        )}
                      </button>

                      <button
                        className={`like-btn-portfolio ${
                          project.is_favourite ? " active" : ""
                        }`}
                        type="button"
                        onClick={() => {
                          dispatch(FavoritesActions.toggleFavBack({ id }));
                          dispatch(PortfolioActions.toggleFav());
                        }}
                      >
                        {!project.is_favourite ? (
                          <>
                            <FaRegStar /> {getAll("Add_to_favorite")}
                          </>
                        ) : (
                          <>
                            <FaStar /> {getAll("Favorited")}
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
                <div className="portfolio-single-content">
                  <div className="mb-2">
                    <Image
                      src={project.cover_url}
                      width={700}
                      height={400}
                      layout="responsive"
                    />
                  </div>
                  {project.gallery.map((photo) => {
                    return (
                      <div key={photo.id} className="mb-2">
                        <Image
                          src={photo.image_url}
                          width={700}
                          height={400}
                          layout="responsive"
                        />
                      </div>
                    );
                  })}

                  <p className="text">{project.content}</p>
                  <div className="buttons-link">
                    <a
                      // href={project.url}
                      href={linkify(project.url, id)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn butt-primary butt-lg"
                    >
                      <FaLink /> {getAll("See_work")}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-3">
              {isMe && (
                <div className="p-3 bg-white portfolio-sidebar">
                  <h3 className="title">{getAll("Gallery_tools")}</h3>
                  <div className="actions-info-portfolio">
                    <button
                      type="button"
                      className="btn butt-green mb-2 flex-center butt-sm"
                      onClick={() => {
                        router.push("/portfolios/project-modify/" + id);
                      }}
                      style={{ width: "100%", justifyContent: "center" }}
                    >
                      <span className="material-icons material-icons-outlined">
                        edit
                      </span>{" "}
                      {getAll("Edit_business_gallery")}
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
                      {getAll("Delete_business_gallery")}
                    </button>
                  </div>
                </div>
              )}
              {!isMe && (
                <div className="p-3 bg-white portfolio-sidebar">
                  <h3 className="title">{getAll("User’s_information")}</h3>
                  <div className="user-info-portfolio">
                    <Image
                      src={project.seller.profile.avatar_url}
                      width={50}
                      height={50}
                    />
                    <h3 className="user-title">
                      <Link href={`/user/profile/` + project.seller.id}>
                        <a>{project.seller.profile.full_name}</a>
                      </Link>
                    </h3>
                    <p className="meta">{project.seller.profile.level.name}</p>
                    <p className="text">{project.seller.bio}</p>
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
                          {getAll("Follow")}
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
                          {getAll("Followed")}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
              <div className="p-3 bg-white portfolio-sidebar single-info-portfolio-container">
                <h3 className="title">{getAll("Project_info")}</h3>
                <div className="single-info-portfolio">
                  <table className="table table-borderles">
                    <tbody>
                      <tr>
                        <th>{getAll("Created_At:")}</th>
                        <td>{project.completed_date}</td>
                      </tr>
                      <tr>
                        <th>{getAll("Views")}</th>
                        <td>8,368</td>
                      </tr>
                      <tr>
                        <th>{getAll("Likes")}</th>
                        <td>{project.likers_count}</td>
                      </tr>
                      <tr>
                        <th>{getAll("Skills")}</th>
                        <td>
                          {project.portfolio_item_tags.map((skill) => {
                            return (
                              <span key={skill.id} className="skill-item">
                                {skill.name}
                              </span>
                            );
                          })}
                        </td>
                      </tr>
                      <tr>
                        <th>{getAll("Share_My_Portfolio:")}</th>
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
        )}
      </div>
    </div>
  );
}
function linkify(text, id) {
  const urlRegex =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
  const before = text?.replace(urlRegex, function (url) {
    const start = url.startsWith("http") || url.startsWith("https");
    let newUrl = url;
    newUrl = !start ? "https://" + url : url;
    if (newUrl.startsWith("https://timwoork")) {
      return newUrl;
    } else {
      return "/redirect/f?url=" + newUrl + `&*portfolios/${id}`;
    }
  });

  return before;
}
Index.getLayout = function getLayout(page: any): ReactElement {
  return <Layout>{page}</Layout>;
};
export default Index;
Index.propTypes = {
  id: PropTypes.string,
};
export async function getServerSideProps({ query }) {
  return { props: { id: query.id } };
}
