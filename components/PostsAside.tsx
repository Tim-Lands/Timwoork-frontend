import React, { ReactElement } from 'react'
import PropTypes from "prop-types";
import Post from './Post/Post';

function PostsAside({ PostData, title, colNumber }): ReactElement {
    return (
        <div className="posts-aside">
            <div className="posts-aside-header">
                <h1 className="title">{title}</h1>
            </div>
            <div className="posts-aside-body">
                <div className="row">
                    {PostData.map(e => (
                        <div key={e.id} className={"col-md-" + (colNumber || 3)}>
                            <Post
                                title={e.title}
                                author={e.author}
                                rate={e.rate}
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
};
