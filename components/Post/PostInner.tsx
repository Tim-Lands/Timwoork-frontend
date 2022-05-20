import React, { ReactElement } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import Image from "next/image";

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
        <div className={"timlands-post-inner" + sizeClass()}>
            <div
                style={{ backgroundImage: thumbnailUrl }}
                className="post-item-img"></div>
            <div className="post-item-content">
                <h3 className="title">
                    <a href={`/p/${slug}`}>{title}</a>
                </h3>
                <ul className="nav post-meta">
                    <li className="post-meta-user">
                        <Link href={`/u/${username}`}>
                            <a>
                                <Image width={20} height={20} src={avatar} /> <span>{author}</span>
                            </a>
                        </Link>
                    </li>
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
