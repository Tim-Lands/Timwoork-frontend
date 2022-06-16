import React, { ReactElement } from "react";
import PropTypes from "prop-types";
import Link from "next/link";

function Post({ title, thumbnail, size, slug, excerpt }): ReactElement {
  const thumbnailUrl = `url(${thumbnail})`;
  const sizeClass = () => {
    switch (size) {
      case "small":
        return " small";
      default:
        return "";
    }
  };
  return (
    <div className={"timlands-post-item" + sizeClass()}>
      <Link href={`/blog/${slug}`}>
        <a>
          <div
            className="post-item-img"
            style={{ backgroundImage: thumbnailUrl }}
          ></div>
        </a>
      </Link>
      <div className="post-item-content">
        <h3 className="title">
          <Link href={`/blog/${slug}`}>
            <a href={`/blog/${slug}`}>{title}</a>
          </Link>
        </h3>
        <ul className="nav post-meta">
          <li
            className="post-meta-user blog"
            style={{ borderLeft: "none" }}
            dangerouslySetInnerHTML={{ __html: excerpt }}
          ></li>
        </ul>
      </div>
      <div className="post-item-footer">
        <p className="post-meta-bayer">
          <Link href={`/blog/${slug}`}>
            <a href={`/blog/${slug}`} className="btn butt-xs butt-primary">
              قراءة المزيد
            </a>
          </Link>
        </p>
      </div>
    </div>
  );
}
Post.propTypes = {
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string,
  slug: PropTypes.string,
  size: PropTypes.string,
  excerpt: PropTypes.string,
};

export default Post;
