import Layout from '../../components/Layout/HomeLayout'
import { ReactElement, useState } from "react";
//import { useFormik } from 'formik';
import { message } from 'antd';
import { motion } from 'framer-motion';
import API from "../../config";
import PropTypes from "prop-types";
import useSWR from 'swr';
import { Alert } from '../Alert/Alert';
import router from 'next/router';
import UploadImageForm from '../UploadImageForm';

// function Thumb(props: any) {
//     const [loading, setLoading] = useState(false)
//     const [thumb, setThumb] = useState(undefined)
//     useEffect(() => {
//         if (!props.file) { return; }
//         setLoading(true);
//         const reader = new FileReader();
//         reader.onloadend = () => {
//             setThumb(reader.result);
//             setLoading(false);
//         };
//         reader.readAsDataURL(props.file);

//     }, [props.file])

//     if (!props.file) { return null; }

//     if (loading) { return <p>loading...</p>; }
//     return (
//         <img src={thumb}
//             alt={props.file.name}
//             className="img-thumbnail mt-2"
//             height={200}
//             width={200} />
//     )
// }

function BankAccount({ token, setIsShowBankTransfert }) {

    const { data: Countries }: any = useSWR('dashboard/countries')
    const { data: userInfo }: any = useSWR('api/me')

    const [isLoading, setisLoading]: any = useState(false)

    const [full_name, setfull_name]: any = useState(userInfo && userInfo.user_details.profile.bank_transfer_detail && userInfo.user_details.profile.bank_transfer_detail.full_name)
    const [country_id, setcountry_id]: any = useState('')
    const [city, setcity]: any = useState(userInfo && userInfo.user_details.profile.bank_transfer_detail && userInfo.user_details.profile.bank_transfer_detail.city)
    const [id_type, setid_type]: any = useState(userInfo && userInfo.user_details.profile.bank_transfer_detail && userInfo.user_details.profile.bank_transfer_detail.id_type)
    const [state, setstate]: any = useState(userInfo && userInfo.user_details.profile.bank_transfer_detail && userInfo.user_details.profile.bank_transfer_detail.state)
    const [country_code_phone, setcountry_code_phone]: any = useState(userInfo && userInfo.user_details.profile.bank_transfer_detail && userInfo.user_details.profile.bank_transfer_detail.country_code_phone)
    const [phone_number_without_code, setphone_number_without_code]: any = useState(userInfo && userInfo.user_details.profile.bank_transfer_detail && userInfo.user_details.profile.bank_transfer_detail.phone_number_without_code)
    const [address_line_one, setaddress_line_one]: any = useState(userInfo && userInfo.user_details.profile.bank_transfer_detail && userInfo.user_details.profile.bank_transfer_detail.address_line_one)
    const [code_postal, setcode_postal]: any = useState(userInfo && userInfo.user_details.profile.bank_transfer_detail && userInfo.user_details.profile.bank_transfer_detail.code_postal)
    const [attachments, setattachments]: any = useState(null)

    const [validationsErrors, setValidationsErrors]: any = useState({})
    const [validationsGeneral, setValidationsGeneral]: any = useState({})
    const UpdateMoney = async () => {
        setisLoading(true)
        try {
            const formdata = new FormData()
            formdata.append('full_name', full_name)
            formdata.append('country_id', country_id)
            formdata.append('city', city)
            formdata.append('id_type', id_type)
            formdata.append('state', state)
            formdata.append('country_code_phone', country_code_phone)
            formdata.append('phone_number_without_code', phone_number_without_code)
            formdata.append('address_line_one', address_line_one)
            formdata.append('code_postal', code_postal)
            formdata.append('attachments', attachments)
            console.log(attachments)

            const res = await API.post(`api/withdrawals/update/bank_transfer`, formdata, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            // Authentication was successful.
            if (res.status === 200) {
                message.success('لقد تم حفظ البيانات بنجاح')
                setisLoading(false)
            }
        } catch (error: any) {
            setisLoading(false)
            if (error.response && error.response.data && error.response.data.errors) {
                setValidationsErrors(error.response.data.errors);
            }
            if (error.response && error.response.data) {
                setValidationsGeneral(error.response.data);
            }
        }
    }
    const SendMoney = async (e) => {
        e.preventDefault()
        setisLoading(true)
        try {
            const formdata = new FormData()
            formdata.append('full_name', full_name)
            formdata.append('country_id', country_id)
            formdata.append('city', city)
            formdata.append('id_type', id_type)
            formdata.append('state', state)
            formdata.append('country_code_phone', country_code_phone)
            formdata.append('phone_number_without_code', phone_number_without_code)
            formdata.append('address_line_one', address_line_one)
            formdata.append('code_postal', code_postal)
            formdata.append('attachments', attachments)

            const res = await API.post(`api/withdrawals/bank_transfer`, formdata, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            // Authentication was successful.
            if (res.status === 200) {
                message.success('لقد تم ارسال طلب السحب إلى الإدارة')
                router.push('/mywallet')
                setisLoading(false)
            }
        } catch (error: any) {
            setisLoading(false)
            if (error.response && error.response.data && error.response.data.errors) {
                setValidationsErrors(error.response.data.errors);
            }
            if (error.response && error.response.data) {
                setValidationsGeneral(error.response.data);
            }
        }
    }
    const clearValidationHandle = () => {
        setValidationsGeneral({})
        setValidationsErrors({})
    }
    return (
        <form onSubmit={SendMoney}>
            <div className={"timlands-panel" + (isLoading ? ' is-loader' : '')}>
                <input type="hidden" name="" onChange={(e) => setcountry_code_phone(e.target.value)} />
                <div className="col-lg-8">
                    <div className="page-header d-flex">
                        <h4 className="title">الحوالات المالية</h4>
                        <button type='button' onClick={() => setIsShowBankTransfert(false)} className='btn-close ml-auto'></button>
                    </div>

                    <div className="timlands-content-form">
                        {validationsGeneral.msg && <Alert type="error">{validationsGeneral.msg}</Alert>}

                        <div className="row">
                            <div className="col-md-6">
                                <div className="timlands-form">
                                    <label className="label-block" htmlFor="input-full_name">الاسم الكامل</label>
                                    <input
                                        id="input-full_name"
                                        name="full_name"
                                        placeholder="الاسم الكامل..."
                                        className={"timlands-inputs " + (validationsErrors && validationsErrors.full_name && ' has-error')}
                                        autoComplete="off"
                                        onKeyUp={clearValidationHandle}
                                        onChange={(e) => setfull_name(e.target.value)}
                                        value={full_name}
                                    />
                                    {validationsErrors && validationsErrors.full_name &&
                                        <div style={{ overflow: 'hidden' }}>
                                            <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                                <p className="text">{validationsErrors.full_name[0]}</p>
                                            </motion.div>
                                        </div>}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="timlands-form">
                                    <label className="label-block" htmlFor="input-country_id">اختر البلد</label>
                                    <select
                                        id="input-country_id"
                                        name="country_id"
                                        className={"timlands-inputs select " + (validationsErrors && validationsErrors.country_id && ' has-error')}
                                        autoComplete="off"
                                        onChange={(e) => setcountry_id(e.target.value)}
                                        value={country_id}
                                    >
                                        <option value="">اختر البلد</option>
                                        {!Countries && <option value="">يرجى الانتظار...</option>}
                                        {Countries && Countries.data.map((e: any) => (
                                            <option value={e.id} key={e.id}>{e.name_ar}</option>
                                        ))}
                                    </select>
                                    {validationsErrors && validationsErrors.country_id &&
                                        <div style={{ overflow: 'hidden' }}>
                                            <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                                <p className="text">{validationsErrors.country_id[0]}</p>
                                            </motion.div>
                                        </div>}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="timlands-form">
                                    <label className="label-block" htmlFor="input-state">المحافظة/الولاية</label>
                                    <input
                                        id="input-state"
                                        name="state"
                                        placeholder="المحافظة/الولاية"
                                        className={"timlands-inputs " + (validationsErrors && validationsErrors.state && ' has-error')}
                                        autoComplete="off"
                                        onKeyUp={clearValidationHandle}
                                        onChange={(e) => setstate(e.target.value)}
                                        value={state}
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
                                    <label className="label-block" htmlFor="input-city">المدينة/البلدية</label>
                                    <input
                                        id="input-city"
                                        name="city"
                                        placeholder="المدينة/البلدية"
                                        className={"timlands-inputs " + (validationsErrors && validationsErrors.city && ' has-error')}
                                        autoComplete="off"
                                        onKeyUp={clearValidationHandle}
                                        onChange={(e) => setcity(e.target.value)}
                                        value={city}
                                    />
                                    {validationsErrors && validationsErrors.city &&
                                        <div style={{ overflow: 'hidden' }}>
                                            <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                                <p className="text">{validationsErrors.city[0]}</p>
                                            </motion.div>
                                        </div>}
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="timlands-form">
                                    <label className="label-block" htmlFor="input-phone_number_without_code">رقم هاتف المستلم</label>
                                    <input
                                        id="input-phone_number_without_code"
                                        name="phone_number_without_code"
                                        placeholder="رقم هاتف المستلم"
                                        className={"timlands-inputs " + (validationsErrors && validationsErrors.phone_number_without_code && ' has-error')}
                                        autoComplete="off"
                                        onKeyUp={clearValidationHandle}
                                        onChange={(e) => setphone_number_without_code(e.target.value)}
                                        value={phone_number_without_code}
                                    />
                                    {validationsErrors && validationsErrors.phone_number_without_code &&
                                        <div style={{ overflow: 'hidden' }}>
                                            <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                                <p className="text">{validationsErrors.phone_number_without_code[0]}</p>
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
                                        onChange={(e) => setaddress_line_one(e.target.value)}
                                        value={address_line_one}
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
                                        onChange={(e) => setcode_postal(e.target.value)}
                                        value={code_postal}
                                    />
                                    {validationsErrors && validationsErrors.code_postal &&
                                        <div style={{ overflow: 'hidden' }}>
                                            <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                                <p className="text">{validationsErrors.code_postal[0]}</p>
                                            </motion.div>
                                        </div>}
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="timlands-form">
                                    <label className="label-block" htmlFor="input-id_type">اختر نوع الهوية</label>
                                    <select
                                        id="input-id_type"
                                        name="id_type"
                                        className={"timlands-inputs select " + (validationsErrors && validationsErrors.id_type && ' has-error')}
                                        autoComplete="off"
                                        onChange={(e) => setid_type(e.target.value)}
                                        value={id_type}
                                    >
                                        <option value="">اختر نوع الهوية</option>
                                        <option value='0'>بطاقة التعريف الوطني</option>
                                        <option value='1'>جواز سفر</option>
                                        <option value='2'>وثائق اخرى تثبت هويتك</option>
                                    </select>
                                    {validationsErrors && validationsErrors.id_type &&
                                        <div style={{ overflow: 'hidden' }}>
                                            <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                                <p className="text">{validationsErrors.id_type[0]}</p>
                                            </motion.div>
                                        </div>}
                                </div>
                            </div>
                            <div className="col-md-8">
                                <div className="timlands-form">
                                    <label className="label-block" htmlFor="input-attachments">المرفقات</label>

                                    <UploadImageForm
                                        picture={attachments}
                                        setPicture={setattachments}
                                        validationsErrors={validationsErrors && validationsErrors.attachments && validationsErrors.attachments[0]}
                                        src="/background.jpg"
                                    />
                                    <div className="app-form-note">
                                        <div className="text">
                                            يجب ان تكون الصورة البارزة أقل من 2MB والأبعاد متساوية
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="py-4 d-flex">
                                    <button type="submit" disabled={isLoading} onClick={UpdateMoney} className="btn flex-center butt-green me-auto butt-lg">
                                        <span className="text">حفظ التغييرات</span>
                                    </button>
                                    <button type="button" onClick={() => setIsShowBankTransfert(false)} className="btn flex-center butt-red ml-auto butt-lg">
                                        <span className="text">إخفاء التعديل</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}
BankAccount.getLayout = function getLayout(page: any): ReactElement {
    return (
        <Layout>
            {page}
        </Layout>
    )
}
export default BankAccount
BankAccount.propTypes = {
    token: PropTypes.any,
    setIsShowBankTransfert: PropTypes.func,
};