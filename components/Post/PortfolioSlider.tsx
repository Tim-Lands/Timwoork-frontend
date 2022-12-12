import React, { ReactElement } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import Image from "next/image";

function PortfolioSlider({
  thumbnail,
  author,
  level,
  username,
  avatar,
}): ReactElement {
  const thumbnailUrl = `url(${thumbnail})`;
  return (
    <div className="slider-item-portfolio">
      <a
        className="slider-item-portfolio-image"
        style={{
          backgroundImage: thumbnailUrl,
        }}
      ></a>
      <div className="slider-item-portfolio-content">
        <div className="d-flex slider-item-portfolio-user">
          <div className="portfolio-user-avatar">
            <Image src={avatar} width={40} height={40} />
          </div>
          <Link href={`/user/profile/${username}`}>
            <a className="portfolio-user-body">
              <h3 className="title">{author}</h3>
              <p className="meta">{level}</p>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
PortfolioSlider.propTypes = {
  thumbnail: PropTypes.any,
  avatar: PropTypes.string,
  author: PropTypes.string,
  username: PropTypes.string,
  level: PropTypes.string,
};

export default PortfolioSlider;
