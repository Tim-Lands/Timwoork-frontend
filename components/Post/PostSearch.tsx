import React, { ReactElement } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { LanguageContext } from "../../contexts/languageContext/context";
import { useContext } from "react";

function PostSearch({
  title,
  thumbnail,
  author,
  buyers,
  price,
  period,
  username,
  slug,
  rate = 2,
}): ReactElement {
  const thumbnailUrl = `url(${thumbnail})`;
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
    const y: number = x - rate;
    const yut: any = xAr.slice(y);
    if (y == 0) {
      return yut;
    } else {
      const yut2: any = yAr.slice(-y, x);
      return yut.concat(yut2);
    }
  };
  function durationFunc() {
    if (period == 1) {
      return getAll("One_day");
    }
    if (period == 2) {
      return getAll("2_days");
    }
    if (period > 2 && period < 11) {
      return period + getAll("Days");
    }
    if (period >= 11) {
      return period + getAll("Day");
    }
  }
  const { getSectionLanguage } = useContext(LanguageContext);
  const getAll = getSectionLanguage();
  return (
    <div className="timlands-post-item post-item-search">
      <div className="d-flex">
        <Link href={"/p/" + slug}>
          <div
            className="post-item-img"
            style={{ backgroundImage: thumbnailUrl }}
          ></div>
        </Link>
        <div className="post-item-content">
          <ul className="nav post-meta">
            <li className="post-meta-price">
              {getAll("Price")}
              {price}.00$
            </li>
            <li className="post-meta-bayer">
              {(buyers == 1 ? getAll("Buyers") : getAll("Buyer")) &&
                getAll("Buy_now")}
            </li>
          </ul>
          <h3 className="title">
            <Link href={"/p/" + slug}>
              <a>{title}</a>
            </Link>
          </h3>
          <ul className="nav post-meta">
            <li className="post-meta-user">
              <Link href={`/u/${username}`}>
                <a>
                  <span className="material-icons material-icons-outlined">
                    person_outline
                  </span>{" "}
                  {author}
                </a>
              </Link>
            </li>
            <li className="post-meta-rate">
              {showStars().map((e: any) => (
                <span key={e.id}>{e.name}</span>
              ))}
            </li>

            <li className="post-meta-delay">
              {getAll("Delivery_duration")}
              {durationFunc()}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
PostSearch.propTypes = {
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string,
  author: PropTypes.string,
  slug: PropTypes.string,
  username: PropTypes.string,
  rate: PropTypes.number,
  period: PropTypes.number,
  buyers: PropTypes.number,
  price: PropTypes.number,
};

export default PostSearch;
