import Layout from '../../components/Layout/HomeLayout'
import { ReactElement, useEffect, useState } from "react";
import { useFormik } from 'formik';
import { message } from 'antd';
import { motion } from 'framer-motion';
import API from "../../config";
import PropTypes from "prop-types";
import useSWR from 'swr';

function Thumb(props: any) {
    const [loading, setLoading] = useState(false)
    const [thumb, setThumb] = useState(undefined)
    useEffect(() => {
        if (!props.file) { return; }

        setLoading(true);
        const reader = new FileReader();

        reader.onloadend = () => {
            setThumb(reader.result);
            setLoading(false);
        };

        reader.readAsDataURL(props.file);

    }, [props.file])

    if (!props.file) { return null; }

    if (loading) { return <p>loading...</p>; }
    return (
        <img src={thumb}
            alt={props.file.name}
            className="img-thumbnail mt-2"
            height={200}
            width={200} />
    )
}

function MoneyAccount({ token }) {
    const { data: Countries }: any = useSWR('dashboard/countries')
    const [validationsErrors, setValidationsErrors]: any = useState({})
    const clearValidationHandle = () => {
        setValidationsErrors({})
    }
    const formik = useFormik({
        initialValues: {
            first_name: '',
            last_name: '',
            wise_country_id: '',
            bank_swift: '',
            bank_iban: '',
            city: '',
            state: '',
            bank_name: '',
            country_code_phone: '',
            phone_number_without_code: '',
            address_line_one: '',
            code_postal: '',
            id_type: '',
            attachments: '',
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
                    <h4 className="title">الحساب البنكي</h4>
                </div>
                <div className="timlands-content-form">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="timlands-form">
                                <label className="label-block" htmlFor="input-first_name">الاسم الأول</label>
                                <input
                                    id="input-first_name"
                                    name="first_name"
                                    placeholder="الاسم الأول..."
                                    className={"timlands-inputs " + (validationsErrors && validationsErrors.first_name && ' has-error')}
                                    autoComplete="off"
                                    onKeyUp={clearValidationHandle}
                                    onChange={formik.handleChange}
                                    value={formik.values.first_name}
                                />
                                {validationsErrors && validationsErrors.first_name &&
                                    <div style={{ overflow: 'hidden' }}>
                                        <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                            <p className="text">{validationsErrors.first_name[0]}</p>
                                        </motion.div>
                                    </div>}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="timlands-form">
                                <label className="label-block" htmlFor="input-last_name">الاسم الأخير</label>
                                <input
                                    id="input-last_name"
                                    name="last_name"
                                    placeholder="الاسم الأخير..."
                                    className={"timlands-inputs " + (validationsErrors && validationsErrors.last_name && ' has-error')}
                                    autoComplete="off"
                                    onKeyUp={clearValidationHandle}
                                    onChange={formik.handleChange}
                                    value={formik.values.last_name}
                                />
                                {validationsErrors && validationsErrors.last_name &&
                                    <div style={{ overflow: 'hidden' }}>
                                        <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                            <p className="text">{validationsErrors.last_name[0]}</p>
                                        </motion.div>
                                    </div>}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="timlands-form">
                                <label className="label-block" htmlFor="input-bank_name">اسم البنك</label>
                                <input
                                    id="input-bank_name"
                                    name="bank_name"
                                    placeholder="اسم البنك..."
                                    className={"timlands-inputs " + (validationsErrors && validationsErrors.bank_name && ' has-error')}
                                    autoComplete="off"
                                    onKeyUp={clearValidationHandle}
                                    onChange={formik.handleChange}
                                    value={formik.values.bank_name}
                                />
                                {validationsErrors && validationsErrors.bank_name &&
                                    <div style={{ overflow: 'hidden' }}>
                                        <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                            <p className="text">{validationsErrors.bank_name[0]}</p>
                                        </motion.div>
                                    </div>}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="timlands-form">
                                <label className="label-block" htmlFor="input-bank_swift">كود SWIFT</label>
                                <input
                                    id="input-bank_swift"
                                    name="bank_swift"
                                    placeholder="كود SWIFT..."
                                    className={"timlands-inputs " + (validationsErrors && validationsErrors.bank_swift && ' has-error')}
                                    autoComplete="off"
                                    onKeyUp={clearValidationHandle}
                                    onChange={formik.handleChange}
                                    value={formik.values.bank_swift}
                                />
                                {validationsErrors && validationsErrors.bank_swift &&
                                    <div style={{ overflow: 'hidden' }}>
                                        <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                            <p className="text">{validationsErrors.bank_swift[0]}</p>
                                        </motion.div>
                                    </div>}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="timlands-form">
                                <label className="label-block" htmlFor="input-bank_iban">رقم الإيبان IBAN</label>
                                <input
                                    id="input-bank_iban"
                                    name="bank_iban"
                                    placeholder="رقم الإيبان IBAN..."
                                    className={"timlands-inputs " + (validationsErrors && validationsErrors.bank_iban && ' has-error')}
                                    autoComplete="off"
                                    onKeyUp={clearValidationHandle}
                                    onChange={formik.handleChange}
                                    value={formik.values.bank_iban}
                                />
                                {validationsErrors && validationsErrors.bank_iban &&
                                    <div style={{ overflow: 'hidden' }}>
                                        <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                            <p className="text">{validationsErrors.bank_iban[0]}</p>
                                        </motion.div>
                                    </div>}
                            </div>
                        </div>
                        <div className="col-md-5">
                            <div className="timlands-form">
                                <label className="label-block" htmlFor="input-wise_country_id">اختر البلد</label>
                                <select
                                    id="input-wise_country_id"
                                    name="wise_country_id"
                                    className={"timlands-inputs select " + (validationsErrors && validationsErrors.wise_country_id && ' has-error')}
                                    autoComplete="off"
                                    onChange={formik.handleChange}
                                    value={formik.values.wise_country_id}
                                >
                                    <option value="">اختر البلد</option>
                                    {!Countries && <option value="">يرجى الانتظار...</option>}
                                    {Countries && Countries.data.map((e: any) => (
                                        <option value={e.id} key={e.id}>{e.name_ar}</option>
                                    ))}
                                </select>
                                {validationsErrors && validationsErrors.wise_country_id &&
                                    <div style={{ overflow: 'hidden' }}>
                                        <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                            <p className="text">{validationsErrors.wise_country_id[0]}</p>
                                        </motion.div>
                                    </div>}
                            </div>
                        </div>
                        <div className="col-md-5">
                            <div className="timlands-form">
                                <label className="label-block" htmlFor="input-state">المحافظة/الولاية</label>
                                <input
                                    id="input-state"
                                    name="state"
                                    placeholder="المحافظة/الولاية"
                                    className={"timlands-inputs " + (validationsErrors && validationsErrors.state && ' has-error')}
                                    autoComplete="off"
                                    onKeyUp={clearValidationHandle}
                                    onChange={formik.handleChange}
                                    value={formik.values.state}
                                />
                                {validationsErrors && validationsErrors.state &&
                                    <div style={{ overflow: 'hidden' }}>
                                        <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                            <p className="text">{validationsErrors.state[0]}</p>
                                        </motion.div>
                                    </div>}
                            </div>
                        </div>
                        <div className="col-md-7">
                            <div className="timlands-form">
                                <label className="label-block" htmlFor="input-vile">المدينة/البلدية</label>
                                <input
                                    id="input-vile"
                                    name="vile"
                                    placeholder="المدينة/البلدية"
                                    className={"timlands-inputs " + (validationsErrors && validationsErrors.state && ' has-error')}
                                    autoComplete="off"
                                    onKeyUp={clearValidationHandle}
                                    onChange={formik.handleChange}
                                    value={formik.values.state}
                                />
                                {validationsErrors && validationsErrors.state &&
                                    <div style={{ overflow: 'hidden' }}>
                                        <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                            <p className="text">{validationsErrors.state[0]}</p>
                                        </motion.div>
                                    </div>}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="timlands-form">
                                <label className="label-block" htmlFor="input-phone_number_without_code">رقم هاتف المستلم</label>
                                <input
                                    id="input-phone_number_without_code"
                                    name="phone_number_without_code"
                                    placeholder="رقم هاتف المستلم"
                                    className={"timlands-inputs " + (validationsErrors && validationsErrors.phone_number_without_code && ' has-error')}
                                    autoComplete="off"
                                    onKeyUp={clearValidationHandle}
                                    onChange={formik.handleChange}
                                    value={formik.values.phone_number_without_code}
                                />
                                {validationsErrors && validationsErrors.phone_number_without_code &&
                                    <div style={{ overflow: 'hidden' }}>
                                        <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                            <p className="text">{validationsErrors.phone_number_without_code[0]}</p>
                                        </motion.div>
                                    </div>}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="timlands-form">
                                <label className="label-block" htmlFor="input-country_code_phone">رمز البلد</label>
                                <input
                                    id="input-country_code_phone"
                                    name="country_code_phone"
                                    placeholder="رمز البلد"
                                    className={"timlands-inputs " + (validationsErrors && validationsErrors.country_code_phone && ' has-error')}
                                    autoComplete="off"
                                    onKeyUp={clearValidationHandle}
                                    onChange={formik.handleChange}
                                    value={formik.values.country_code_phone}
                                />
                                {validationsErrors && validationsErrors.country_code_phone &&
                                    <div style={{ overflow: 'hidden' }}>
                                        <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                            <p className="text">{validationsErrors.country_code_phone[0]}</p>
                                        </motion.div>
                                    </div>}
                            </div>
                        </div>
                        <div className="col-md-7">
                            <div className="timlands-form">
                                <label className="label-block" htmlFor="input-address_line_one">العنوان الشخصي</label>
                                <input
                                    id="input-address_line_one"
                                    name="address_line_one"
                                    placeholder="العنوان الشخصي"
                                    className={"timlands-inputs " + (validationsErrors && validationsErrors.address_line_one && ' has-error')}
                                    autoComplete="off"
                                    onKeyUp={clearValidationHandle}
                                    onChange={formik.handleChange}
                                    value={formik.values.address_line_one}
                                />
                                {validationsErrors && validationsErrors.address_line_one &&
                                    <div style={{ overflow: 'hidden' }}>
                                        <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                            <p className="text">{validationsErrors.address_line_one[0]}</p>
                                        </motion.div>
                                    </div>}
                            </div>
                        </div>
                        <div className="col-md-5">
                            <div className="timlands-form">
                                <label className="label-block" htmlFor="input-code_postal">الرمز البريدي</label>
                                <input
                                    id="input-code_postal"
                                    name="code_postal"
                                    placeholder="الرمز البريدي"
                                    className={"timlands-inputs " + (validationsErrors && validationsErrors.code_postal && ' has-error')}
                                    autoComplete="off"
                                    onKeyUp={clearValidationHandle}
                                    onChange={formik.handleChange}
                                    value={formik.values.code_postal}
                                />
                                {validationsErrors && validationsErrors.code_postal &&
                                    <div style={{ overflow: 'hidden' }}>
                                        <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                            <p className="text">{validationsErrors.code_postal[0]}</p>
                                        </motion.div>
                                    </div>}
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="timlands-form">
                                <label className="label-block" htmlFor="input-code_postal">المرفقات</label>
                                <input id="file" name="file" type="file" onChange={(event) => {
                                    formik.setFieldValue("file", event.currentTarget.files[0]);
                                }} className="form-control" />
                                <Thumb file={formik.values.attachments} />
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
MoneyAccount.getLayout = function getLayout(page: any): ReactElement {
    return (
        <Layout>
            {page}
        </Layout>
    )
}
export default MoneyAccount
MoneyAccount.propTypes = {
    token: PropTypes.any,
};