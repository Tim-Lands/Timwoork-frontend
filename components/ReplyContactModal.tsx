import { Space } from 'antd'
import React, { ReactElement, useState } from 'react'
import PropTypes from "prop-types";
import { motion } from "framer-motion";

function ReplyContactModal({ setIsConfirmText, handleFunc, title }): ReactElement {
    const [fromState, setFromState] = useState('')
    const [toState, setToState] = useState('')
    const [messageState, setMessageState] = useState('')
    
    const [validationsErrors, setValidationsErrors]: any = useState({});

    return (
        <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className='modal-conferm'>
            <div className="modal-conferm-inner">
                <div className="modal-conferm-head">
                    <h3 className="title" style={{ fontSize: 17 }}>
                        {title}
                    </h3>
                </div>
                <div className="modal-conferm-body" style={{ paddingTop: 0 }}>
                    <div className="timlands-form">
                        <label className="label-block" htmlFor="input-msg">
                            من
                        </label>
                        <input
                            type='text'
                            id="input-msg"
                            name="fromState"
                            placeholder="من..."
                            className={
                                "timlands-inputs sm " +
                                (validationsErrors &&
                                    validationsErrors.fromState &&
                                    " has-error")
                            }
                            onChange={e => setFromState(e.target.value)}
                            value={fromState}
                        />
                        {validationsErrors && validationsErrors.fromState && (
                            <div style={{ overflow: "hidden" }}>
                                <motion.div
                                    initial={{ y: -70, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    className="timlands-form-note form-note-error"
                                >
                                    <p className="text">
                                        {validationsErrors.fromState[0]}
                                    </p>
                                </motion.div>
                            </div>
                        )}
                    </div>
                    <div className="timlands-form">
                        <label className="label-block" htmlFor="input-toState">
                            إلى
                        </label>
                        <input
                            type='text'
                            id="input-toState"
                            name="toState"
                            placeholder="إلى..."
                            className={
                                "timlands-inputs sm " +
                                (validationsErrors &&
                                    validationsErrors.toState &&
                                    " has-error")
                            }
                            onChange={e => setToState(e.target.value)}
                            value={toState}
                        />
                        {validationsErrors && validationsErrors.toState && (
                            <div style={{ overflow: "hidden" }}>
                                <motion.div
                                    initial={{ y: -70, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    className="timlands-form-note form-note-error"
                                >
                                    <p className="text">
                                        {validationsErrors.toState[0]}
                                    </p>
                                </motion.div>
                            </div>
                        )}
                    </div>
                    <div className="timlands-form">
                        <label className="label-block" htmlFor="input-messageState">
                            نص الرسالة
                        </label>
                        <textarea
                            id="input-messageState"
                            name="messageState"
                            placeholder="نص الرسالة..."
                            className={
                                "timlands-inputs sm " +
                                (validationsErrors &&
                                    validationsErrors.messageState &&
                                    " has-error")
                            }
                            onChange={e => setMessageState(e.target.value)}
                            value={messageState}
                            style={{
                                minHeight: 140
                            }}
                        />
                        {validationsErrors && validationsErrors.messageState && (
                            <div style={{ overflow: "hidden" }}>
                                <motion.div
                                    initial={{ y: -70, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    className="timlands-form-note form-note-error"
                                >
                                    <p className="text">
                                        {validationsErrors.messageState[0]}
                                    </p>
                                </motion.div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="modal-conferm-footer">
                    <Space>
                        <button className='btn butt-sm butt-green' onClick={() => handleFunc()}>إرسال الآن</button>
                        <button
                            className='btn butt-sm butt-red-text'
                            onClick={() => {
                                setIsConfirmText(false)  
                                setValidationsErrors() // just Test
                            }}
                        >إلغاء الأمر</button>
                    </Space>
                </div>
            </div>
        </motion.div>
    )
}

export default ReplyContactModal
ReplyContactModal.propTypes = {
    setIsConfirmText: PropTypes.func,
    title: PropTypes.string,
    handleFunc: PropTypes.func,
};