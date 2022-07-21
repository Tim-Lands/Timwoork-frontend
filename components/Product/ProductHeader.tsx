import PropTypes from "prop-types";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { LanguageContext } from "../../contexts/languageContext/context";

export default function ProductHeader({
  title,
  username,
  avatar,
  myLoader,
  fullname,
  category,
  ratings_count,
  level,
}) {
  const showStars = () => {
    const rate = Number(ratings_count);
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
    const y: number = x - Number(rate);
    const yut: any = xAr && xAr.slice(y);
    if (rate == null) {
      return 0;
    }
    if (y == 0) {
      return yut;
    } else {
      const yut2: any = yAr && yAr.slice(-y, x);
      return yut.concat(yut2);
    }
  };
  const { getSectionLanguage } = useContext(LanguageContext);
  const getAll = getSectionLanguage("all");
  return (
    <div className="timwoork-single-header">
      <h1 className="title">{title}</h1>
      <div className="timwoork-single-header-meta d-flex">
        <ul className="single-header-meta nav me-auto">
          <li className="user-item">
            <Link href={`/u/${username}`}>
              <a className="user-link">
                <Image
                  className="circular-center tiny-size"
                  loader={myLoader}
                  src={avatar}
                  quality={1}
                  width={32}
                  height={32}
                  placeholder="blur"
                  blurDataURL="/avatar2.jpg"
                />
                <span className="pe-2">{fullname}</span>
              </a>
            </Link>
          </li>
          <li className="category-item">
            <Link href={`/category/${3}`}>
              <a className="category-link">
                <span className="material-icons material-icons-outlined">
                  label
                </span>
                {category}
              </a>
            </Link>
          </li>
        </ul>
        <ul className="single-header-meta nav ml-auto">
          <li className="rate-stars">
            <span className="stars-icons">
              {showStars().map((e: any) => (
                <span key={e.id}>{e.name}</span>
              ))}
            </span>
            <span className="stars-count">({ratings_count})</span>
          </li>
          <li className="level-item">
            <span className="text-level">{getAll("Level")}</span>
            <span className="value-level">{level.name_ar}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
ProductHeader.propTypes = {
  title: PropTypes.string,
  username: PropTypes.string,
  avatar: PropTypes.string,
  myLoader: PropTypes.func,
  fullname: PropTypes.string,
  category: PropTypes.any,
  ratings_count: PropTypes.any,
  level: PropTypes.any,
};
