/*
|--------------------------------------------------------------------------
| Login View.
|--------------------------------------------------------------------------
|
| The view where a user can log in. Redux is used to make the api call.
|
*/

import React, { ReactElement, useEffect, useState, SyntheticEvent } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import { motion } from "framer-motion";
import * as Yup from 'yup';

const Login = (): ReactElement => {
    const router = useRouter()
    const SignupSchema = Yup.object().shape({
        email: Yup.string().required('هذا الحقل إجباري'),
        password: Yup.string().required('هذا الحقل إجباري'),
    });
    // Return statement.
    return (
        <div>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                validationSchema={SignupSchema}
                onSubmit={async values => {
                    try {
                        const res = await axios.post("https://api.wazzfny.com/dashboard/login", values, { withCredentials: true });
                        // If Activate Network 
                        // Authentication was successful.
                        if (res.status == 201 || res.status == 200) {
                            alert('تمت الإضافة بنجاح')
                            router.push('/dashboard')
                        } else {
                            alert('Error')
                        }
                    } catch (ex) {
                        
                        if (ex.response && ex.response.status === 422) {
                            alert(ex.response.data.errors)
                        }
            
                        if (ex.response && ex.response.status === 401) {
                            alert(ex.response.data);
                        }
                    }
                }}
            >
                {({ errors, touched, isSubmitting }) => (
                    <Form>
                        <div className={"panel-modal-body auto-height" + (isSubmitting ? ' is-loading' : '')}>
                            {!isSubmitting ? '' :
                                <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="is-loading">
                                    <div className="spinner-border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </motion.div>
                            }
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="timlands-form">
                                        <label className="label-block" htmlFor="email">البريد الإلكتروني</label>
                                        <Field
                                            id="email"
                                            name="email"
                                            placeholder="البريد الإلكتروني..."
                                            className="timlands-inputs"
                                            autoComplete="off"
                                        />
                                        {errors.email && touched.email ?
                                            <div style={{ overflow: 'hidden' }}>
                                                <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                                    <p className="text">{errors.email}</p>
                                                </motion.div>
                                            </div>
                                            :
                                            null}
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="timlands-form">
                                        <label className="label-block" htmlFor="password">كلمة المرور</label>
                                        <Field
                                            id="password"
                                            name="password"
                                            placeholder="كلمة المرور..."
                                            className="timlands-inputs"
                                            autoComplete="off"
                                        />
                                        {errors.password && touched.password ?
                                            <div style={{ overflow: 'hidden' }}>
                                                <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                                    <p className="text">{errors.password}</p>
                                                </motion.div>
                                            </div>
                                            :
                                            null}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="panel-modal-footer">
                            <button type="submit" disabled={isSubmitting} className="btn butt-primary butt-sm">حفظ التغييرات</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Login;
