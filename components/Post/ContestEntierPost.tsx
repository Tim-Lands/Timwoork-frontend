import React, { ReactElement } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "antd";
import { AiOutlineLike } from "react-icons/ai";

function ContestEntierPost({
  thumbnail,
  isWin,
  author,
  id,
  level,
  username,
  avatar,
  // views,
  slug,
}): ReactElement {
  const thumbnailUrl = `url(${thumbnail})`;
  // const [isFavorated, setIsFavorated] = useState(false);

  return (
    <Badge.Ribbon color={'orange'} text="الفائز الأول" style={{ display: isWin ? "block" : "none" }}>
      <div className={"timlands-contest-entier-post"}>
        <div
          className="contest-item-img"
          style={{ backgroundImage: thumbnailUrl }}
        >
          <Link href={`/contests/${slug}/posts/${id}`}>
            <a className="btn butt-white-out butt-xs">مشاهدة...</a>
          </Link>
        </div>
        <div className="contest-item-content p-2">
          <p className="public-vote">
            تصويت الجمهور{" "}
            <small>
              (<AiOutlineLike /> 12 )
            </small>
          </p>
          <div className="progress" style={{ height: 3 }}>
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: "25%" }}
            ></div>
          </div>
          <Link href={`/u/${username}`}>
            <a className="user-mata-post">
              <div className="user-mata-post-img">
                <Image src={avatar} width={30} height={30} alt={author} />
              </div>
              <div className="user-mata-post-content">
                <p className="text-user">{author}</p>
                <p className="text-meta">{level}</p>
              </div>
            </a>
          </Link>
        </div>
      </div>
    </Badge.Ribbon>
  );
}
ContestEntierPost.propTypes = {
  thumbnail: PropTypes.any,
  id: PropTypes.any,
  avatar: PropTypes.string,
  author: PropTypes.string,
  slug: PropTypes.string,
  username: PropTypes.string,
  heartCount: PropTypes.number,
  views: PropTypes.number,
  isWin: PropTypes.bool,
  level: PropTypes.string,
};

export default ContestEntierPost;
