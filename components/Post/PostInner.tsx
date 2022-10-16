import React, { ReactElement, useContext } from "react";
import PropTypes from "prop-types";
import useSWR from "swr";
import Link from "next/link";
import Image from "next/image";
import { CurrencyContext } from "../../contexts/currencyContext";
import { useAppSelector } from "@/store/hooks";

function PostInner({
  title,
  thumbnail,
  author,
  buyers,
  price,
  username,
  avatar,
  size,
  slug,
  rate = 2,
}): ReactElement {
  const { data: userInfo }: any = useSWR("api/me");
  const [, getCurrency] = useContext(CurrencyContext);
  const specCurrency = getCurrency(
    userInfo?.user_details?.profile?.currency?.code
  )?.value;
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
  const symbol =
    userInfo?.user_details?.profile?.currency?.symbol_native || "$";
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
  const { getAll, language } = useAppSelector((state) => state.languages);

  return (
    <div
      className={"timlands-post-inner" + sizeClass()}
      style={{ direction: language === "ar" ? "rtl" : "ltr" }}
    >
      <Link href={`/p/${slug}`}>
        <a>
          <div className="post-item-img">
            <img src={thumbnail} alt="thumbnail" />
          </div>
        </a>
      </Link>
      <div className="post-item-content">
        <h3 className="title">
          <Link href={`/p/${slug}`}>{title}</Link>
        </h3>
        <ul className="nav post-meta">
          <li className="post-meta-user">
            <div className="post-item-content">
              <ul className="nav post-meta">
                <li className="post-meta-user">
                  <Link href={`/u/${username}`}>
                    <a>
                      <Image
                        width={20}
                        height={20}
                        src={avatar}
                        alt={username}
                      />{" "}
                      <span>{author}</span>
                    </a>
                  </Link>
                </li>
                <li className="post-meta-rate">
                  {showStars().map((e: any) => {
                    return (
                      <span style={{ height: 16 }} key={e.id}>
                        {e.name}
                      </span>
                    );
                  })}
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
      <div className="post-item-footer">
        <p className="post-meta-price">
          {getAll("Price_from")}
          {specCurrency ? Math.round(price * specCurrency) + symbol : price}
        </p>
        <p className="post-meta-bayer">
          {(buyers == 0 ? buyers : buyers + getAll("Have_bought_this")) ||
            getAll("Buy_now")}
        </p>
      </div>
    </div>
  );
}
PostInner.propTypes = {
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string,
  author: PropTypes.string,
  slug: PropTypes.string,
  size: PropTypes.string,
  username: PropTypes.string,
  rate: PropTypes.any,
  buyers: PropTypes.number,
  avatar: PropTypes.string,
  price: PropTypes.number,
  product: PropTypes.any,
};

export default PostInner;
