import React, { ReactElement } from 'react'
import PropTypes from "prop-types";
import Image from 'next/image'
import LastSeen from '../LastSeen';
import { useState } from 'react';
import { message } from 'antd';
import API from "../../config";
import { useFormik } from 'formik';
import Cookies from "js-cookie";
import { motion } from "framer-motion";

function CommentPost(props: any): ReactElement {
    const [validationsErrors, setValidationsErrors]: any = useState({});
    const [isShowCommentForm, setIsShowCommentForm]: any = useState(false);
    let token = Cookies.get("token");
    if (!token && typeof window !== "undefined")
        token = localStorage.getItem("token");
    const formik = useFormik({
        initialValues: {
            comment: "",
        },
        isInitialValid: true,
        enableReinitialize: true,
        onSubmit: async (values) => {
            try {
                setValidationsErrors({});
                const res = await API.post(
                    `api/product/product-step-one`,
                    values,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                // Authentication was successful.
                if (res.status === 200) {
                    message.success("لقد تم إضافة الرد بنجاح");
                    setIsShowCommentForm(false)
                }
            } catch (error: any) {
                if (
                    error.response &&
                    error.response.data &&
                    error.response.data.errors
                ) {
                    setValidationsErrors(error.response.data.errors);
                }
            }
        },
    });
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
            {!props.reply && <button className='btn butt-light butt-xs flex-center reply-button' onClick={() => setIsShowCommentForm(!isShowCommentForm)}>
                <span className="material-icons-outlined outline-star" style={{ fontSize: 16 }}>reply</span> الرد
            </button>}
            {isShowCommentForm &&
                <div className="single-comments-overlay">
                    <motion.div initial={{ scale: 0, opacity: 0, y: 60 }} exit={{ scale: 0, opacity: 0, y: 60 }} animate={{ scale: 1, opacity: 1, y: 0 }} className="single-comments-modal">
                        <div className="modal-title">
                            <h4 className="title">
                                إضافة رد
                            </h4>
                            <button
                                className='btn-close'
                                type='button'
                                onClick={() => setIsShowCommentForm(false)}></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="timlands-form">
                                    <label className="label-block" htmlFor="input-title">
                                        نص الرد
                                    </label>
                                    <textarea
                                        id="input-title"
                                        name="comment"
                                        placeholder="نص الرد..."
                                        className={
                                            "timlands-inputs " +
                                            (validationsErrors &&
                                                validationsErrors.comment &&
                                                " has-error")
                                        }
                                        autoComplete="off"
                                        onChange={formik.handleChange}
                                        value={formik.values.comment}
                                    />
                                    {validationsErrors && validationsErrors.comment && (
                                        <div style={{ overflow: "hidden" }}>
                                            <motion.div
                                                initial={{ y: -70, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                className="timlands-form-note form-note-error"
                                            >
                                                <p className="text">
                                                    {validationsErrors.comment[0]}
                                                </p>
                                            </motion.div>
                                        </div>
                                    )}
                                </div>
                                <hr />
                                <button className='btn butt-primary butt-sm mx-1' type='submit'>إضافة الرد</button>
                                <button className='btn butt-red-text butt-sm mx-1' onClick={() => setIsShowCommentForm(false)} type='button'>إغلاق</button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            }
            <div className="d-flex">
                <div className="comment-item-avatar">
                    <Image
                        className="circular-img huge-size"
                        src={props.avatar}
                        quality={1}
                        width={45}
                        height={45}
                        placeholder='blur'
                        blurDataURL='/avatar2.jpg'
                    />
                </div>
                <div className="comment-item-content">
                    <p className="meta-time">
                        <span className="material-icons material-icons-outlined">schedule</span>
                        <LastSeen date={props.time} />
                    </p>
                    <h4 className="user-title">{props.author}</h4>
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
                                    <h4 className="user-title">{e.author}</h4>
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
    reply: PropTypes.any,
    replies: PropTypes.array
};
