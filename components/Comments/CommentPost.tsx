import React, { ReactElement } from 'react'
import PropTypes from "prop-types";
import Image from 'next/image'

function CommentPost(props: any): ReactElement {
    const APIURL = 'https://www.api.timwoork.com/avatars/'
    const myLoader = () => {
        return `${APIURL}${props.avatar}`;
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
        const y: number = x - props.rating
        const yut: any = xAr.slice(y)
        if (y == 0) {
            return yut
        } else {
            const yut2: any = yAr.slice(-y, x)
            return yut.concat(yut2)
        }
    }
    return (
        <li className="comment-item">
            <div className="d-flex">
                <div className="comment-item-avatar">
                    {props.avatar == 'avatar.png' ?
                        <Image className="circular-img huge-size" src="/avatar2.jpg" width={45} height={45} /> :
                        <Image
                            className="circular-img huge-size"
                            loader={myLoader}
                            src={APIURL + props.avatar}
                            quality={1}
                            width={45}
                            height={45}
                            placeholder='blur'
                            blurDataURL='/avatar2.jpg'
                        />
                    }
                </div>
                <div className="comment-item-content">
                    <p className="meta-time">
                        <span className="material-icons material-icons-outlined">schedule</span>
                        {props.time}
                    </p>
                    <h3 className="user-title">{props.author}</h3>
                    <p className="user-ratting">
                        <span className="stars-icons">
                            {showStars().map((e: any) => <span key={e.id}>{e.name}</span>)}
                        </span>
                    </p>
                    <p className="item-text">
                        {props.content}
                    </p>
                </div>
            </div>
            {props.replies &&
                <ul className="list-items-replies">
                    {props.replies.map((e: any) => (
                        <li key={e.id} className="reply-item">
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
    rating: PropTypes.number,
    content: PropTypes.string,
    replies: PropTypes.array
};
