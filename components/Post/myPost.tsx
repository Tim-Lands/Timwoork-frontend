import React, { ReactElement } from 'react'
import PropTypes from "prop-types";

const APIURL = 'http://api.timwoork.com/products/thumbnails/'
function Post({
    title,
    thumbnail,
    buyers,
    price,
    size,
    slug,
    rate = 2,
}): ReactElement {
    const thumbnailUrl = `url(${APIURL}${thumbnail})`;
    const sizeClass = () => {
        switch (size) {
            case 'small':
                return ' small'
            default:
                return ''
        }
    }
    const showStars = () => {
        const xAr: any = [
            {
                id: 1,
                name: <span className="material-icons-outlined">star</span>
            },
            {
                id: 2,
                name: <span className="material-icons-outlined">star</span>
            },
            {
                id: 3,
                name: <span className="material-icons-outlined">star</span>
            },
            {
                id: 4,
                name: <span className="material-icons-outlined">star</span>
            },
            {
                id: 5,
                name: <span className="material-icons-outlined">star</span>
            },
        ]
        const yAr: any = [
            {
                id: 6,
                name: <span className="material-icons-outlined outline-star">star_border</span>
            },
            {
                id: 7,
                name: <span className="material-icons-outlined outline-star">star_border</span>
            },
            {
                id: 8,
                name: <span className="material-icons-outlined outline-star">star_border</span>
            },
            {
                id: 9,
                name: <span className="material-icons-outlined outline-star">star_border</span>
            },
            {
                id: 10,
                name: <span className="material-icons-outlined outline-star">star_border</span>
            },
        ]

        const x: number = 5
        const y: number = x - Number(rate)
        const yut: any = xAr.slice(y)
        if (y == 0) {
            return yut
        } else {
            const yut2: any = yAr.slice(-y, x)
            return yut.concat(yut2)
        }
    }
    return (
        <div className={"timlands-post-item" + sizeClass()}>
            <a href={`/p/${slug}`}>
                <div className="post-item-img" style={{ backgroundImage: thumbnailUrl }}></div>
            </a>
            <div className="post-item-content">
                <h3 className="title">
                    <a href={`/p/${slug}`}>
                        {title}
                    </a>
                </h3>
                <ul className="nav post-meta">
                    <li className="post-meta-rate">
                        {showStars().map((e: any) => <span key={e.id}>{e.name}</span>)}
                    </li>

                </ul>
            </div>
            <div className="post-item-footer">
                <p className="post-meta-price">
                    السعر من: {price}.00$
                </p>
                <p className="post-meta-bayer">
                    {((buyers == 0) ? buyers : buyers + ' اشتروا هذا') || "اشتري الآن"}
                </p>
            </div>
        </div>
    )
}
Post.propTypes = {
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string,
    slug: PropTypes.string,
    size: PropTypes.string,
    rate: PropTypes.number,
    buyers: PropTypes.number,
    price: PropTypes.number,
};

export default Post
