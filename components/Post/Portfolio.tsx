import React, { ReactElement, useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "antd";
import { FaEye, FaHeart, FaRegHeart, FaStar } from "react-icons/fa";

function Portfolio({
  title,
  thumbnail,
  author,
  level,
  username,
  avatar,
  views,
  slug,
}): ReactElement {
  const thumbnailUrl = `url(${thumbnail})`;
  const [isFavorated, setIsFavorated] = useState(false);

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
      <div className={"timlands-portfolio-item"}>
        <div
          className="portfolio-item-img"
          style={{ backgroundImage: thumbnailUrl }}
        >
          <div className="portfolio-item-img-buttons">
            <button
              className="btn butt-xs butt-white flex-center"
              type="button"
              onClick={() => setIsFavorated(!isFavorated)}
            >
              {!isFavorated ? (
                <>
                  <FaRegHeart /> To Favorite
                </>
              ) : (
                <>
                  <FaHeart /> Favorited
                </>
              )}
            </button>
            <Link href={`/portfolios/${slug}`}>
              <a className="btn butt-xs butt-white-out flex-center">
                <FaEye /> View
              </a>
            </Link>
          </div>
        </div>
        <div className="portfolio-item-content">
          <h3 className="title">
            <a href={`/portfolios/${slug}`}>{title}</a>
          </h3>
          <p className="views-meta">
            <FaEye /> ({views})
          </p>
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
};

export default Portfolio;
