import React, { ReactElement } from 'react'
import PropTypes from "prop-types";
import Link from "next/link";

function Post({ title, thumbnail, postUrl, author, userUrl, rate, buyers, price }): ReactElement {
    const thumbnailUrl = `url(${thumbnail})`;
    return (
        <div className="timlands-post-item">
            <Link href={postUrl}>
                <div className="post-item-img" style={{ backgroundImage: thumbnailUrl }}></div>
            </Link>
            <div className="post-item-content">
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

                </ul>
            </div>
            <div className="post-item-footer">
                    <p className="post-meta-price">
                        Price at: {price}.00$
                    </p>
                    <p className="post-meta-bayer">
                        {((buyers == 0) ? buyers : buyers + ' Bayers') || "Buy Now"}
                    </p>
            </div>
        </div>
    )
}
Post.propTypes = {
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

export default Post
