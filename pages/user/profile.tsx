import Layout from '@/components/Layout/HomeLayout'
import { Badge, Statistic, Card, Result } from 'antd'
import React, { ReactElement, useState } from 'react'
import Link from 'next/link'
import { ArrowUpOutlined, ArrowDownOutlined, ShrinkOutlined } from '@ant-design/icons';
import Image from 'next/image'
import useSWR from 'swr'
import PropTypes from "prop-types";
import API from '../../config'
import { MetaTags } from '@/components/SEO/MetaTags'
import Loading from '@/components/Loading'
import Cookies from 'js-cookie'
import Unauthorized from '@/components/Unauthorized';
import { Field, Form, Formik } from 'formik';
import { motion } from 'framer-motion';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
    name_ar: Yup.string().required('هذا الحقل إجباري'),
    name_en: Yup.string().required('هذا الحقل إجباري'),
    name_fr: Yup.string().required('هذا الحقل إجباري'),
    type: Yup.number().required('هذا الحقل إجباري'),
    number_developments: Yup.number().lessThan(127, 'عدد التطويرات لا يتعدى 127').required('هذا الحقل إجباري'),
    price_developments: Yup.number().required('هذا الحقل إجباري'),
    number_sales: Yup.number().required('هذا الحقل إجباري'),
    value_bayer: Yup.number().required('هذا الحقل إجباري'),
});
export function BeSeller({ setIsModalHiddenHandle }: any): ReactElement {
    return (
        <>
            <div className="panel-modal-overlay"></div>
            <div className="panel-modal lg modal-add-new">
                <div className="panel-modal-header">
                    <h2 className="title"><span className="material-icons material-icons-outlined">add_box</span>إضافة جديد</h2>
                    <div className="panel-modal-left-tools">
                        <button onClick={setIsModalHiddenHandle} className="close-modal">
                            <span className="material-icons material-icons-outlined">close</span>
                        </button>
                    </div>
                </div>
                <Formik
                    initialValues={{
                        name_ar: '',
                        name_en: '',
                        name_fr: '',
                        type: 1,
                        number_developments: '',
                        price_developments: '',
                        number_sales: '',
                        value_bayer: ''
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={async values => {
                        try {
                            const res = await API.post("dashboard/levels/store", values);
                            // If Activate Network 
                            // Authentication was successful.
                            if (res.status == 201 || res.status == 200) {    
                                //alert('تمت الإضافة بنجاح')
                                setIsModalHiddenHandle()
                            } else {
                                alert('Error')
                            }
                        } catch (error) {
                            alert('Error Network')
        
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
                                    <div className="col-sm-4">
                                        <div className="timlands-form">
                                            <label className="label-block" htmlFor="name_ar">اسم المستوى بالعربي</label>
                                            <Field
                                                id="name_ar"
                                                name="name_ar"
                                                placeholder="اسم المستوى بالعربي..."
                                                className="timlands-inputs"
                                                autoComplete="off"
                                            />
                                            {errors.name_ar && touched.name_ar ?
                                                <div style={{ overflow: 'hidden' }}>
                                                    <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                                        <p className="text">{errors.name_ar}</p>
                                                    </motion.div>
                                                </div>
                                                :
                                                null}
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="timlands-form">
                                            <label className="label-block" htmlFor="name_en">اسم المستوى بالانجليزي</label>
                                            <Field
                                                id="name_en"
                                                name="name_en"
                                                placeholder="اسم المستوى بالانجليزي..."
                                                className="timlands-inputs"
                                                autoComplete="off"
                                            />
                                            {errors.name_en && touched.name_en ?
                                                <div style={{ overflow: 'hidden' }}>
                                                    <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                                        <p className="text">{errors.name_en}</p>
                                                    </motion.div>
                                                </div>
                                                :
                                                null}
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="timlands-form">
                                            <label className="label-block" htmlFor="name_fr">اسم المستوى بالفرنسي</label>
                                            <Field
                                                id="name_fr"
                                                name="name_fr"
                                                placeholder="اسم المستوى بالفرنسي..."
                                                className="timlands-inputs"
                                                autoComplete="off"
                                            />
                                            {errors.name_fr && touched.name_fr ?
                                                <div style={{ overflow: 'hidden' }}>
                                                    <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                                        <p className="text">{errors.name_fr}</p>
                                                    </motion.div>
                                                </div>
                                                :
                                                null}
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="timlands-form">
                                            <label className="label-block" htmlFor="input-state">اختر نوع المستوى</label>
                                            <Field
                                                as="select"
                                                id="input-state"
                                                name="address.state"
                                                className="timlands-inputs select"
                                            >
                                                <option value="">اختر نوع المستوى</option>
                                                <option value={1}>بائع</option>
                                                <option value={0}>مشتري</option>
                                            </Field>
                                            {errors.type && touched.type ?
                                                <div style={{ overflow: 'hidden' }}>
                                                    <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                                        <p className="text">{errors.type}</p>
                                                    </motion.div>
                                                </div>
                                                :
                                                null}
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="timlands-form">
                                            <label className="label-block" htmlFor="value_bayer">القيمة الشرائية</label>
                                            <Field
                                                id="value_bayer"
                                                name="value_bayer"
                                                placeholder="القيمة الشرائية..."
                                                className="timlands-inputs"
                                                autoComplete="off"
                                            />
                                            {errors.value_bayer && touched.value_bayer ?
                                                <div style={{ overflow: 'hidden' }}>
                                                    <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                                        <p className="text">{errors.value_bayer}</p>
                                                    </motion.div>
                                                </div>
                                                :
                                                null}
                                        </div>
                                    </div>
                                    
                                    <div className="col-sm-4">
                                        <div className="timlands-form">
                                            <label className="label-block" htmlFor="number_sales">عدد المبيعات </label>
                                            <Field
                                                id="number_sales"
                                                name="number_sales"
                                                placeholder="عدد المبيعات ..."
                                                className="timlands-inputs"
                                            />
                                            {errors.number_sales && touched.number_sales ?
                                                <div style={{ overflow: 'hidden' }}>
                                                    <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                                        <p className="text">{errors.number_sales}</p>
                                                    </motion.div>
                                                </div>
                                                :
                                                null}
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="timlands-form">
                                            <label className="label-block" htmlFor="number_developments">عدد التطويرات المسموح بها</label>
                                            <Field
                                                id="number_developments"
                                                name="number_developments"
                                                placeholder="عدد التطويرات المسموح بها..."
                                                className="timlands-inputs"
                                            />
                                            {errors.number_developments && touched.number_developments ?
                                                <div style={{ overflow: 'hidden' }}>
                                                    <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                                        <p className="text">{errors.number_developments}</p>
                                                    </motion.div>
                                                </div>
                                                :
                                                null}
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="timlands-form">
                                            <label className="label-block" htmlFor="price_developments">أعلى سعر للتطوير الواحد</label>
                                            <Field
                                                id="price_developments"
                                                name="price_developments"
                                                placeholder="أعلى سعر للتطوير الواحد..."
                                                className="timlands-inputs"
                                            />
                                            {errors.price_developments && touched.price_developments ?
                                                <div style={{ overflow: 'hidden' }}>
                                                    <motion.div initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="timlands-form-note form-note-error">
                                                        <p className="text">{errors.price_developments}</p>
                                                    </motion.div>
                                                </div>
                                                :
                                                null}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="panel-modal-footer">
                                <button onClick={setIsModalHiddenHandle} type="button" className="btn butt-red butt-sm">إغلاق</button>
                                <button type="submit" disabled={isSubmitting} className="btn butt-primary butt-sm">حفظ التغييرات</button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    )
}
function Profile() {
    const token = Cookies.get('token')
    const { data: userInfo }: any = useSWR('api/me')
    if (userInfo && userInfo.user_details.profile.steps < 1)
        return (<div className="row justify-content-md-center">
            <div className="col-md-5">
                <Result
                    status="warning"
                    title="حسابك غير كامل يرجى إكمال الصفحة الشخصية الخاصة بك"
                    subTitle="حسابك غير كامل يرجى إكمال الصفحة الشخصية الخاصة بك"
                    extra={
                        <Link href="/user/personalInformations">
                            <a className="btn butt-primary butt-md">
                                الذهاب إلى التعديل
                            </a>
                        </Link>
                    }
                />
            </div>
        </div>)
    const APIURL = 'https://www.api.timwoork.com/avatars/'
    const myLoader = () => {
        return `${APIURL}${userInfo.user_details.profile.avatar}`;
    }
    const [isModalShowen, setIsModalShowen] = useState(false)
    const setIsModalShowenHandle = () => {
        setIsModalShowen(true);
    }
    const setIsModalHiddenHandle = () => {
        setIsModalShowen(false);
    }
    return (
        <div className="py-3">
            {!userInfo && <Loading />}
            {!token && <Unauthorized />}
            {userInfo && userInfo.user_details.profile &&
                <>
                    <MetaTags
                        title={userInfo.user_details.profile.first_name + " " + userInfo.user_details.profile.last_name}
                        metaDescription={"الصفحة الرئيسية"}
                        ogDescription={"الصفحة الرئيسية"}
                    />
                    {isModalShowen && <BeSeller setIsModalHiddenHandle={setIsModalHiddenHandle} />}
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4">
                                {!userInfo.user_details.profile.profile_seller &&
                                    <div className="be-seller-aside">
                                        <h3 className="title">كن بائعا</h3>
                                        <p className="text">هل تريد أن تكون بائعا؟ يمكنك إضافة معلومات إضافية!</p>
                                            <button onClick={setIsModalShowenHandle} className='btn butt-green butt-md' style={{ width: '100%' }}>
                                                إنشاء بروفايل بائع
                                            </button>
                                    </div>
                                }
                                {userInfo.user_details.profile.profile_seller &&
                                    <div className="py-1">
                                        <Card title="نبذة عني">
                                            <p className="user-bro">
                                                {userInfo.user_details.profile.profile_seller.bio}
                                            </p>
                                        </Card>
                                    </div>
                                }
                                <div className="py-1">
                                    <Card title="الرصيد">
                                        <div className="statistic-item">
                                            <Statistic
                                                title="الرصيد المعلق"
                                                value={112893}
                                                precision={2}
                                                valueStyle={{ color: '#cf1322' }}
                                                prefix={<ArrowDownOutlined />}
                                                suffix="$"
                                            />
                                        </div>
                                        <div className="statistic-item">
                                            <Statistic
                                                title="الرصيد القابل للسحب"
                                                value={112893}
                                                precision={2}
                                                valueStyle={{ color: '#3f8600' }}
                                                prefix={<ArrowUpOutlined />}
                                                suffix="$"
                                            />
                                        </div>
                                        <div className="statistic-item">
                                            <Statistic
                                                title="الرصيد الكلي"
                                                value={112893}
                                                precision={2}
                                                valueStyle={{ color: '#222' }}
                                                prefix={<ShrinkOutlined />}
                                                suffix="$"
                                            />
                                        </div>
                                    </Card>
                                </div>
                            </div>
                            <div className="col-lg-8">
                                <div className="timlands-profile-content">
                                    <div className="profile-content-header">
                                        <Badge count="غير متصل" offset={[10, 10]} >
                                            <div className="profile-content-avatar">
                                                {userInfo.user_details.profile.avatar == 'avatar.png' ?
                                                    <Image src="/avatar2.jpg" width={120} height={120} /> :
                                                    <Image
                                                        loader={myLoader}
                                                        src={APIURL + userInfo.user_details.profile.avatar}
                                                        quality={1}
                                                        width={120}
                                                        height={120}
                                                        placeholder='blur'
                                                        blurDataURL='/avatar2.jpg'
                                                    />
                                                }
                                            </div>
                                        </Badge>
                                        <div className="profile-content-head">
                                            <h4 className="title">{userInfo.user_details.profile.first_name + ' ' + userInfo.user_details.profile.last_name}</h4>
                                            <p className="text">
                                                @{userInfo.user_details.username} |
                                                <span className="app-label"> المستوى الأول </span>
                                                <Badge
                                                    className="site-badge-count-109"
                                                    count="بائع محترف"
                                                    style={{ backgroundColor: '#52c41a' }}
                                                />
                                            </p>
                                            <div className="button-edit">
                                                <Link href="/user/personalInformations">
                                                    <a className="btn butt-primary flex-center butt-sm">
                                                        <span className="material-icons material-icons-outlined">edit</span> تعديل الملف الشخصي
                                                    </a>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="profile-content-body">
                                        <div className="content-title">
                                            <div className="d-flex">
                                                <h3 className="title flex-center">
                                                    <span className="material-icons material-icons-outlined">account_circle</span>
                                                    المعلومات الشخصية
                                                </h3>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-4">
                                                <div className="content-text-item">
                                                    <h3 className="text-label">الاسم الأول</h3>
                                                    <p className="text-value">{userInfo.user_details.profile.first_name}</p>
                                                </div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="content-text-item">
                                                    <h3 className="text-label">الاسم الأخير</h3>
                                                    <p className="text-value">{userInfo.user_details.profile.last_name}</p>
                                                </div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="content-text-item">
                                                    <h3 className="text-label">البلد</h3>
                                                    <p className="text-value">الجزائر</p>
                                                </div>
                                            </div>

                                            <div className="col-sm-4">
                                                <Badge.Ribbon text="مفعل" color="green">
                                                    <div className="content-text-item">
                                                        <h3 className="text-label">رقم الهاتف</h3>
                                                        <p className="text-value">{userInfo.user_details.phone}</p>
                                                    </div>
                                                </Badge.Ribbon>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="content-text-item">
                                                    <h3 className="text-label">الجنس</h3>
                                                    <p className="text-value">{userInfo.user_details.profile.gender == null ? '' : userInfo.user_details.profile.gender}</p>
                                                </div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="content-text-item">
                                                    <h3 className="text-label">تاريخ الميلاد</h3>
                                                    <p className="text-value">{userInfo.user_details.profile.date_of_birth == null ? '' : userInfo.user_details.profile.date_of_birth}</p>

                                                </div>
                                            </div>
                                        </div>

                                        <div className="content-title">
                                            <div className="d-flex">
                                                <h3 className="title flex-center">
                                                    <span className="material-icons material-icons-outlined">account_circle</span>
                                                    المعلومات التقنية
                                                </h3>
                                            </div>
                                        </div>
                                        <div className="row">
                                            {userInfo.user_details.profile.profile_seller &&
                                                <div className="col-sm-6">
                                                    <div className="content-text-item">
                                                        <h3 className="text-label">المهارات</h3>
                                                        {userInfo.user_details.profile.profile_seller.skills &&
                                                            <ul className="text-skills">
                                                                {userInfo.user_details.profile.profile_seller.skills.map((e: any, i) => (
                                                                    <li key={i}>
                                                                        <Link href="">
                                                                            <a>{e.name_ar}</a>
                                                                        </Link>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        }
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

Profile.getLayout = function getLayout(page: any): ReactElement {
    return (
        <Layout>
            {page}
        </Layout>
    )
}
BeSeller.propTypes = {
    setIsModalHiddenHandle: PropTypes.func,
};
export default Profile