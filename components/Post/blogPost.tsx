import React, { ReactElement } from 'react'
import PropTypes from "prop-types";
import Link from "next/link";

function Post({
    title,
    thumbnail,
    size,
    slug,
    excerpt,
}): ReactElement {
    const thumbnailUrl = `url(${thumbnail})`;
    const sizeClass = () => {
        switch (size) {
            case 'small':
                return ' small'
            default:
                return ''
        }
    }
    return (
        <div className={"timlands-post-item" + sizeClass()}>
            <a href={`/blog/${slug}`}>
                <div className="post-item-img" style={{ backgroundImage: thumbnailUrl }}></div>
            </a>
            <div className="post-item-content">
                <h3 className="title">
                    <a href={`/blog/${slug}`}>
                        {title}
                    </a>
                </h3>
                <ul className="nav post-meta">
                    <li className="post-meta-user" dangerouslySetInnerHTML={{__html: excerpt}}>
                    </li>
                </ul>
            </div>
            <div className="post-item-footer">
                <p className="post-meta-bayer">
                    <a href={`/blog/${slug}`} className='btn butt-xs butt-primary'>
                        قراءة المزيد  
                    </a>
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
    excerpt: PropTypes.string,
};

export default Post
