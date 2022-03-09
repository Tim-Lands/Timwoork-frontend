import Layout from '../../components/Layout/HomeLayout'
import { ReactElement, useState } from "react";
import { useFormik } from 'formik';
import { message } from 'antd';
import { motion } from 'framer-motion';
import API from "../../config";
import PropTypes from "prop-types";

function Wise({ token }) {
    const [validationsErrors, setValidationsErrors]: any = useState({})
    const clearValidationHandle = () => {
        setValidationsErrors({})
    }
    const formik = useFormik({
        initialValues: {
            email: '',
        },
        isInitialValid: true,
        enableReinitialize: true,
        onSubmit: async values => {
            console.log(values);
            return
            try {
                setValidationsErrors({})
                const res = await API.post(`api/product/product-step-one`, values, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                // Authentication was successful.
                if (res.status === 200) {
                    message.success('لقد تم التحديث بنجاح')
                }
            } catch (error: any) {
                if (error.response && error.response.data && error.response.data.errors) {
                    setValidationsErrors(error.response.data.errors);
                }
            }

        }
    });
    return (
        <form onSubmit={formik.handleSubmit}>
            <div className={"timlands-panel" + (formik.isSubmitting ? ' is-loader' : '')}>
                <div className="page-header">
                    <h4 className="title">حساب الوايز Wise</h4>
                </div>
                <div className="timlands-content-form">
                    <div className="row">
                        <div className="col-md-7">
                            <div className="timlands-form">
                                <label className="label-block" htmlFor="input-title">البريد الإلكتروني</label>
                                <input
                                    id="input-title"
                                    name="title"
                                    placeholder="البريد الإلكتروني..."
                                    className={"timlands-inputs " + (validationsErrors && validationsErrors.email && ' has-error')}
                                    autoComplete="off"
                                    onKeyUp={clearValidationHandle}
                                    onChange={formik.handleChange}
                                    value={formik.values.email}
                                />
                                {validationsErrors && validationsErrors.email &&
                                    <div style={{ overflow: 'hidden' }}>
                                        <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                            <p className="text">{validationsErrors.email[0]}</p>
                                        </motion.div>
                                    </div>}
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="py-4 d-flex">
                                <span className="me-auto"></span>
                                <button type="submit" disabled={formik.isSubmitting} className="btn flex-center butt-green ml-auto butt-sm">
                                    <span className="text">حفظ التغييرات</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}
Wise.getLayout = function getLayout(page: any): ReactElement {
    return (
        <Layout>
            {page}
        </Layout>
    )
}
export default Wise
Wise.propTypes = {
    query: PropTypes.any,
};