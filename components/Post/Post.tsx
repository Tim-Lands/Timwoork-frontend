import React, { ReactElement } from 'react'
import PropTypes from "prop-types";
import Link from "next/link";

const APIURL = 'https://api.timwoork.com/avatars/'
function Post({
    title,
    thumbnail,
    author,
    buyers,
    price,
    size,
    slug,
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
    /*const showStars = () => {
        const xAr: any = [
            <span className="material-icons">grade</span>,
            <span className="material-icons">grade</span>,
            <span className="material-icons">grade</span>,
            <span className="material-icons">grade</span>,
            <span className="material-icons">grade</span>
        ]
        const yAr: any = [
            <span className="material-icons material-icons-outlined">grade</span>,
            <span className="material-icons material-icons-outlined">grade</span>,
            <span className="material-icons material-icons-outlined">grade</span>,
            <span className="material-icons material-icons-outlined">grade</span>,
            <span className="material-icons material-icons-outlined">grade</span>,
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
    }*/
    return (
        <div className={"timlands-post-item" + sizeClass()}>
            <Link href={'/p/' + slug}>
                <a>
                    <div className="post-item-img" style={{ backgroundImage: thumbnailUrl }}></div>
                </a>
            </Link>
            <div className="post-item-content">
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
                        {/*showStars.map(e => e)*/}
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
    author: PropTypes.string,
    slug: PropTypes.string,
    size: PropTypes.string,
    rate: PropTypes.number,
    buyers: PropTypes.number,
    price: PropTypes.number,
    product: PropTypes.any
};

export default Post
