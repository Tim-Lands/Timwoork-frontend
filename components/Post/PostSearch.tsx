import React, { ReactElement } from 'react'
import PropTypes from "prop-types";
import Link from "next/link";

function PostSearch({title, thumbnail, postUrl, author, userUrl, rate, period, buyers, price}): ReactElement {
    const thumbnailUrl = `url(${thumbnail})`;
    return (
        <div className="timlands-post-item post-item-search">
            <div className="d-flex">
                <Link href={postUrl}>
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
                        <Link href={postUrl}>
                            <a>
                                {title}
                            </a>
                        </Link>
                    </h3>
                    <ul className="nav post-meta">
                        <li className="post-meta-user">
                            <Link href={userUrl}>
                                <a>
                                    <span className="material-icons material-icons-outlined">person_outline</span> {author}
                                </a>
                            </Link>
                        </li>
                        <li className="post-meta-rate">
                            <span className="material-icons material-icons-outlined">grade</span> {rate}
                        </li>
                        
                        <li className="post-meta-delay">
                            مدة التسليم: {period}
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
    postUrl: PropTypes.string,
    author: PropTypes.string,
    userUrl: PropTypes.string,
    rate: PropTypes.number,
    period: PropTypes.number,
    buyers: PropTypes.number,
    price: PropTypes.number,
};

export default PostSearch
