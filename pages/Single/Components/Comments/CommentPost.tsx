import React, { ReactElement } from 'react'
import PropTypes from "prop-types";

function CommentPost(props: any): ReactElement {
    return (
        <li className="comment-item">
            <div className="d-flex">
                <div className="comment-item-avatar">
                    <img src={props.avatar || "/avatar.png"} className="circular-img md-size" alt="" />
                </div>
                <div className="comment-item-content">
                    <p className="meta-time">
                        <span className="material-icons material-icons-outlined">schedule</span>
                        {props.time}
                    </p>
                    <h3 className="user-title">{props.author}</h3>
                    <p className="user-ratting">
                        <span className="stars-icons">
                            <span className="material-icons-outlined">star</span>
                            <span className="material-icons-outlined">star</span>
                            <span className="material-icons-outlined">star</span>
                            <span className="material-icons-outlined">star</span>
                            <span className="material-icons-outlined outline-star">star_border</span>
                        </span>
                        {props.rateCount}
                    </p>
                    <p className="item-text">
                        {props.content}
                    </p>
                </div>
            </div>
            {props.replies &&
                <ul className="list-items-replies">
                    {props.replies.map(e => (
                        <li className="reply-item">
                            <div className="d-flex">
                                <div className="comment-item-avatar">
                                    <img src={e.avatar || "/avatar.png"} className="circular-img md-size" alt="" />
                                </div>
                                <div className="comment-item-content">
                                    <p className="meta-time">
                                        <span className="material-icons material-icons-outlined">schedule</span>
                                        {e.time}
                                    </p>
                                    <h3 className="user-title">{e.author}</h3>
                                    <p className="item-text">
                                        {e.content}
                                    </p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            }
        </li>
    )
}

export default CommentPost

CommentPost.propTypes = {
    time: PropTypes.string,
    author: PropTypes.string,
    avatar: PropTypes.string,
    rateCount: PropTypes.number,
    content: PropTypes.string,
    replies: PropTypes.array
};
