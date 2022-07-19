import React, { ReactElement, useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "antd";
import { FaEye, FaHeart, FaRegHeart, FaStar } from "react-icons/fa";

function ContestEntierPost({
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
    <div className={"timlands-contest-entier-post"}>
      <div
        className="contest-item-img"
        style={{ backgroundImage: thumbnailUrl }}
      >
        <div className="contest-item-img-buttons">
          <Link href={`/portfolios/${slug}`}>
            <a className="btn butt-xs butt-white-out flex-center">
              <FaEye /> مشاهدة
            </a>
          </Link>
        </div>
      </div>
      <div className="contest-item-content">
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
  );
}
ContestEntierPost.propTypes = {
  thumbnail: PropTypes.any,
  avatar: PropTypes.string,
  author: PropTypes.string,
  slug: PropTypes.string,
  username: PropTypes.string,
  heartCount: PropTypes.number,
  views: PropTypes.number,
  level: PropTypes.string,
};

export default ContestEntierPost;
