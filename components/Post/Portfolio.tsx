import React, { ReactElement } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "antd";
import { FaEye, FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import Router from "next/router";
import { useAppSelector } from "@/store/hooks";

function Portfolio({
  title,
  thumbnail,
  author,
  level,
  username,
  avatar,
  views,
  slug,
  fans_count = 12365,
  user = true,
  likes = true,
  isLiked = true,
  onLike = () => {},
}): ReactElement {
  const { getAll } = useAppSelector((state) => state.languages);

  return (
    <Badge.Ribbon
      color={"#475c80"}
      text={
        <>
          <FaStar />
          <span style={{ marginInline: 4, fontSize: 14 }}>{fans_count}</span>
        </>
      }
    >
      <div
        className={"timlands-portfolio-item"}
        style={{ height: user ? 320 : 370 }}
      >
        <div
          className={`portfolio-item-img ${likes ? "" : "show"}`}
          onClick={() => likes && Router.push("/portfolios/" + slug)}
        >
          <img src={thumbnail} alt="thumbnail" />
          <div className="portfolio-item-img-buttons">
            <button
              className="btn butt-xs butt-white flex-center"
              type="button"
              onClick={onLike}
            >
              {isLiked ? (
                <>
                  <FaHeart /> {getAll("Fan")}
                </>
              ) : (
                <>
                  <FaRegHeart /> {getAll("Like")}
                </>
              )}
            </button>
            <Link href={`/portfolios/${slug}`}>
              <a className="btn butt-xs butt-white-out flex-center">
                <FaEye /> {getAll("View")}
              </a>
            </Link>
          </div>
        </div>
        <div className="portfolio-item-content">
          <h3 className="title">
            <a onClick={() => Router.push("/portfolios/" + slug)}>{title}</a>
          </h3>
          <p className="views-meta">
            <FaEye /> ({views})
          </p>
          {user ? (
            <></>
          ) : (
            <Link href={`/user/profile/${username}`}>
              <a className="user-mata-post">
                <div className="user-mata-post-img">
                  <Image src={avatar} width={30} height={30} alt={author} />
                </div>
                <div className="user-mata-post-content">
                  <p className="text-user">
                    <span className="text">{author}</span>
                  </p>
                  <p className="text-meta">
                    <span className="text">{level}</span>
                  </p>
                </div>
              </a>
            </Link>
          )}
        </div>
      </div>
    </Badge.Ribbon>
  );
}
Portfolio.propTypes = {
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.any,
  avatar: PropTypes.string,
  author: PropTypes.string,
  slug: PropTypes.number,
  username: PropTypes.any,
  heartCount: PropTypes.number,
  views: PropTypes.number,
  level: PropTypes.string,
  user: PropTypes.bool,
  fans_count: PropTypes.number,
  isLiked: PropTypes.bool,
  onLike: PropTypes.func,
  likes: PropTypes.bool,
};

export default Portfolio;
