import React, { ReactElement } from 'react'
import PropTypes from "prop-types";
import Link from "next/link";

const APIURL = 'http://api.timwoork.com/products/thumbnails/'
function PostSearch({
    title,
    thumbnail,
    author,
    buyers,
    price,
    period,
    slug,
    rate = 2,
}): ReactElement {
    const thumbnailUrl = `url(${APIURL}${thumbnail})`;
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
        const y: number = x - rate
        const yut: any = xAr.slice(y)
        if (y == 0) {
            return yut
        } else {
            const yut2: any = yAr.slice(-y, x)
            return yut.concat(yut2)
        }
    }
    function durationFunc() {
        if (period == 1) {
          return 'يوم واحد'
        }
        if (period == 2) {
          return 'يومين'
        }
        if (period > 2 && period < 11) {
          return period + ' أيام '
        }
        if (period >= 11) {
          return period + ' يوم '
        }
      }
    return (
        <div className="timlands-post-item post-item-search">
            <div className="d-flex">
                <Link href={'/p/' + slug}>
                    <div className="post-item-img" style={{ backgroundImage: thumbnailUrl }}></div>
                </Link>
                <div className="post-item-content">
                    <ul className="nav post-meta">
                        <li className="post-meta-price">
                            السعر: {price}.00$
                        </li>
                        <li className="post-meta-bayer">
                            {((buyers == 1) ? 'مشتريين' : 'مشتري') && "اشتري الآن"}
                        </li>
                    </ul>
                    <h3 className="title">
                        <Link href={'/p/' + slug}>
                            <a>
                                {title}
                            </a>
                        </Link>
                    </h3>
                    <ul className="nav post-meta">
                        <li className="post-meta-user">
                            <Link href='/'>
                                <a>
                                    <span className="material-icons material-icons-outlined">person_outline</span> {author}
                                </a>
                            </Link>
                        </li>
                        <li className="post-meta-rate">
                            {showStars().map((e: any) => <span key={e.id}>{e.name}</span>)}
                        </li>

                        <li className="post-meta-delay">
                            مدة التسليم: {durationFunc()}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
PostSearch.propTypes = {
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string,
    author: PropTypes.string,
    slug: PropTypes.string,
    rate: PropTypes.number,
    period: PropTypes.number,
    buyers: PropTypes.number,
    price: PropTypes.number,
};

export default PostSearch
