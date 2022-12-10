import React, { ReactElement, useState } from "react";
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
  me = true,
}): ReactElement {
  const thumbnailUrl = `url(${thumbnail})`;
  const [isFavorated, setIsFavorated] = useState(false);
  const { getAll } = useAppSelector((state) => state.languages);

  return (
    <Badge.Ribbon
      color={"#475c80"}
      text={
        <>
          <FaStar />
          <span style={{ marginInline: 4, fontSize: 14 }}>(12,365)</span>
        </>
      }
    >
      <div
        className={"timlands-portfolio-item"}
        style={{ height: me ? 350 : 400 }}
      >
        <div
          className={`portfolio-item-img ${me ? "" : "show"}`}
          style={{ backgroundImage: thumbnailUrl }}
          onClick={() => me && Router.push("/portfolios/" + slug)}
        >
          <div className="portfolio-item-img-buttons">
            <button
              className="btn butt-xs butt-white flex-center"
              type="button"
              onClick={() => setIsFavorated(!isFavorated)}
            >
              {!isFavorated ? (
                <>
                  <FaRegHeart /> {getAll("To_Favorite")}
                </>
              ) : (
                <>
                  <FaHeart /> {getAll("Favorited")}
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
          {me ? (
            <></>
          ) : (
            <Link href={`/u/${username}`}>
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
  slug: PropTypes.string,
  username: PropTypes.string,
  heartCount: PropTypes.number,
  views: PropTypes.number,
  level: PropTypes.string,
  me: PropTypes.bool,
};

export default Portfolio;
