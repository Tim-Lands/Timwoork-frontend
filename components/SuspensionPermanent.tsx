import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { motion } from "framer-motion";
import { message, Spin } from 'antd';
import { useFormik } from 'formik';
import API from "../config";
import Cookies from "js-cookie";
import { Alert } from './Alert/Alert';

function SuspensionPermanent({ setIsShowSuspensionPermanent, id, refreshData }: any) {

    const [validationsErrors, setValidationsErrors]: any = useState({});
    const [validationsGeneral, setValidationsGeneral]: any = useState({});

    let token = Cookies.get("token");
    if (!token && typeof window !== "undefined")
        token = localStorage.getItem("token");

    const formik = useFormik({
        initialValues: {
            cause: '',
            susponds: [],
        },
        isInitialValid: true,
        enableReinitialize: true,
        onSubmit: async (values) => {
            try {
                setValidationsErrors({});
                const res = await API.post(
                    `api/hereapiURL/${id}`,
                    values,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                // Authentication was successful.
                if (res.status === 200) {
                    message.success("لقد تم تعليق الحساب بنجاح");
                    setIsShowSuspensionPermanent(false)
                    refreshData()
                }
            } catch (error: any) {
                if (
                    error.response &&
                    error.response.data &&
                    error.response.data.errors
                ) {
                    setValidationsErrors(error.response.data.errors);
                }

                if (error.response && error.response.data) {
                    setValidationsGeneral(error.response.data);
                }
            }
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
                        onClick={() => setIsShowSuspensionPermanent(false)}></button>
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
                                        style={{ minHeight: 160 }}
                                        onChange={formik.handleChange}
                                    />
                                </div>
                                {validationsErrors && validationsErrors.cause &&
                                    <motion.div initial={{ y: -6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                        <p className="text">{validationsErrors.cause[0]}</p>
                                    </motion.div>
                                }
                            </div>
                            <hr />
                            <button className='btn butt-primary butt-sm mx-1' type='submit'>تعليق الحساب</button>
                            <button className='btn butt-red-text butt-sm mx-1' onClick={() => setIsShowSuspensionPermanent(false)} type='button'>إغلاق</button>
                        </form>
                    </Spin>
                </div>
            </motion.div>
        </div>
    )
}

SuspensionPermanent.propTypes = {
    id: PropTypes.any,
    setIsShowSuspensionPermanent: PropTypes.func,
    refreshData: PropTypes.func
}

export default SuspensionPermanent
