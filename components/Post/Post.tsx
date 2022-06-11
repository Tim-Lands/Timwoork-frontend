import React, { ReactElement } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import Image from "next/image";

function Post({
  title,
  thumbnail,
  author,
  buyers,
  price,
  level,
  username,
  avatar,
  size,
  slug,
  rate = 2,
}): ReactElement {
  const thumbnailUrl = `url(${thumbnail})`;
  const sizeClass = () => {
    switch (size) {
      case "small":
        return " small";
      case "small2":
        return " small2";
      default:
        return "";
    }
  };
  const showStars = () => {
    const xAr: any = [
      {
        id: 1,
        name: <span className="material-icons-outlined">star</span>,
      },
      {
        id: 2,
        name: <span className="material-icons-outlined">star</span>,
      },
      {
        id: 3,
        name: <span className="material-icons-outlined">star</span>,
      },
      {
        id: 4,
        name: <span className="material-icons-outlined">star</span>,
      },
      {
        id: 5,
        name: <span className="material-icons-outlined">star</span>,
      },
    ];
    const yAr: any = [
      {
        id: 6,
        name: (
          <span className="material-icons-outlined outline-star">
            star_border
          </span>
        ),
      },
      {
        id: 7,
        name: (
          <span className="material-icons-outlined outline-star">
            star_border
          </span>
        ),
      },
      {
        id: 8,
        name: (
          <span className="material-icons-outlined outline-star">
            star_border
          </span>
        ),
      },
      {
        id: 9,
        name: (
          <span className="material-icons-outlined outline-star">
            star_border
          </span>
        ),
      },
      {
        id: 10,
        name: (
          <span className="material-icons-outlined outline-star">
            star_border
          </span>
        ),
      },
    ];

    const x: number = 5;
    const y: any = Number(x - Number(rate)).toPrecision(1);

    const yut: any = xAr.slice(y);
    if (y == 0) {
      return yut;
    } else {
      const yut2: any = yAr.slice(-y, x);
      return yut.concat(yut2);
    }
  };
  return (
    <div className={"timlands-post-item" + sizeClass()}>
      <Link href={`/p/${slug}`}>
        <a href={`/p/${slug}`}
          className="post-item-img"
          style={{ backgroundImage: thumbnailUrl }}
        ></a>
      </Link>
      <div className="post-item-content">
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
        <h3 className="title">
          <a href={`/p/${slug}`}>{title}</a>
        </h3>
        <ul className="nav post-meta">
          <li className="post-meta-rate">
            {showStars().map((e: any) => (
              <span key={e.id}>{e.name}</span>
            ))}
          </li>
        </ul>
      </div>
      <div className="post-item-footer">
        <p className="post-meta-price">السعر من: {price}$</p>
        <p className="post-meta-bayer">
          {(buyers == 0 ? buyers : buyers + " اشتروا هذا") || "اشتري الآن"}
        </p>
      </div>
    </div>
  );
}
Post.propTypes = {
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.any,
  avatar: PropTypes.string,
  author: PropTypes.string,
  slug: PropTypes.string,
  size: PropTypes.string,
  username: PropTypes.string,
  level: PropTypes.string,
  rate: PropTypes.any,
  buyers: PropTypes.number,
  price: PropTypes.number,
  product: PropTypes.any,
};

export default Post;
