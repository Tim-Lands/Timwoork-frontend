import Layout from '@/components/Layout/HomeLayout'
import { Result, message } from 'antd'
import React, { ReactElement, useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import router from 'next/router'
import API from '../../config'
import useSWR from 'swr'
import { MetaTags } from '@/components/SEO/MetaTags'
import Loading from '@/components/Loading'
import Sidebar from '@/components/Profile/Sidebar'
import MyProducts from '@/components/Profile/MyProducts'
import Cookies from 'js-cookie'
import Unauthorized from '@/components/Unauthorized';

function Profile() {
    const token = Cookies.get('token')
    const { data: userInfo }: any = useSWR('api/me')
    const darkMode = userInfo && userInfo.user_details.profile.dark_mode
    if (userInfo && userInfo.user_details.profile.steps < 1)
        return (<div className="row justify-content-md-center">
            <div className="col-md-5">
                <Result
                    status="warning"
                    title="حسابك غير كامل"
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
    const myLoader = () => {
        return `${userInfo.user_details.profile.avatar_path}`;
    }
    const [statusType, setStatusType] = useState('')
    const { data: postsList }: any = useSWR(`api/my_products${statusType}`)

    const [isLoadingSeler, setIsLoadingSeler] = useState(false)
    const beseller = async () => {
        setIsLoadingSeler(true)
        try {
            const res = await API.post("api/sellers/store", null, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            // Authentication was successful.
            if (res.status === 200) {
                setIsLoadingSeler(false)
                router.push('/user/editSeller')
            }
        } catch (error: any) {
            message.error('حدث خطأ غير متوقع')
            setIsLoadingSeler(false)
        }
    }
    useEffect(() => {
        if (!token) {
            router.push('/login')
        }
    }, [])
    return (
        <div className="py-3">
            {!userInfo && <Loading />}
            {!token && <Unauthorized />}
            {userInfo && userInfo.user_details.profile &&
                <>
                    <MetaTags
                        title={'الملف الشخصي لـ ' + userInfo.user_details.profile.first_name + " " + userInfo.user_details.profile.last_name}
                        metaDescription={'الملف الشخصي لـ ' + userInfo.user_details.profile.first_name + " " + userInfo.user_details.profile.last_name}
                        ogDescription={'الملف الشخصي لـ ' + userInfo.user_details.profile.first_name + " " + userInfo.user_details.profile.last_name}
                    />
                    <div className="container">
                        <div className="row">
                            <Sidebar
                                beseller={beseller}
                                isLoadingSeler={isLoadingSeler}
                                profile_seller={userInfo.user_details.profile.profile_seller}
                                withdrawable_amount={userInfo && userInfo.user_details.profile.withdrawable_amount}
                                pending_amount={userInfo && userInfo.user_details.profile.pending_amount}
                                darkMode={darkMode}
                            />
                            <div className="col-lg-8">
                                <div className="timlands-profile-content">
                                    <div className="profile-content-header">
                                        <div className="profile-content-avatar">
                                            <Image
                                                loader={myLoader}
                                                src={userInfo && userInfo.user_details.profile.avatar_path}
                                                quality={1}
                                                width={120}
                                                height={120}
                                                placeholder='blur'
                                                blurDataURL='/avatar2.jpg'
                                            />
                                        </div>
                                        <div className="profile-content-head">
                                            <h4 className="title">
                                                {userInfo.user_details.profile.full_name}
                                            </h4>
                                            <p className="text">
                                                @{userInfo.user_details.username} |
                                                <span className="app-label"> {userInfo.user_details.profile.level.name_ar} </span>
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
                                            {userInfo.user_details.profile.country !== null &&
                                                <div className="col-sm-4">
                                                    <div className="content-text-item">
                                                        <h3 className="text-label">البلد</h3>
                                                        <p className="text-value">{userInfo.user_details.profile.country.name_ar}</p>
                                                    </div>
                                                </div>
                                            }
                                            <div className="col-sm-4">
                                                <div className="content-text-item">
                                                    <h3 className="text-label">الجنس</h3>
                                                    <p className="text-value">
                                                        {
                                                            userInfo.user_details.profile && userInfo.user_details.profile.gender == null ? '' :
                                                                userInfo.user_details.profile && (userInfo.user_details.profile.gender == 0 ? 'أنثى' : 'ذكر')
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="content-text-item">
                                                    <h3 className="text-label">تاريخ الميلاد</h3>
                                                    <p className="text-value">{userInfo.user_details.profile.date_of_birth == null ? '' : userInfo.user_details.profile.date_of_birth}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {userInfo.user_details.profile.profile_seller &&
                            <MyProducts
                                setStatusType={setStatusType}
                                postsList={postsList}
                            />
                        }
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
export default Profile