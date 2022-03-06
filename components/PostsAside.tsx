import React, { ReactElement } from 'react'
import PropTypes from "prop-types";
import Post from './Post/Post';
import { Alert } from './Alert/Alert';
import Link from 'next/link';

function PostsAside({ PostData, title, colNumber, isError, linkURL }): ReactElement {
    if (isError) return (
        <div className="posts-aside error">
            <div className="posts-aside-header">
                <h1 className="title">حدث خطأ</h1>
            </div>
            <div className="posts-aside-body">
                <Alert type="error">
                    لا توجد خدمات لعرضها 
                </Alert>
            </div>
        </div>
    )
    return (
        <>
            {!PostData && <div className="posts-aside loading">
                <div className="posts-aside-header">
                    <h1 className="title">
                        <div className="loading-title"></div>
                    </h1>
                </div>
                <div className="posts-aside-body">
                    <div className="loading-container">
                        <div className="row">
                            <div className={"col-md-" + (colNumber || 3)}>
                                <div className="loading-container-item">
                                    <div className="container-item-img"></div>
                                    <div className="container-item-title"></div>
                                    <div className="container-item-title2"></div>
                                    <div className="container-item-meta"></div>
                                </div>
                            </div>
                            <div className={"col-md-" + (colNumber || 3)}>
                                <div className="loading-container-item">
                                    <div className="container-item-img"></div>
                                    <div className="container-item-title"></div>
                                    <div className="container-item-title2"></div>
                                    <div className="container-item-meta"></div>
                                </div>
                            </div>
                            <div className={"col-md-" + (colNumber || 3)}>
                                <div className="loading-container-item">
                                    <div className="container-item-img"></div>
                                    <div className="container-item-title"></div>
                                    <div className="container-item-title2"></div>
                                    <div className="container-item-meta"></div>
                                </div>
                            </div>
                            <div className={"col-md-" + (colNumber || 3)}>
                                <div className="loading-container-item">
                                    <div className="container-item-img"></div>
                                    <div className="container-item-title"></div>
                                    <div className="container-item-title2"></div>
                                    <div className="container-item-meta"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
            {PostData && PostData.length !== 0 && <div className="posts-aside">
                <div className="posts-aside-header">
                    <h1 className="title me-auto">{title}</h1>
                    <Link href={linkURL}>
                        <a className='btn flex-center butt-xs butt-light ml-auto'>
                            المزيد...
                        </a>
                    </Link>
                </div>
                <div className="posts-aside-body">
                    <div className="row">
                        {PostData.map((e: any) => (
                            <div key={e.id} className={"col-md-" + (colNumber || 3)}>
                                <Post
                                    size="small"
                                    title={e.title}
                                    author={e.profile_seller && (e.profile_seller.profile.first_name + ' ' + e.profile_seller.profile.last_name)}
                                    rate={e.ratings_avg}
                                    username={e.profile_seller && e.profile_seller.profile.user.username}
                                    price={e.price}
                                    slug={e.slug}
                                    thumbnail={e.full_path_thumbnail}
                                    buyers={e.count_buying}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>}
        </>
    )
}
export default PostsAside
PostsAside.propTypes = {
    title: PropTypes.string,
    linkURL: PropTypes.string,
    PostData: PropTypes.array,
    colNumber: PropTypes.number,
    isError: PropTypes.any,
};
