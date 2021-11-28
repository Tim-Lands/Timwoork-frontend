import React, { ReactElement } from 'react'
import PropTypes from "prop-types";
import Post from './Post/Post';

function PostsAside({ PostData, title, colNumber, isError, isLoading }): ReactElement {
    if (isError) return (
        <div className="posts-aside error">
            <div className="posts-aside-header">
                <h1 className="title">حدث خطأ</h1>
            </div>
            <div className="posts-aside-body">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis vel harum ab! Debitis officiis illum tenetur sed inventore!</p>
            </div>
        </div>
    )
    if (isLoading) return (
        <div className="posts-aside loading">
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
        </div>
    )
    return (
        <div className="posts-aside">
            <div className="posts-aside-header">
                <h1 className="title">{title}</h1>
            </div>
            <div className="posts-aside-body">
                <div className="row">
                    {PostData.map((e: any) => (
                        <div key={e.id} className={"col-md-" + (colNumber || 3)}>
                            <Post
                                size="small"
                                title={e.title}
                                author={e.author}
                                //rate={e.rate}
                                price={e.price}
                                postUrl={e.postUrl}
                                thumbnail={e.thumbnail}
                                period={e.period}
                                buyers={e.buyers}
                                userUrl={e.userUrl}
                                product={e}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default PostsAside
PostsAside.propTypes = {
    title: PropTypes.string,
    PostData: PropTypes.array,
    colNumber: PropTypes.number,
    isLoading: PropTypes.any,
    isError: PropTypes.any,
};
