import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { motion } from "framer-motion";
import { message, Spin } from 'antd';
import { useFormik } from 'formik';
import API from "../config";
import Cookies from "js-cookie";
import { Alert } from './Alert/Alert';

function SuspensionTimer({ setIsShowSuspensionTimer, id, onSuspend }: any) {

    const [validationsErrors, setValidationsErrors]: any = useState({});
    const [validationsGeneral, setValidationsGeneral]: any = useState({});

    let token = Cookies.get("token");
    if (!token && typeof window !== "undefined")
        token = localStorage.getItem("token");

    const formik = useFormik({
        initialValues: {
            cause: '',
            susponds: [],
            shutdownTime: 0,
        },
        isInitialValid: true,
        enableReinitialize: true,
        onSubmit: async (values) => {
            onSuspend({comment:values.cause,expired_at:values.shutdownTime})
            setIsShowSuspensionTimer(false)
        },
    });
    return (
        <div className="single-comments-overlay">
            <motion.div initial={{ scale: 0, opacity: 0, y: 60 }} exit={{ scale: 0, opacity: 0, y: 60 }} animate={{ scale: 1, opacity: 1, y: 0 }} className="single-comments-modal">
                <div className="modal-title">
                    <h4 className="title">
                        تعليق الحساب للشخص {id}
                    </h4>
                    <button
                        className='btn-close'
                        type='button'
                        onClick={() => setIsShowSuspensionTimer(false)}></button>
                </div>

                <div className="modal-body">
                    {validationsGeneral.msg && <Alert type="error">{validationsGeneral.msg}</Alert>}
                    <Spin spinning={formik.isSubmitting}>
                        <form onSubmit={formik.handleSubmit}>


                            <div className="timlands-form" style={{ marginTop: -17 }}>
                                <label htmlFor="input-cause" style={{ fontSize: 13, fontWeight: 'bold', marginBottom: 10 }} className="form-text">أكتب سبب التعليق</label>
                                <div className="relative-form d-flex">
                                    <textarea
                                        id="input-cause"
                                        name="cause"
                                        placeholder="أكتب سبب التعليق..."
                                        className={"timlands-inputs"}
                                        value={formik.values.cause}
                                        onChange={formik.handleChange}
                                    />
                                </div>
                                {validationsErrors && validationsErrors.cause &&
                                    <motion.div initial={{ y: -6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                        <p className="text">{validationsErrors.cause[0]}</p>
                                    </motion.div>
                                }
                            </div>
                            <div className="timlands-form">
                                <label htmlFor="input-shutdownTime" style={{ fontSize: 13, fontWeight: 'bold', marginBottom: 10 }} className="form-text">مدة تعليق الحساب</label>
                                <div className="relative-form d-flex">
                                    <input
                                        id="input-shutdownTime"
                                        name="shutdownTime"
                                        type='number'
                                        placeholder="مدة التعليق..."
                                        className={"timlands-inputs"}
                                        value={formik.values.shutdownTime}
                                        onChange={formik.handleChange}
                                    />
                                </div>
                                {validationsErrors && validationsErrors.shutdownTime &&
                                    <motion.div initial={{ y: -6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                        <p className="text">{validationsErrors.shutdownTime[0]}</p>
                                    </motion.div>
                                }
                            </div>
                            <div className="sus-options-inner" style={{ overflowY: 'scroll', height: 210 }}>
                                <div className="sus-options">
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name='susponds'
                                            onChange={formik.handleChange}
                                            value="1"
                                            id="suspond-1"
                                        />
                                        <label className="form-check-label" htmlFor="suspond-1">
                                            إيقاف عمليات الشراء
                                        </label>
                                    </div>
                                </div>
                                <div className="sus-options">
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name='susponds'
                                            onChange={formik.handleChange}
                                            value="2"
                                            id="suspond-2"
                                        />
                                        <label className="form-check-label" htmlFor="suspond-2">
                                            إيقاف عمليات البيع
                                        </label>
                                    </div>
                                </div>
                                <div className="sus-options">
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name='susponds'
                                            onChange={formik.handleChange}
                                            value="3"
                                            id="suspond-3"
                                        />
                                        <label className="form-check-label" htmlFor="suspond-3">
                                            إيقاف المراسلات
                                        </label>
                                    </div>
                                </div>
                                <div className="sus-options">
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name='susponds'
                                            onChange={formik.handleChange}
                                            value="4"
                                            id="suspond-4"
                                        />
                                        <label className="form-check-label" htmlFor="suspond-4">
                                            إيقاف التسليم
                                        </label>
                                    </div>
                                </div>
                                <div className="sus-options">
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name='susponds'
                                            onChange={formik.handleChange}
                                            value="5"
                                            id="suspond-5"
                                        />
                                        <label className="form-check-label" htmlFor="suspond-5">
                                            إيقاف إضافة خدمة
                                        </label>
                                    </div>
                                </div>
                                <div className="sus-options">
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name='susponds'
                                            onChange={formik.handleChange}
                                            value="6"
                                            id="suspond-6"
                                        />
                                        <label className="form-check-label" htmlFor="suspond-6">
                                            إيقاف ظهور الخدمات في الموقع
                                        </label>
                                    </div>
                                </div>
                                <div className="sus-options">
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name='susponds'
                                            onChange={formik.handleChange}
                                            value="7"
                                            id="suspond-7"
                                        />
                                        <label className="form-check-label" htmlFor="suspond-7">
                                            إيقاف التعديل على الخدمات
                                        </label>
                                    </div>
                                </div>
                                <div className="sus-options">
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name='susponds'
                                            onChange={formik.handleChange}
                                            value="8"
                                            id="suspond-8"
                                        />
                                        <label className="form-check-label" htmlFor="suspond-8">
                                            إيقاف حذف الخدمات
                                        </label>
                                    </div>
                                </div>
                                <div className="sus-options">
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name='susponds'
                                            onChange={formik.handleChange}
                                            value="9"
                                            id="suspond-9"
                                        />
                                        <label className="form-check-label" htmlFor="suspond-9">
                                            إيقاف سحب الأموال
                                        </label>
                                    </div>
                                </div>
                                <div className="sus-options">
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name='susponds'
                                            onChange={formik.handleChange}
                                            value="10"
                                            id="suspond-10"
                                        />
                                        <label className="form-check-label" htmlFor="suspond-10">
                                            إيقاف تغيير الحساب إلى بائع
                                        </label>
                                    </div>
                                </div>
                                <div className="sus-options">
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name='susponds'
                                            onChange={formik.handleChange}
                                            value="11"
                                            id="suspond-11"
                                        />
                                        <label className="form-check-label" htmlFor="suspond-11">
                                            إيقاف تسجيل الدخول
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <button className='btn butt-primary butt-sm mx-1' type='submit'>تعليق الحساب</button>
                            <button className='btn butt-red-text butt-sm mx-1' onClick={() => setIsShowSuspensionTimer(false)} type='button'>إغلاق</button>
                        </form>
                    </Spin>
                </div>
            </motion.div>
        </div>
    )
}

SuspensionTimer.propTypes = {
    id: PropTypes.any,
    setIsShowSuspensionTimer: PropTypes.func,
    refreshData: PropTypes.func,
    onSuspend:PropTypes.func
}

export default SuspensionTimer
