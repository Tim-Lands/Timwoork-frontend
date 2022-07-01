import React, { ReactElement } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "antd";
import { FaHeart } from "react-icons/fa";

function Portfolio({
  title,
  thumbnail,
  author,
  level,
  username,
  avatar,
  slug,
}): ReactElement {
  const thumbnailUrl = `url(${thumbnail})`;
  return (
    <Badge.Ribbon
      color={"#475c80"}
      text={
        <>
          <FaHeart />
          <span style={{ marginInline: 4, fontSize: 14 }}>(12,365)</span>
        </>
      }
    >
      <div className={"timlands-portfolio-item"}>
        <Link href={`/portfolios/${slug}`}>
          <a
            className="portfolio-item-img"
            style={{ backgroundImage: thumbnailUrl }}
          ></a>
        </Link>
        <div className="portfolio-item-content">
          <h3 className="title">
            <a href={`/portfolios/${slug}`}>{title}</a>
          </h3>
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
  level: PropTypes.string,
};

export default Portfolio;
